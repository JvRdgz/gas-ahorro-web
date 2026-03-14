import { blogPosts } from "@/data/blog-posts";
import { cities } from "@/data/cities";
import { highways } from "@/data/highways";
import { routes } from "@/data/routes";
import { runtimeConfig } from "@/lib/env";
import { distancePointToPolylineKm, haversineDistanceKm } from "@/lib/geo";
import { getRouteGeometry } from "@/lib/server/route-geometry-source";
import { getStationSourceSnapshot } from "@/lib/server/ministry-station-source";
import { slugify } from "@/lib/slugify";
import { dedupeBy } from "@/lib/utils";
import type {
  BlogPost,
  City,
  DataSourceInfo,
  Highway,
  RouteDataset,
  RouteEntity,
  Station,
} from "@/types/domain";

function sortStationsByPriceAndDistance(
  stations: Array<{ station: Station; distanceKm: number }>,
) {
  return stations
    .sort((left, right) => {
      const leftPrice =
        left.station.priceGasoline95 ?? left.station.priceDiesel ?? Number.POSITIVE_INFINITY;
      const rightPrice =
        right.station.priceGasoline95 ?? right.station.priceDiesel ?? Number.POSITIVE_INFINITY;

      if (leftPrice !== rightPrice) {
        return leftPrice - rightPrice;
      }

      return left.distanceKm - right.distanceKm;
    })
    .map((entry) => entry.station);
}

function matchStationToCity(city: City, station: Station) {
  const citySlug = slugify(city.name);
  const stationCitySlug = slugify(station.city);
  const stationProvinceSlug = slugify(station.province);
  const exactCityMatch = stationCitySlug === citySlug;
  const sameProvince = stationProvinceSlug === slugify(city.province);
  const distanceKm = haversineDistanceKm(
    [city.latitude, city.longitude],
    [station.latitude, station.longitude],
  );

  return {
    distanceKm,
    matches:
      exactCityMatch ||
      (sameProvince && distanceKm <= runtimeConfig.cityRadiusKm),
  };
}

function selectStationsForCity(city: City, allStations: Station[]) {
  return sortStationsByPriceAndDistance(
    allStations
      .map((station) => {
        const result = matchStationToCity(city, station);
        return result.matches
          ? {
              station,
              distanceKm: result.distanceKm,
            }
          : null;
      })
      .filter(
        (
          item,
        ): item is {
          station: Station;
          distanceKm: number;
        } => Boolean(item),
      ),
  ).slice(0, runtimeConfig.cityStationLimit);
}

function selectStationsForHighway(highway: Highway, allStations: Station[]) {
  const highwayPattern = highway.slug.toUpperCase().replace(/([A-Z]+)(\d+)/, "$1-$2");

  return sortStationsByPriceAndDistance(
    allStations
      .map((station) => {
        const address = station.address.toUpperCase().replace(/\s+/g, "");
        const matches =
          station.highway === highway.slug ||
          address.includes(highway.slug.toUpperCase()) ||
          address.includes(highwayPattern);

        return matches
          ? {
              station,
              distanceKm: 0,
            }
          : null;
      })
      .filter(
        (
          item,
        ): item is {
          station: Station;
          distanceKm: number;
        } => Boolean(item),
      ),
  ).slice(0, runtimeConfig.highwayStationLimit);
}

function selectStationsForRoute(
  route: RouteEntity,
  allStations: Station[],
  coordinates: [number, number][],
) {
  return sortStationsByPriceAndDistance(
    allStations
      .map((station) => {
        const distanceKm = distancePointToPolylineKm(
          [station.latitude, station.longitude],
          coordinates,
        );
        const matchesHighway =
          Boolean(station.highway) &&
          route.highwaysIncluded.includes(station.highway as string);

        return distanceKm <= runtimeConfig.routeNearbyRadiusKm || matchesHighway
          ? {
              station,
              distanceKm,
            }
          : null;
      })
      .filter(
        (
          item,
        ): item is {
          station: Station;
          distanceKm: number;
        } => Boolean(item),
      ),
  ).slice(0, runtimeConfig.routeStationLimit);
}

export function getAllCities() {
  return cities;
}

export function getCityBySlug(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export async function getCityStations(city: City) {
  const allStations = await getAllStations();
  return selectStationsForCity(city, allStations);
}

export function getAllRoutes() {
  return routes;
}

export function getRouteBySlug(slug: string) {
  return routes.find((route) => route.slug === slug);
}

export async function getRouteDataset(route: RouteEntity): Promise<RouteDataset> {
  const [allStations, coordinates] = await Promise.all([
    getAllStations(),
    getRouteGeometry(route),
  ]);

  return {
    coordinates,
    stations: selectStationsForRoute(route, allStations, coordinates),
  };
}

export async function getRouteStations(route: RouteEntity) {
  return (await getRouteDataset(route)).stations;
}

export function getAllHighways() {
  return highways;
}

export function getHighwayBySlug(slug: string) {
  return highways.find((highway) => highway.slug === slug);
}

export async function getHighwayStations(highway: Highway) {
  const allStations = await getAllStations();
  return selectStationsForHighway(highway, allStations);
}

export async function getAllStations() {
  return (await getStationSourceSnapshot()).stations;
}

export async function getDataSourceInfo(): Promise<DataSourceInfo> {
  return (await getStationSourceSnapshot()).meta;
}

export async function getStationsForPriceSlug(slug: string) {
  const city = getCityBySlug(slug);
  return city ? getCityStations(city) : [];
}

export function getAllBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getCitiesBySlugs(slugs: string[]) {
  return dedupeBy(
    slugs
      .map((slug) => getCityBySlug(slug))
      .filter((item): item is City => Boolean(item)),
    (item) => item.slug,
  );
}

export function getRoutesBySlugs(slugs: string[]) {
  return dedupeBy(
    slugs
      .map((slug) => getRouteBySlug(slug))
      .filter((item): item is RouteEntity => Boolean(item)),
    (item) => item.slug,
  );
}

export function getHighwaysBySlugs(slugs: string[]) {
  return dedupeBy(
    slugs
      .map((slug) => getHighwayBySlug(slug))
      .filter((item): item is Highway => Boolean(item)),
    (item) => item.slug,
  );
}

export function getCityByName(name: string) {
  return cities.find((city) => city.name === name);
}

export async function getStationById(id: string) {
  return (await getAllStations()).find((station) => station.id === id);
}

export async function getStationsByHighwaySlug(slug: string) {
  return (await getAllStations()).filter((station) => station.highway === slug);
}

export async function getStationsByCityName(cityName: string) {
  const city = cities.find((item) => item.name === cityName);
  if (!city) {
    return [];
  }

  return getCityStations(city);
}

export function getRelatedBlogPosts(
  currentSlug: string,
  limit = 3,
): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export function getLatestGlobalUpdate(stationList: Station[]) {
  return [...stationList].sort((left, right) =>
    right.updatedAt.localeCompare(left.updatedAt),
  )[0]?.updatedAt;
}
