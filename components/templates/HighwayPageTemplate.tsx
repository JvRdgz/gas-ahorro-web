import { SavingsCalculator } from "@/components/data/SavingsCalculator";
import { StationsExplorer } from "@/components/data/StationsExplorer";
import { AppDownloadCTA } from "@/components/sections/AppDownloadCTA";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { RelatedCities } from "@/components/sections/RelatedCities";
import { RelatedRoutes } from "@/components/sections/RelatedRoutes";
import { SeoHero } from "@/components/sections/SeoHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DataSourceNotice } from "@/components/ui/DataSourceNotice";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { buildHighwayFaqs } from "@/lib/faqs";
import { getMapCenterFromStations } from "@/lib/map-helpers";
import { highwayPath } from "@/lib/routes";
import { summarizeFuelPrices, getLatestUpdate } from "@/lib/station-helpers";
import { formatPricePerLiter } from "@/lib/utils";
import type { City, DataSourceInfo, Highway, RouteEntity, Station } from "@/types/domain";

interface HighwayPageTemplateProps {
  highway: Highway;
  stations: Station[];
  dataSource: DataSourceInfo;
  routes: RouteEntity[];
  cities: City[];
}

export function HighwayPageTemplate({
  highway,
  stations,
  dataSource,
  routes,
  cities,
}: HighwayPageTemplateProps) {
  const gasolineSummary = summarizeFuelPrices(stations, "gasoline95");
  const updatedAt = getLatestUpdate(stations);
  const faqs = buildHighwayFaqs(highway, stations);

  return (
    <>
      <SectionContainer>
        <Breadcrumbs
          items={[
            { name: "Inicio", href: "/" },
            { name: "Autopistas", href: "/autopistas" },
            { name: highway.name, href: highwayPath(highway.slug) },
          ]}
        />
        <SeoHero
          eyebrow="Autopista / carretera"
          title={`Gasolineras más baratas en la ${highway.name}`}
          description={highway.description}
          updatedAt={updatedAt}
          metrics={[
            { label: "Tipo de vía", value: highway.type },
            { label: "Ciudades conectadas", value: String(highway.citiesConnected.length) },
            { label: "Estaciones en esta vista", value: String(stations.length) },
            {
              label: "Gasolina 95 desde",
              value: gasolineSummary
                ? formatPricePerLiter(gasolineSummary.cheapest)
                : "Sin dato",
            },
          ]}
        />
        <DataSourceNotice source={dataSource} />
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <article className="route-summary-card">
            <span className="eyebrow">Descripción de la vía</span>
            <h2>Dónde suele concentrarse el ahorro en la {highway.name}</h2>
            <p>
              {highway.description} Esta plantilla está preparada para crecer con
              más tramos, estaciones y enlaces internos sin rehacer la arquitectura.
            </p>
          </article>

          <StationsExplorer
            stations={stations}
            center={getMapCenterFromStations(stations, [
              stations[0]?.latitude ?? 40.4168,
              stations[0]?.longitude ?? -3.7038,
            ])}
          />
        </div>
      </SectionContainer>

      <SectionContainer>
        <SavingsCalculator
          title={`Calcula cuánto puedes ahorrar repostando mejor en la ${highway.name}`}
          description="Usa esta estimación para valorar la diferencia entre parar en un área cara o en una estación mejor posicionada en precio."
          defaultPriceDifference={gasolineSummary?.spread ?? 0.08}
          defaultDistanceKm={350}
        />
      </SectionContainer>

      <SectionContainer>
        <FaqBlock items={faqs} />
      </SectionContainer>

      <SectionContainer>
        <AppDownloadCTA />
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <RelatedRoutes routes={routes} />
          <RelatedCities cities={cities} />
        </div>
      </SectionContainer>
    </>
  );
}
