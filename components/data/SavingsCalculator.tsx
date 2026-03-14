"use client";

import { useState } from "react";

import { buildSavingsSnapshot } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface SavingsCalculatorProps {
  title: string;
  description: string;
  defaultPriceDifference: number;
  defaultDistanceKm?: number;
  defaultConsumptionPer100Km?: number;
  defaultTankCapacity?: number;
}

export function SavingsCalculator({
  title,
  description,
  defaultPriceDifference,
  defaultDistanceKm,
  defaultConsumptionPer100Km = 6.4,
  defaultTankCapacity = 50,
}: SavingsCalculatorProps) {
  const [distanceKm, setDistanceKm] = useState(defaultDistanceKm ?? 350);
  const [consumptionPer100Km, setConsumptionPer100Km] = useState(
    defaultConsumptionPer100Km,
  );
  const [tankCapacityLiters, setTankCapacityLiters] = useState(defaultTankCapacity);
  const [priceDifferencePerLiter, setPriceDifferencePerLiter] = useState(
    defaultPriceDifference,
  );

  const snapshot = buildSavingsSnapshot({
    distanceKm: defaultDistanceKm !== undefined ? distanceKm : undefined,
    consumptionPer100Km,
    tankCapacityLiters,
    priceDifferencePerLiter,
  });

  return (
    <div className="calculator-card">
      <div className="section-heading">
        <span className="eyebrow">Calculadora de ahorro</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="calculator-grid">
        <label>
          <span>Consumo medio (L/100 km)</span>
          <input
            type="number"
            min="3"
            max="20"
            step="0.1"
            value={consumptionPer100Km}
            onChange={(event) => setConsumptionPer100Km(Number(event.target.value))}
          />
        </label>

        <label>
          <span>Capacidad depósito (L)</span>
          <input
            type="number"
            min="20"
            max="120"
            step="1"
            value={tankCapacityLiters}
            onChange={(event) => setTankCapacityLiters(Number(event.target.value))}
          />
        </label>

        <label>
          <span>Diferencia de precio (€/L)</span>
          <input
            type="number"
            min="0.01"
            max="0.5"
            step="0.005"
            value={priceDifferencePerLiter}
            onChange={(event) => setPriceDifferencePerLiter(Number(event.target.value))}
          />
        </label>

        {defaultDistanceKm !== undefined ? (
          <label>
            <span>Distancia del trayecto (km)</span>
            <input
              type="number"
              min="50"
              max="1500"
              step="10"
              value={distanceKm}
              onChange={(event) => setDistanceKm(Number(event.target.value))}
            />
          </label>
        ) : null}
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span>Litros estimados</span>
          <strong>{formatNumber(snapshot.litersOnTrip, 1)} L</strong>
          <p>Estimación basada en el consumo configurado.</p>
        </article>
        <article className="summary-card">
          <span>Ahorro por repostaje</span>
          <strong>{formatCurrency(snapshot.perRefuel)}</strong>
          <p>Impacto si llenas el depósito en una estación más barata.</p>
        </article>
        <article className="summary-card">
          <span>Ahorro estimado</span>
          <strong>{formatCurrency(snapshot.onTrip)}</strong>
          <p>
            {defaultDistanceKm !== undefined
              ? "Impacto aproximado para este trayecto."
              : "Impacto orientativo usando el volumen configurado."}
          </p>
        </article>
      </div>
    </div>
  );
}
