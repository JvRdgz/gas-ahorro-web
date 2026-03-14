"use client";

import { useState } from "react";

import { summarizeFuelPrices, sortStationsByFuel } from "@/lib/station-helpers";
import { formatCurrency, formatPricePerLiter } from "@/lib/utils";
import type { FuelType, Station } from "@/types/domain";

import { PriceSummaryCard } from "@/components/data/PriceSummaryCard";
import { StationMap } from "@/components/data/StationMap";
import { StationTable } from "@/components/data/StationTable";

interface StationsExplorerProps {
  stations: Station[];
  center: [number, number];
  routeCoordinates?: [number, number][];
  defaultFuel?: FuelType;
}

export function StationsExplorer({
  stations,
  center,
  routeCoordinates,
  defaultFuel = "gasoline95",
}: StationsExplorerProps) {
  const [fuel, setFuel] = useState<FuelType>(defaultFuel);
  const sortedStations = sortStationsByFuel(stations, fuel);
  const summary = summarizeFuelPrices(sortedStations, fuel);

  return (
    <div className="content-stack">
      <div className="toolbar">
        <div>
          <span className="eyebrow">Selector de combustible</span>
          <h2>Compara precio, ranking y mapa sin cambiar de página</h2>
        </div>

        <div className="fuel-toggle" role="tablist" aria-label="Seleccionar combustible">
          <button
            type="button"
            className={fuel === "gasoline95" ? "is-active" : undefined}
            onClick={() => setFuel("gasoline95")}
          >
            Gasolina 95
          </button>
          <button
            type="button"
            className={fuel === "diesel" ? "is-active" : undefined}
            onClick={() => setFuel("diesel")}
          >
            Diésel
          </button>
        </div>
      </div>

      {summary ? (
        <div className="summary-grid">
          <PriceSummaryCard
            title="Precio más barato"
            value={formatPricePerLiter(summary.cheapest)}
            description="La mejor referencia actual dentro del conjunto visible."
          />
          <PriceSummaryCard
            title="Precio medio"
            value={formatPricePerLiter(summary.average)}
            description={`Promedio calculado sobre ${summary.stationCount} estaciones.`}
          />
          <PriceSummaryCard
            title="Ahorro potencial"
            value={formatCurrency(summary.spread * 50)}
            description="Diferencia aproximada al llenar un depósito de 50 litros."
          />
        </div>
      ) : null}

      <StationTable stations={sortedStations} fuel={fuel} />
      <StationMap
        center={center}
        stations={sortedStations}
        fuel={fuel}
        routeCoordinates={routeCoordinates}
      />
    </div>
  );
}
