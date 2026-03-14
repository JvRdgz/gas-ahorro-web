import type { Metadata } from "next";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { LinkCard } from "@/components/ui/LinkCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getAllRoutes } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildItemListSchema,
} from "@/lib/schema-builders";
import { routePath } from "@/lib/routes";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Gasolineras baratas en ruta | Gas Ahorro",
  description:
    "Encuentra dónde repostar más barato en tus rutas habituales, compara estaciones y calcula el ahorro estimado por trayecto.",
  path: "/rutas",
});

export default function RoutesIndexPage() {
  const routes = getAllRoutes();

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Rutas", href: "/rutas" },
          ]),
          buildCollectionPageSchema(
            "Rutas con gasolineras baratas",
            "Listado de rutas con comparación de estaciones y ahorro estimado.",
            "/rutas",
          ),
          buildItemListSchema(
            "Rutas Gas Ahorro",
            routes.map((route) => ({
              name: `${route.origin} - ${route.destination}`,
              url: `https://www.gasahorro.es${routePath(route.slug)}`,
              description: route.summary,
            })),
          ),
        ]}
      />

      <SectionContainer>
        <div className="section-heading">
          <span className="eyebrow">Índice de rutas</span>
          <h1>Gasolineras baratas en ruta</h1>
          <p>
            Landings preparadas para búsquedas como "gasolineras baratas en ruta
            madrid valencia" o "dónde repostar barato camino a Sevilla".
          </p>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="index-grid">
          {routes.map((route) => (
            <LinkCard
              key={route.slug}
              href={routePath(route.slug)}
              eyebrow={route.highwaysIncluded.map((item) => item.toUpperCase()).join(" · ")}
              title={`${route.origin} - ${route.destination}`}
              description={route.summary}
              meta={`${route.distanceKm} km · ${route.estimatedDriveTime}`}
            />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
