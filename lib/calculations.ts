export interface SavingsInput {
  distanceKm?: number;
  consumptionPer100Km: number;
  priceDifferencePerLiter: number;
  tankCapacityLiters: number;
}

export function calculateLitersForTrip(
  distanceKm: number,
  consumptionPer100Km: number,
) {
  return (distanceKm * consumptionPer100Km) / 100;
}

export function calculateSavingsPerRefuel(
  tankCapacityLiters: number,
  priceDifferencePerLiter: number,
) {
  return tankCapacityLiters * priceDifferencePerLiter;
}

export function calculateSavingsForTrip(
  distanceKm: number,
  consumptionPer100Km: number,
  priceDifferencePerLiter: number,
) {
  return (
    calculateLitersForTrip(distanceKm, consumptionPer100Km) *
    priceDifferencePerLiter
  );
}

export function buildSavingsSnapshot(input: SavingsInput) {
  const litersOnTrip = input.distanceKm
    ? calculateLitersForTrip(input.distanceKm, input.consumptionPer100Km)
    : input.tankCapacityLiters;

  return {
    litersOnTrip,
    perRefuel: calculateSavingsPerRefuel(
      input.tankCapacityLiters,
      input.priceDifferencePerLiter,
    ),
    onTrip: input.distanceKm
      ? calculateSavingsForTrip(
          input.distanceKm,
          input.consumptionPer100Km,
          input.priceDifferencePerLiter,
        )
      : calculateSavingsPerRefuel(
          litersOnTrip,
          input.priceDifferencePerLiter,
        ),
  };
}
