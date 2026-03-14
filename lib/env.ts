function toNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const runtimeConfig = {
  dataSourceMode: process.env.DATA_SOURCE_MODE ?? "auto",
  ministryApiUrl:
    process.env.MINISTRY_API_URL ??
    "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/",
  ministryFetchTimeoutMs: toNumber(process.env.MINISTRY_FETCH_TIMEOUT_MS, 20000),
  stationRevalidateSeconds: toNumber(process.env.STATION_REVALIDATE_SECONDS, 1800),
  cityRadiusKm: toNumber(process.env.CITY_RADIUS_KM, 35),
  cityStationLimit: toNumber(process.env.CITY_STATION_LIMIT, 24),
  routeNearbyRadiusKm: toNumber(process.env.ROUTE_NEARBY_RADIUS_KM, 6),
  routeStationLimit: toNumber(process.env.ROUTE_STATION_LIMIT, 24),
  highwayStationLimit: toNumber(process.env.HIGHWAY_STATION_LIMIT, 24),
  ministryCacheFile:
    process.env.MINISTRY_CACHE_FILE ?? "data/generated/ministry-stations.json",
  googleRoutesCacheFile:
    process.env.GOOGLE_ROUTES_CACHE_FILE ?? "data/generated/route-geometries.json",
  googleMapsServerApiKey:
    process.env.GOOGLE_MAPS_SERVER_API_KEY ??
    process.env.GOOGLE_MAPS_API_KEY ??
    "",
  googleRoutesApiUrl:
    process.env.GOOGLE_ROUTES_API_URL ??
    "https://routes.googleapis.com/directions/v2:computeRoutes",
} as const;
