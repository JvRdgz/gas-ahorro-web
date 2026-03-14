import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { CityPageTemplate } from "@/components/templates/CityPageTemplate";
import { getCityBySlug, getCityStations, getDataSourceInfo } from "@/lib/content";
import { getRelatedCitiesForCity, getRelatedHighwaysForCity, getRelatedRoutesForCity } from "@/lib/internal-links";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildItemListSchema,
  buildStationListItems,
} from "@/lib/schema-builders";
import { buildCityFaqs } from "@/lib/faqs";
import { cityPath } from "@/lib/routes";
import { getAllCities } from "@/lib/content";

export const revalidate = 3600;

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCities().map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return {};
  }

  return buildPageMetadata({
    title: `Gasolineras más baratas en ${city.name} | Gas Ahorro`,
    description: `Descubre las gasolineras más baratas en ${city.name}, compara precios y ahorra en cada repostaje con Gas Ahorro.`,
    path: cityPath(city.slug),
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const [stations, dataSource] = await Promise.all([
    getCityStations(city),
    getDataSourceInfo(),
  ]);
  const faqs = buildCityFaqs(city.name, stations);

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Ciudades", href: "/ciudades" },
            { name: city.name, href: cityPath(city.slug) },
          ]),
          buildCollectionPageSchema(
            `Gasolineras más baratas en ${city.name}`,
            city.summary,
            cityPath(city.slug),
          ),
          buildItemListSchema(
            `Estaciones en ${city.name}`,
            buildStationListItems(stations),
          ),
          buildFaqSchema(faqs),
        ]}
      />

      <CityPageTemplate
        city={city}
        stations={stations}
        dataSource={dataSource}
        relatedRoutes={getRelatedRoutesForCity(city.slug)}
        relatedCities={getRelatedCitiesForCity(city.slug)}
        relatedHighways={getRelatedHighwaysForCity(city.slug)}
      />
    </>
  );
}
