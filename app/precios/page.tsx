import type { Metadata } from "next";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { LinkCard } from "@/components/ui/LinkCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getCityBySlug, getCityStations } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildItemListSchema,
} from "@/lib/schema-builders";
import { pricePageSlugs } from "@/data/price-pages";
import { pricePath } from "@/lib/routes";
import { summarizeFuelPrices } from "@/lib/station-helpers";
import { formatPricePerLiter } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Precio gasolina hoy por ciudad | Gas Ahorro",
  description:
    "Consulta páginas de precio gasolina hoy y diésel por ciudad con actualización visible, diferencias de ahorro y enlaces a gasolineras concretas.",
  path: "/precios",
});

export default async function PricesIndexPage() {
  const items = pricePageSlugs
    .map((slug) => getCityBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const cards = await Promise.all(
    items.map(async (city) => ({
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
            { name: "Precios", href: "/precios" },
          ]),
          buildCollectionPageSchema(
            "Precio gasolina hoy por ciudad",
            "Listado de páginas orientadas a búsquedas de precio gasolina hoy.",
            "/precios",
          ),
          buildItemListSchema(
            "Precios hoy Gas Ahorro",
            items.map((city) => ({
              name: `Precio gasolina ${city.name} hoy`,
              url: `https://www.gasahorro.es${pricePath(city.slug)}`,
              description: city.summary,
            })),
          ),
        ]}
      />

      <SectionContainer>
        <div className="section-heading">
          <span className="eyebrow">Índice de precios</span>
          <h1>Precio gasolina hoy por ciudad</h1>
          <p>
            Páginas construidas para búsquedas del tipo "precio gasolina madrid hoy"
            y "precio diesel barcelona hoy", con contexto útil y transición a la app.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="index-grid">
          {cards.map(({ city, summary }) => (
            <LinkCard
              key={city.slug}
              href={pricePath(city.slug)}
              eyebrow="Precio hoy"
              title={`Precio gasolina ${city.name} hoy`}
              description={`Resumen de precios medios, mínimos y diferencia de ahorro en ${city.name}.`}
              meta={summary ? `Desde ${formatPricePerLiter(summary.cheapest)}` : "Sin dato"}
            />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
