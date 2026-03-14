import {
  getAllHighways,
  getAllRoutes,
  getCityBySlug,
  getHighwayBySlug,
  getRouteBySlug,
} from "@/lib/content";
import type { City } from "@/types/domain";
import { dedupeBy } from "@/lib/utils";

export function getRelatedRoutesForCity(citySlug: string) {
  return getAllRoutes().filter(
    (route) =>
      route.originSlug === citySlug ||
      route.destinationSlug === citySlug ||
      getCityBySlug(citySlug)?.highwaySlugs.some((slug) =>
        route.highwaysIncluded.includes(slug),
      ),
  );
}

export function getRelatedCitiesForCity(citySlug: string) {
  const city = getCityBySlug(citySlug);

  if (!city) {
    return [];
  }

  const fromRoutes = getRelatedRoutesForCity(citySlug).flatMap((route) => [
    route.originSlug,
    route.destinationSlug,
  ]);
  const fromManual = city.nearbyCitySlugs;

  return dedupeBy(
    [...fromRoutes, ...fromManual]
      .filter((slug) => slug !== citySlug)
      .map((slug) => getCityBySlug(slug))
      .filter((item): item is City => Boolean(item)),
    (item) => item.slug,
  );
}

export function getRelatedHighwaysForCity(citySlug: string) {
  return getAllHighways().filter((highway) => highway.citySlugs.includes(citySlug));
}

export function getRoutesForHighway(highwaySlug: string) {
  return getAllRoutes().filter((route) => route.highwaysIncluded.includes(highwaySlug));
}

export function getCitiesForHighway(highwaySlug: string) {
  const highway = getHighwayBySlug(highwaySlug);

  if (!highway) {
    return [];
  }

  return highway.citySlugs
    .map((slug) => getCityBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export function getRelatedRoutesForRoute(routeSlug: string) {
  const route = getRouteBySlug(routeSlug);

  if (!route) {
    return [];
  }

  return getAllRoutes().filter(
    (candidate) =>
      candidate.slug !== route.slug &&
      (candidate.originSlug === route.originSlug ||
        candidate.destinationSlug === route.destinationSlug ||
        candidate.highwaysIncluded.some((slug) =>
          route.highwaysIncluded.includes(slug),
        )),
  );
}

export function getRelatedHighwaysForRoute(routeSlug: string) {
  const route = getRouteBySlug(routeSlug);

  if (!route) {
    return [];
  }

  return route.highwaysIncluded
    .map((slug) => getHighwayBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}
