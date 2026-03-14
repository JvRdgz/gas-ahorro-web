import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { PricePageTemplate } from "@/components/templates/PricePageTemplate";
import { pricePageSlugs } from "@/data/price-pages";
import { getCityBySlug, getCityStations, getDataSourceInfo } from "@/lib/content";
import { buildPriceFaqs } from "@/lib/faqs";
import { getRelatedHighwaysForCity, getRelatedRoutesForCity } from "@/lib/internal-links";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildItemListSchema,
  buildStationListItems,
} from "@/lib/schema-builders";
import { pricePath } from "@/lib/routes";

export const revalidate = 3600;

interface PricePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return pricePageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PricePageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return {};
  }

  return buildPageMetadata({
    title: `Precio gasolina ${city.name} hoy | Gas Ahorro`,
    description: `Consulta el precio de la gasolina y el diésel en ${city.name} hoy, compara estaciones y detecta dónde ahorrar más.`,
    path: pricePath(city.slug),
  });
}

export default async function PricePage({ params }: PricePageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city || !pricePageSlugs.includes(slug as (typeof pricePageSlugs)[number])) {
    notFound();
  }

  const [stations, dataSource] = await Promise.all([
    getCityStations(city),
    getDataSourceInfo(),
  ]);
  const faqs = buildPriceFaqs(city.name);

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Precios", href: "/precios" },
            { name: city.name, href: pricePath(city.slug) },
          ]),
          buildCollectionPageSchema(
            `Precio gasolina ${city.name} hoy`,
            city.summary,
            pricePath(city.slug),
          ),
          buildItemListSchema(
            `Estaciones y precios en ${city.name}`,
            buildStationListItems(stations),
          ),
          buildFaqSchema(faqs),
        ]}
      />

      <PricePageTemplate
        city={city}
        stations={stations}
        dataSource={dataSource}
        relatedRoutes={getRelatedRoutesForCity(city.slug)}
        relatedHighways={getRelatedHighwaysForCity(city.slug)}
      />
    </>
  );
}
