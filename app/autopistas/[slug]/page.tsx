import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { HighwayPageTemplate } from "@/components/templates/HighwayPageTemplate";
import {
  getAllHighways,
  getDataSourceInfo,
  getHighwayBySlug,
  getHighwayStations,
} from "@/lib/content";
import { buildHighwayFaqs } from "@/lib/faqs";
import { getCitiesForHighway, getRoutesForHighway } from "@/lib/internal-links";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildItemListSchema,
  buildStationListItems,
} from "@/lib/schema-builders";
import { highwayPath } from "@/lib/routes";

export const revalidate = 3600;

interface HighwayPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllHighways().map((highway) => ({ slug: highway.slug }));
}

export async function generateMetadata({
  params,
}: HighwayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const highway = getHighwayBySlug(slug);

  if (!highway) {
    return {};
  }

  return buildPageMetadata({
    title: `Gasolineras más baratas en la ${highway.name} | Gas Ahorro`,
    description: `Consulta las estaciones de servicio más baratas en la ${highway.name} y encuentra dónde ahorrar en tu viaje.`,
    path: highwayPath(highway.slug),
  });
}

export default async function HighwayPage({ params }: HighwayPageProps) {
  const { slug } = await params;
  const highway = getHighwayBySlug(slug);

  if (!highway) {
    notFound();
  }

  const [stations, dataSource] = await Promise.all([
    getHighwayStations(highway),
    getDataSourceInfo(),
  ]);
  const faqs = buildHighwayFaqs(highway, stations);

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Autopistas", href: "/autopistas" },
            { name: highway.name, href: highwayPath(highway.slug) },
          ]),
          buildCollectionPageSchema(
            `Gasolineras más baratas en la ${highway.name}`,
            highway.description,
            highwayPath(highway.slug),
          ),
          buildItemListSchema(
            `Estaciones en ${highway.name}`,
            buildStationListItems(stations),
          ),
          buildFaqSchema(faqs),
        ]}
      />

      <HighwayPageTemplate
        highway={highway}
        stations={stations}
        dataSource={dataSource}
        routes={getRoutesForHighway(highway.slug)}
        cities={getCitiesForHighway(highway.slug)}
      />
    </>
  );
}
