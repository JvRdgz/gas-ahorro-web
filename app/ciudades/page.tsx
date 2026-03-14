import type { Metadata } from "next";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { LinkCard } from "@/components/ui/LinkCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getAllCities, getCityStations } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildItemListSchema,
} from "@/lib/schema-builders";
import { cityPath } from "@/lib/routes";
import { summarizeFuelPrices } from "@/lib/station-helpers";
import { formatPricePerLiter } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Gasolineras más baratas por ciudad | Gas Ahorro",
  description:
    "Explora ciudades con gasolineras baratas, compara precios de gasolina y diésel y encuentra dónde repostar mejor con Gas Ahorro.",
  path: "/ciudades",
});

export default async function CitiesIndexPage() {
  const cities = getAllCities();
  const cards = await Promise.all(
    cities.map(async (city) => ({
      city,
      summary: summarizeFuelPrices(await getCityStations(city), "gasoline95"),
    })),
  );

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Ciudades", href: "/ciudades" },
          ]),
          buildCollectionPageSchema(
            "Ciudades con gasolineras baratas",
            "Listado de ciudades con páginas SEO de ahorro en repostaje.",
            "/ciudades",
          ),
          buildItemListSchema(
            "Ciudades Gas Ahorro",
            cities.map((city) => ({
              name: city.name,
              url: `https://www.gasahorro.es${cityPath(city.slug)}`,
              description: city.summary,
            })),
          ),
        ]}
      />

      <SectionContainer>
        <div className="section-heading">
          <span className="eyebrow">Índice de ciudades</span>
          <h1>Gasolineras baratas por ciudad</h1>
          <p>
            Páginas locales con metadata dinámica, tabla ordenada por precio, mapa,
            cálculo de ahorro y enlaces internos hacia rutas, autopistas y precios.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="index-grid">
          {cards.map(({ city, summary }) => (
            <LinkCard
              key={city.slug}
              href={cityPath(city.slug)}
              eyebrow={city.province}
              title={`Gasolineras más baratas en ${city.name}`}
              description={city.summary}
              meta={summary ? `Desde ${formatPricePerLiter(summary.cheapest)}` : "Sin dato"}
            />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
