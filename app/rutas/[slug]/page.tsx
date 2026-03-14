import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { RoutePageTemplate } from "@/components/templates/RoutePageTemplate";
import {
  getAllRoutes,
  getCitiesBySlugs,
  getDataSourceInfo,
  getRouteBySlug,
  getRouteDataset,
} from "@/lib/content";
import { buildRouteFaqs } from "@/lib/faqs";
import { getRelatedHighwaysForRoute, getRelatedRoutesForRoute } from "@/lib/internal-links";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildItemListSchema,
  buildStationListItems,
} from "@/lib/schema-builders";
import { routePath } from "@/lib/routes";

export const revalidate = 3600;

interface RoutePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRoutes().map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({
  params,
}: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    return {};
  }

  return buildPageMetadata({
    title: `Gasolineras baratas en la ruta ${route.origin} - ${route.destination} | Gas Ahorro`,
    description: `Encuentra dónde repostar más barato en la ruta ${route.origin} - ${route.destination}, compara estaciones y calcula tu ahorro.`,
    path: routePath(route.slug),
  });
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  const [{ stations, coordinates }, dataSource] = await Promise.all([
    getRouteDataset(route),
    getDataSourceInfo(),
  ]);
  const faqs = buildRouteFaqs(route, stations);

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Rutas", href: "/rutas" },
            {
              name: `${route.origin} - ${route.destination}`,
              href: routePath(route.slug),
            },
          ]),
          buildCollectionPageSchema(
            `Gasolineras baratas en la ruta ${route.origin} - ${route.destination}`,
            route.summary,
            routePath(route.slug),
          ),
          buildItemListSchema(
            `Estaciones en ruta ${route.origin} - ${route.destination}`,
            buildStationListItems(stations),
          ),
          buildFaqSchema(faqs),
        ]}
      />

      <RoutePageTemplate
        route={route}
        stations={stations}
        routeCoordinates={coordinates}
        dataSource={dataSource}
        relatedRoutes={getRelatedRoutesForRoute(route.slug)}
        relatedCities={getCitiesBySlugs([
          route.originSlug,
          route.destinationSlug,
          ...getRelatedRoutesForRoute(route.slug).flatMap((item) => [
            item.originSlug,
            item.destinationSlug,
          ]),
        ])}
        relatedHighways={getRelatedHighwaysForRoute(route.slug)}
      />
    </>
  );
}
