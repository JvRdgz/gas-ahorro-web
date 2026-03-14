import type { Metadata } from "next";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { LinkCard } from "@/components/ui/LinkCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getAllHighways } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildItemListSchema,
} from "@/lib/schema-builders";
import { highwayPath } from "@/lib/routes";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Gasolineras baratas por autopista | Gas Ahorro",
  description:
    "Consulta gasolineras más baratas por autopista y carretera, con páginas preparadas para A-1, A-3, A-6, AP-7 y otras vías clave.",
  path: "/autopistas",
});

export default function HighwaysIndexPage() {
  const highways = getAllHighways();

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Autopistas", href: "/autopistas" },
          ]),
          buildCollectionPageSchema(
            "Autopistas con gasolineras baratas",
            "Listado de carreteras y autopistas con estaciones relacionadas.",
            "/autopistas",
          ),
          buildItemListSchema(
            "Autopistas Gas Ahorro",
            highways.map((highway) => ({
              name: highway.name,
              url: `https://www.gasahorro.es${highwayPath(highway.slug)}`,
              description: highway.description,
            })),
          ),
        ]}
      />

      <SectionContainer>
        <div className="section-heading">
          <span className="eyebrow">Índice de autopistas</span>
          <h1>Gasolineras baratas por autopista y carretera</h1>
          <p>
            Una arquitectura lista para capturar búsquedas por vía concreta con
            ranking, mapa, FAQs y enlaces a ciudades y rutas relacionadas.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="index-grid">
          {highways.map((highway) => (
            <LinkCard
              key={highway.slug}
              href={highwayPath(highway.slug)}
              eyebrow={highway.type}
              title={`Gasolineras más baratas en la ${highway.name}`}
              description={highway.description}
              meta={highway.citiesConnected.join(" · ")}
            />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
