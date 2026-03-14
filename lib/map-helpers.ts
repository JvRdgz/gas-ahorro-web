import type { Station } from "@/types/domain";

export function getMapCenterFromStations(
  stations: Station[],
  fallback: [number, number],
): [number, number] {
  if (!stations.length) {
    return fallback;
  }

  const lat =
    stations.reduce((total, station) => total + station.latitude, 0) / stations.length;
  const lng =
    stations.reduce((total, station) => total + station.longitude, 0) / stations.length;

  return [lat, lng];
}

export function getMapCenterFromRoute(
  coordinates: [number, number][],
  fallback: [number, number],
): [number, number] {
  if (!coordinates.length) {
    return fallback;
  }

  return coordinates[Math.floor(coordinates.length / 2)] ?? fallback;
}
