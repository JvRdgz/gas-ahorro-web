import { promises as fs } from "node:fs";
import path from "node:path";

import { stations as mockStations } from "@/data/stations";
import { runtimeConfig } from "@/lib/env";
import { slugify } from "@/lib/slugify";
import type { DataSourceInfo, Station } from "@/types/domain";

interface MinistryStationRecord {
  "Dirección": string;
  "Horario": string;
  "Latitud": string;
  "Localidad": string;
  "Longitud (WGS84)": string;
  "Municipio": string;
  "Precio Gasoleo A": string;
  "Precio Gasolina 95 E5": string;
  "Precio Gasolina 95 E10": string;
  "Provincia": string;
  "Rótulo": string;
  "IDEESS": string;
}

interface MinistryStationsPayload {
  Fecha: string;
  ListaEESSPrecio: MinistryStationRecord[];
}

interface CachedStationSnapshot {
  fetchedAt: string;
  source: "ministry-cache" | "ministry-live";
  stations: Station[];
}

export interface StationSourceSnapshot {
  stations: Station[];
  meta: DataSourceInfo;
}

let memorySnapshot: StationSourceSnapshot | null = null;
let memorySnapshotPromise: Promise<StationSourceSnapshot> | null = null;
let memorySnapshotExpiresAt = 0;

function parseSpanishDecimal(value: string | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function toTitleCase(value: string) {
  return value
    .toLocaleLowerCase("es-ES")
    .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("es-ES"));
}

function normalizeBrand(label: string, city: string) {
  const trimmed = label.trim();

  if (!trimmed || /^n[oº]/i.test(trimmed) || trimmed === "S/D") {
    return `Estación ${city}`;
  }

  return trimmed;
}

function inferHighway(address: string) {
  const normalized = address
    .toUpperCase()
    .replace(/\s+/g, "")
    .replaceAll(".", "");
  const matches = normalized.match(/(?:^|[^A-Z0-9])(AP?-?\d+|N-?\d+|M-?\d+)(?:[^A-Z0-9]|$)/g);

  if (!matches?.length) {
    return undefined;
  }

  const candidate = matches[0]
    .replace(/[^A-Z0-9-]/g, "")
    .toLowerCase()
    .replace(/([a-z]+)(\d+)/, "$1-$2");

  if (candidate.startsWith("a-") || candidate.startsWith("ap-")) {
    return candidate.replace("-", "");
  }

  return undefined;
}

function normalizeStation(
  record: MinistryStationRecord,
  fetchedAt: string,
): Station | null {
  const latitude = parseSpanishDecimal(record.Latitud);
  const longitude = parseSpanishDecimal(record["Longitud (WGS84)"]);
  const city = toTitleCase(record.Municipio || record.Localidad);
  const province = toTitleCase(record.Provincia);
  const gasoline95 =
    parseSpanishDecimal(record["Precio Gasolina 95 E5"]) ??
    parseSpanishDecimal(record["Precio Gasolina 95 E10"]);
  const diesel = parseSpanishDecimal(record["Precio Gasoleo A"]);

  if (latitude === null || longitude === null || (!gasoline95 && !diesel)) {
    return null;
  }

  const name = normalizeBrand(record["Rótulo"], city);
  const address = toTitleCase(record["Dirección"]);

  return {
    id: record.IDEESS || slugify(`${name}-${address}-${city}`),
    name,
    brand: name,
    latitude,
    longitude,
    address,
    city,
    province,
    highway: inferHighway(address),
    priceGasoline95: gasoline95,
    priceDiesel: diesel,
    updatedAt: normalizeFetchedAt(fetchedAt),
    isMock: false,
  };
}

function normalizeFetchedAt(value: string) {
  const match = value.match(
    /(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/,
  );

  if (!match) {
    return new Date().toISOString();
  }

  const [, day, month, year, hours, minutes, seconds] = match;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+01:00`;
}

async function readCachedSnapshot() {
  const filePath = path.join(process.cwd(), runtimeConfig.ministryCacheFile);

  try {
    const content = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(content) as CachedStationSnapshot;
    return parsed;
  } catch {
    return null;
  }
}

async function fetchLiveStations() {
  const response = await fetch(runtimeConfig.ministryApiUrl, {
    signal: AbortSignal.timeout(runtimeConfig.ministryFetchTimeoutMs),
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: runtimeConfig.stationRevalidateSeconds,
    },
  });

  if (!response.ok) {
    throw new Error(`Ministry API returned ${response.status}`);
  }

  const payload = (await response.json()) as MinistryStationsPayload;
  const stations = payload.ListaEESSPrecio.map((record) =>
    normalizeStation(record, payload.Fecha),
  ).filter((station): station is Station => Boolean(station));

  return {
    stations,
    fetchedAt: normalizeFetchedAt(payload.Fecha),
  };
}

function buildMockSnapshot(): StationSourceSnapshot {
  const fetchedAt = mockStations[0]?.updatedAt ?? new Date().toISOString();

  return {
    stations: mockStations,
    meta: {
      kind: "mock",
      label: "Datos mock",
      description:
        "Se está usando el seed local del proyecto. Configura la fuente oficial para producción.",
      fetchedAt,
      stationCount: mockStations.length,
      isMock: true,
    },
  };
}

async function loadSnapshotUncached(): Promise<StationSourceSnapshot> {
  const mode = runtimeConfig.dataSourceMode;
  const cached = await readCachedSnapshot();

  if (mode === "mock") {
    return buildMockSnapshot();
  }

  if (mode === "cache" || (mode === "auto" && cached)) {
    if (cached?.stations.length) {
      return {
        stations: cached.stations,
        meta: {
          kind: "ministry-cache",
          label: "Datos oficiales desde snapshot local",
          description:
            "La web está sirviendo datos oficiales normalizados desde el snapshot generado en este proyecto.",
          fetchedAt: cached.fetchedAt,
          stationCount: cached.stations.length,
          isMock: false,
        },
      };
    }

    return buildMockSnapshot();
  }

  try {
    const live = await fetchLiveStations();

    return {
      stations: live.stations,
      meta: {
        kind: "ministry-live",
        label: "Datos oficiales del Ministerio",
        description:
          "La web está resolviendo estaciones y precios con la API oficial del Ministerio.",
        fetchedAt: live.fetchedAt,
        stationCount: live.stations.length,
        isMock: false,
      },
    };
  } catch {
    if (cached?.stations.length) {
      return {
        stations: cached.stations,
        meta: {
          kind: "ministry-cache",
          label: "Datos oficiales desde snapshot local",
          description:
            "No se ha podido consultar la API oficial en tiempo real, así que se usa el último snapshot disponible.",
          fetchedAt: cached.fetchedAt,
          stationCount: cached.stations.length,
          isMock: false,
        },
      };
    }

    return buildMockSnapshot();
  }
}

export async function getStationSourceSnapshot() {
  const now = Date.now();

  if (memorySnapshot && now < memorySnapshotExpiresAt) {
    return memorySnapshot;
  }

  if (!memorySnapshotPromise) {
    memorySnapshotPromise = loadSnapshotUncached()
      .then((snapshot) => {
        memorySnapshot = snapshot;
        memorySnapshotExpiresAt =
          Date.now() + runtimeConfig.stationRevalidateSeconds * 1000;
        return snapshot;
      })
      .finally(() => {
        memorySnapshotPromise = null;
      });
  }

  return memorySnapshotPromise;
}

export async function createCachedMinistrySnapshot() {
  const live = await fetchLiveStations();

  return {
    fetchedAt: live.fetchedAt,
    source: "ministry-cache" as const,
    stations: live.stations,
  };
}
