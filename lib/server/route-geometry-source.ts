import { unstable_cache } from "next/cache";
import { promises as fs } from "node:fs";
import path from "node:path";

import { cities } from "@/data/cities";
import { runtimeConfig } from "@/lib/env";
import type { RouteEntity } from "@/types/domain";

interface CachedRouteGeometryPayload {
  generatedAt: string;
  routes: Record<string, [number, number][]>;
}

function decodePolyline(encoded: string) {
  let index = 0;
  let latitude = 0;
  let longitude = 0;
  const points: [number, number][] = [];

  while (index < encoded.length) {
    let result = 0;
    let shift = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude += result & 1 ? ~(result >> 1) : result >> 1;
    result = 0;
    shift = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude += result & 1 ? ~(result >> 1) : result >> 1;
    points.push([latitude / 1e5, longitude / 1e5]);
  }

  return points;
}

async function readCachedRouteGeometries() {
  const filePath = path.join(process.cwd(), runtimeConfig.googleRoutesCacheFile);

  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as CachedRouteGeometryPayload;
  } catch {
    return null;
  }
}

function getCityCoordinates(slug: string) {
  const city = cities.find((item) => item.slug === slug);
  return city ? { lat: city.latitude, lng: city.longitude } : null;
}

async function fetchGoogleRouteGeometry(route: RouteEntity) {
  if (!runtimeConfig.googleMapsServerApiKey) {
    return null;
  }

  const origin = getCityCoordinates(route.originSlug);
  const destination = getCityCoordinates(route.destinationSlug);

  if (!origin || !destination) {
    return null;
  }

  const response = await fetch(runtimeConfig.googleRoutesApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": runtimeConfig.googleMapsServerApiKey,
      "X-Goog-FieldMask":
        "routes.polyline.encodedPolyline,routes.distanceMeters,routes.duration",
    },
    body: JSON.stringify({
      origin: {
        location: {
          latLng: origin,
        },
      },
      destination: {
        location: {
          latLng: destination,
        },
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      languageCode: "es-ES",
      units: "METRIC",
    }),
    signal: AbortSignal.timeout(15000),
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    routes?: Array<{ polyline?: { encodedPolyline?: string } }>;
  };
  const encoded = payload.routes?.[0]?.polyline?.encodedPolyline;

  return encoded ? decodePolyline(encoded) : null;
}

async function getRouteGeometryUncached(route: RouteEntity) {
  const cached = await readCachedRouteGeometries();
  const cachedGeometry = cached?.routes?.[route.slug];

  if (cachedGeometry?.length) {
    return cachedGeometry;
  }

  const liveGeometry = await fetchGoogleRouteGeometry(route);
  return liveGeometry?.length ? liveGeometry : route.routeCoordinates;
}

export function getRouteGeometry(route: RouteEntity) {
  return unstable_cache(
    async () => getRouteGeometryUncached(route),
    [`route-geometry:${route.slug}`],
    {
      revalidate: 60 * 60 * 24,
      tags: [`route-geometry:${route.slug}`],
    },
  )();
}

export async function createRouteGeometryCache(
  routes: RouteEntity[],
): Promise<CachedRouteGeometryPayload> {
  const entries = await Promise.all(
    routes.map(async (route) => [route.slug, await getRouteGeometryUncached(route)] as const),
  );

  return {
    generatedAt: new Date().toISOString(),
    routes: Object.fromEntries(entries),
  };
}
