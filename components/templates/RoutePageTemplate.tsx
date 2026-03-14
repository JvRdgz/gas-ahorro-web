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
import { buildRouteFaqs } from "@/lib/faqs";
import { getMapCenterFromRoute } from "@/lib/map-helpers";
import { routePath } from "@/lib/routes";
import { summarizeFuelPrices, getLatestUpdate } from "@/lib/station-helpers";
import { formatPricePerLiter } from "@/lib/utils";
import type {
  City,
  DataSourceInfo,
  Highway,
  RouteEntity,
  Station,
} from "@/types/domain";

import { RouteSummaryCard } from "@/components/data/RouteSummaryCard";

interface RoutePageTemplateProps {
  route: RouteEntity;
  stations: Station[];
  routeCoordinates: [number, number][];
  dataSource: DataSourceInfo;
  relatedRoutes: RouteEntity[];
  relatedCities: City[];
  relatedHighways: Highway[];
}

export function RoutePageTemplate({
  route,
  stations,
  routeCoordinates,
  dataSource,
  relatedRoutes,
  relatedCities,
  relatedHighways,
}: RoutePageTemplateProps) {
  const gasolineSummary = summarizeFuelPrices(stations, "gasoline95");
  const updatedAt = getLatestUpdate(stations);
  const faqs = buildRouteFaqs(route, stations);

  return (
    <>
      <SectionContainer>
        <Breadcrumbs
          items={[
            { name: "Inicio", href: "/" },
            { name: "Rutas", href: "/rutas" },
            {
              name: `${route.origin} - ${route.destination}`,
              href: routePath(route.slug),
            },
          ]}
        />
        <SeoHero
          eyebrow="Ruta"
          title={`Gasolineras más baratas en la ruta ${route.origin} - ${route.destination}`}
          description={route.summary}
          updatedAt={updatedAt}
          metrics={[
            { label: "Distancia", value: `${route.distanceKm} km` },
            { label: "Tiempo estimado", value: route.estimatedDriveTime },
            {
              label: "Gasolina 95 desde",
              value: gasolineSummary
                ? formatPricePerLiter(gasolineSummary.cheapest)
                : "Sin dato",
            },
            {
              label: "Vías incluidas",
              value: route.highwaysIncluded.map((slug) => slug.toUpperCase()).join(" · "),
            },
          ]}
        />
        <DataSourceNotice source={dataSource} />
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <RouteSummaryCard
            title={`Resumen de la ruta ${route.origin} - ${route.destination}`}
            summary={route.summary}
            distanceKm={route.distanceKm}
            estimatedDriveTime={route.estimatedDriveTime}
            highways={route.highwaysIncluded}
          />

          <StationsExplorer
            stations={stations}
            center={getMapCenterFromRoute(routeCoordinates, routeCoordinates[0])}
            routeCoordinates={routeCoordinates}
          />
        </div>
      </SectionContainer>

      <SectionContainer>
        <SavingsCalculator
          title="Calculadora de ahorro por ruta"
          description="Estima el impacto económico de parar en una estación barata durante este trayecto."
          defaultPriceDifference={gasolineSummary?.spread ?? 0.08}
          defaultDistanceKm={route.distanceKm}
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
          <RelatedRoutes routes={relatedRoutes} />
          <RelatedCities cities={relatedCities} />
          <RelatedHighways highways={relatedHighways} />
        </div>
      </SectionContainer>
    </>
  );
}
