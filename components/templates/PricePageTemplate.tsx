import Link from "next/link";

import { SavingsCalculator } from "@/components/data/SavingsCalculator";
import { PriceSummaryCard } from "@/components/data/PriceSummaryCard";
import { StationsExplorer } from "@/components/data/StationsExplorer";
import { AppDownloadCTA } from "@/components/sections/AppDownloadCTA";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { RelatedHighways } from "@/components/sections/RelatedHighways";
import { RelatedRoutes } from "@/components/sections/RelatedRoutes";
import { SeoHero } from "@/components/sections/SeoHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DataSourceNotice } from "@/components/ui/DataSourceNotice";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { buildPriceFaqs } from "@/lib/faqs";
import { getMapCenterFromStations } from "@/lib/map-helpers";
import { cityPath, pricePath } from "@/lib/routes";
import { getLatestUpdate, summarizeFuelPrices } from "@/lib/station-helpers";
import { formatCurrency, formatPricePerLiter } from "@/lib/utils";
import type { City, DataSourceInfo, Highway, RouteEntity, Station } from "@/types/domain";

interface PricePageTemplateProps {
  city: City;
  stations: Station[];
  dataSource: DataSourceInfo;
  relatedRoutes: RouteEntity[];
  relatedHighways: Highway[];
}

export function PricePageTemplate({
  city,
  stations,
  dataSource,
  relatedRoutes,
  relatedHighways,
}: PricePageTemplateProps) {
  const gasolineSummary = summarizeFuelPrices(stations, "gasoline95");
  const dieselSummary = summarizeFuelPrices(stations, "diesel");
  const updatedAt = getLatestUpdate(stations);
  const faqs = buildPriceFaqs(city.name);

  return (
    <>
      <SectionContainer>
        <Breadcrumbs
          items={[
            { name: "Inicio", href: "/" },
            { name: "Precios", href: "/precios" },
            { name: city.name, href: pricePath(city.slug) },
          ]}
        />
        <SeoHero
          eyebrow="Precio hoy"
          title={`Precio gasolina ${city.name} hoy`}
          description={`Consulta el rango de precios visible en ${city.name}, detecta la estación más barata y enlaza a la app para seguir comparando en tiempo real.`}
          updatedAt={updatedAt}
          metrics={[
            {
              label: "Gasolina 95 media",
              value: gasolineSummary
                ? formatPricePerLiter(gasolineSummary.average)
                : "Sin dato",
            },
            {
              label: "Gasolina 95 mínima",
              value: gasolineSummary
                ? formatPricePerLiter(gasolineSummary.cheapest)
                : "Sin dato",
            },
            {
              label: "Diésel mínimo",
              value: dieselSummary ? formatPricePerLiter(dieselSummary.cheapest) : "Sin dato",
            },
            {
              label: "Diferencia máxima",
              value: gasolineSummary
                ? formatCurrency(gasolineSummary.spread)
                : "Sin dato",
            },
          ]}
        />
        <DataSourceNotice source={dataSource} />
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <div className="summary-grid">
            {gasolineSummary ? (
              <PriceSummaryCard
                title="Precio más barato"
                value={formatPricePerLiter(gasolineSummary.cheapest)}
                description="Referencia más competitiva en gasolina 95."
              />
            ) : null}
            {gasolineSummary ? (
              <PriceSummaryCard
                title="Precio más caro"
                value={formatPricePerLiter(gasolineSummary.highest)}
                description="Te ayuda a visualizar la dispersión local."
              />
            ) : null}
            {gasolineSummary ? (
              <PriceSummaryCard
                title="Diferencia de ahorro"
                value={formatCurrency(gasolineSummary.spread * 50)}
                description="Impacto orientativo sobre un depósito de 50 litros."
              />
            ) : null}
          </div>

          <article className="route-summary-card">
            <span className="eyebrow">Enlace interno recomendado</span>
            <h2>Profundiza en estaciones, rutas y contexto local</h2>
            <p>
              Si quieres una vista más amplia que el precio medio, entra en la landing
              de ciudad para ver mapa, tabla, FAQs y enlaces internos estructurados.
            </p>
            <div className="button-row">
              <Link className="button button-secondary" href={cityPath(city.slug)}>
                Ver ciudad de {city.name}
              </Link>
            </div>
          </article>

          <StationsExplorer
            stations={stations}
            center={getMapCenterFromStations(stations, [city.latitude, city.longitude])}
          />
        </div>
      </SectionContainer>

      <SectionContainer>
        <SavingsCalculator
          title={`Calcula el ahorro potencial en ${city.name}`}
          description="Ajusta tus valores para traducir la diferencia de precio local en euros reales."
          defaultPriceDifference={gasolineSummary?.spread ?? 0.08}
        />
      </SectionContainer>

      <SectionContainer>
        <FaqBlock items={faqs} />
      </SectionContainer>

      <SectionContainer>
        <AppDownloadCTA description="La app te permite ver estaciones concretas, filtros avanzados y navegación hasta la parada elegida." />
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <RelatedRoutes routes={relatedRoutes} />
          <RelatedHighways highways={relatedHighways} />
        </div>
      </SectionContainer>
    </>
  );
}
