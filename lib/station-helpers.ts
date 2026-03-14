import { stations } from "@/data/stations";
import type { FuelType, PriceSummary, Station } from "@/types/domain";

export function getFuelPrice(station: Station, fuel: FuelType) {
  return fuel === "gasoline95" ? station.priceGasoline95 : station.priceDiesel;
}

export function sortStationsByFuel(
  stationList: Station[],
  fuel: FuelType = "gasoline95",
) {
  return [...stationList].sort((left, right) => {
    const leftPrice = getFuelPrice(left, fuel) ?? Number.POSITIVE_INFINITY;
    const rightPrice = getFuelPrice(right, fuel) ?? Number.POSITIVE_INFINITY;
    return leftPrice - rightPrice;
  });
}

export function summarizeFuelPrices(
  stationList: Station[],
  fuel: FuelType,
): PriceSummary | null {
  const prices = stationList.map((station) => getFuelPrice(station, fuel)).filter(
    (value): value is number => value !== null,
  );

  if (!prices.length) {
    return null;
  }

  const cheapest = Math.min(...prices);
  const highest = Math.max(...prices);
  const average = prices.reduce((total, price) => total + price, 0) / prices.length;

  return {
    fuel,
    cheapest,
    highest,
    average,
    spread: highest - cheapest,
    stationCount: prices.length,
  };
}

export function getLatestUpdate(stationList: Station[]) {
  return [...stationList].sort((left, right) =>
    right.updatedAt.localeCompare(left.updatedAt),
  )[0]?.updatedAt;
}

export function getStationsByIds(ids: string[]) {
  return ids
    .map((id) => stations.find((station) => station.id === id))
    .filter((station): station is Station => Boolean(station));
}
