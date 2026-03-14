import { SavingsCalculator } from "@/components/data/SavingsCalculator";
import { StationsExplorer } from "@/components/data/StationsExplorer";
import { AppDownloadCTA } from "@/components/sections/AppDownloadCTA";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { RelatedCities } from "@/components/sections/RelatedCities";
import { RelatedHighways } from "@/components/sections/RelatedHighways";
import { RelatedRoutes } from "@/components/sections/RelatedRoutes";
import { SeoHero } from "@/components/sections/SeoHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DataSourceNotice } from "@/components/ui/DataSourceNotice";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { buildCityFaqs } from "@/lib/faqs";
import { getMapCenterFromStations } from "@/lib/map-helpers";
import { summarizeFuelPrices, getLatestUpdate } from "@/lib/station-helpers";
import { cityPath } from "@/lib/routes";
import { formatPricePerLiter } from "@/lib/utils";
import type { City, DataSourceInfo, Highway, RouteEntity, Station } from "@/types/domain";

interface CityPageTemplateProps {
  city: City;
  stations: Station[];
  dataSource: DataSourceInfo;
  relatedCities: City[];
  relatedRoutes: RouteEntity[];
  relatedHighways: Highway[];
}

export function CityPageTemplate({
  city,
  stations,
  dataSource,
  relatedCities,
  relatedRoutes,
  relatedHighways,
}: CityPageTemplateProps) {
  const gasolineSummary = summarizeFuelPrices(stations, "gasoline95");
  const dieselSummary = summarizeFuelPrices(stations, "diesel");
  const updatedAt = getLatestUpdate(stations);
  const faqs = buildCityFaqs(city.name, stations);

  return (
    <>
      <SectionContainer>
        <Breadcrumbs
          items={[
            { name: "Inicio", href: "/" },
            { name: "Ciudades", href: "/ciudades" },
            { name: city.name, href: cityPath(city.slug) },
          ]}
        />
        <SeoHero
          eyebrow="Ciudad"
          title={`Gasolineras más baratas en ${city.name}`}
          description={`${city.intro} ${city.summary}`}
          updatedAt={updatedAt}
          metrics={[
            { label: "Estaciones analizadas", value: String(stations.length) },
            {
              label: "Gasolina 95 desde",
              value: gasolineSummary
                ? formatPricePerLiter(gasolineSummary.cheapest)
                : "Sin dato",
            },
            {
              label: "Diésel desde",
              value: dieselSummary ? formatPricePerLiter(dieselSummary.cheapest) : "Sin dato",
            },
            {
              label: "Autovías conectadas",
              value: city.highwaySlugs.map((slug) => slug.toUpperCase()).join(" · "),
            },
          ]}
        />
        <DataSourceNotice source={dataSource} />
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <article className="route-summary-card">
            <span className="eyebrow">Resumen rápido</span>
            <h2>Cómo usar esta página para decidir mejor dónde repostar</h2>
            <p>
              Esta landing está pensada para resolver búsquedas locales como{" "}
              <strong>{`"gasolina barata en ${city.name}"`}</strong> con información
              útil, ordenada por precio y enlazada a rutas y carreteras relacionadas.
            </p>
          </article>

          <StationsExplorer
            stations={stations}
            center={getMapCenterFromStations(stations, [city.latitude, city.longitude])}
          />
        </div>
      </SectionContainer>

      <SectionContainer>
        <SavingsCalculator
          title={`Calcula tu ahorro estimado al repostar barato en ${city.name}`}
          description="Ajusta consumo, depósito y diferencia de precio para estimar cuánto cambia tu coste por repostaje."
          defaultPriceDifference={gasolineSummary?.spread ?? 0.08}
        />
      </SectionContainer>

      <SectionContainer>
        <FaqBlock
          items={faqs}
          description={`Preguntas orientadas a búsquedas locales con alta intención de ahorro en ${city.name}.`}
        />
      </SectionContainer>

      <SectionContainer>
        <AppDownloadCTA />
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <RelatedRoutes routes={relatedRoutes} />
          <RelatedHighways highways={relatedHighways} />
          <RelatedCities cities={relatedCities} />
        </div>
      </SectionContainer>
    </>
  );
}
