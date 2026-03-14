import Image from "next/image";
import Link from "next/link";

import { AppDownloadCTA } from "@/components/sections/AppDownloadCTA";
import { LinkCard } from "@/components/ui/LinkCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import {
  getAllCities,
  getAllHighways,
  getAllRoutes,
  getCityStations,
} from "@/lib/content";
import { blogPath, cityPath, highwayPath, routePath } from "@/lib/routes";
import { summarizeFuelPrices } from "@/lib/station-helpers";
import { formatPricePerLiter } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const featuredCities = getAllCities().slice(0, 6);
  const featuredRoutes = getAllRoutes().slice(0, 3);
  const featuredHighways = getAllHighways().slice(0, 3);
  const cityCards = await Promise.all(
    featuredCities.map(async (city) => {
      const summary = summarizeFuelPrices(await getCityStations(city), "gasoline95");
      return {
        city,
        summary,
      };
    }),
  );

  return (
    <>
      <SectionContainer>
        <div className="hero hero-home">
          <div className="hero-copy">
            <span className="eyebrow">SEO programático + app acquisition</span>
            <h1>Gasolineras baratas por ciudad, ruta y autopista</h1>
            <p className="lead">
              Arquitectura preparada para captar búsquedas de alta intención como
              "gasolina barata madrid", "gasolineras baratas a6" o "dónde repostar
              barato camino a Sevilla", sin sacrificar velocidad ni escalabilidad.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/ciudades">
                Explorar ciudades
              </Link>
              <a
                className="button button-secondary"
                href="https://play.google.com/store/apps/details?id=com.strelok.gasAhorro&pcampaignid=web_share"
                target="_blank"
                rel="noreferrer"
              >
                Descargar app
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-panel">
              <Image
                src="/img/Light/1.png"
                alt="Gas Ahorro mostrando gasolineras y mapa"
                width={896}
                height={1792}
                priority
              />
            </div>
            <div className="hero-panel">
              <span className="eyebrow">Seed inicial</span>
              <div className="summary-grid">
                <article className="summary-card">
                  <span>Ciudades</span>
                  <strong>6+</strong>
                  <p>Base inicial lista para crecer por provincias y barrios.</p>
                </article>
                <article className="summary-card">
                  <span>Rutas</span>
                  <strong>6</strong>
                  <p>Plantillas orientadas a intención de repostaje en trayecto.</p>
                </article>
                <article className="summary-card">
                  <span>Autopistas</span>
                  <strong>7</strong>
                  <p>Vías preparadas para captar búsquedas por carretera concreta.</p>
                </article>
                <article className="summary-card">
                  <span>SEO técnico</span>
                  <strong>Completo</strong>
                  <p>Metadata, schema, sitemap indexable e interlinking estructurado.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <div className="section-heading">
            <span className="eyebrow">Entradas SEO</span>
            <h2>Índices preparados para crecer a miles de páginas</h2>
          </div>
          <div className="cards-grid">
            <LinkCard
              href="/ciudades"
              eyebrow="Landing index"
              title="Gasolineras por ciudad"
              description="Páginas locales con mapa, tabla, cálculo de ahorro y enlaces a rutas y autopistas."
            />
            <LinkCard
              href="/rutas"
              eyebrow="Landing index"
              title="Gasolineras en ruta"
              description="Trayectos con parada recomendada, resumen de distancia y ahorro estimado."
            />
            <LinkCard
              href="/autopistas"
              eyebrow="Landing index"
              title="Gasolineras por autopista"
              description="Corredores específicos como A-3, A-6 o AP-7 con estaciones relacionadas."
            />
            <LinkCard
              href="/precios"
              eyebrow="Landing index"
              title="Precios hoy"
              description="Páginas orientadas a búsquedas de precio gasolina hoy y diésel por ciudad."
            />
            <LinkCard
              href="/blog"
              eyebrow="Evergreen"
              title="Blog SEO"
              description="Artículos preparados para reforzar topical authority y enlazar a páginas transaccionales."
            />
            <LinkCard
              href={blogPath("como-ahorrar-gasolina-en-carretera")}
              eyebrow="Ejemplo"
              title="Cómo ahorrar gasolina en carretera"
              description="Artículo seed con estructura, metadata, FAQ schema y CTA a la app."
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <div className="section-heading">
            <span className="eyebrow">Ciudades destacadas</span>
            <h2>Landings locales con intención transaccional</h2>
          </div>
          <div className="index-grid">
            {cityCards.map(({ city, summary }) => (
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
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="cards-grid">
          {featuredRoutes.map((route) => (
            <LinkCard
              key={route.slug}
              href={routePath(route.slug)}
              eyebrow={route.highwaysIncluded.map((item) => item.toUpperCase()).join(" · ")}
              title={`Gasolineras baratas en ${route.origin} - ${route.destination}`}
              description={route.summary}
              meta={`${route.distanceKm} km · ${route.estimatedDriveTime}`}
            />
          ))}
          {featuredHighways.map((highway) => (
            <LinkCard
              key={highway.slug}
              href={highwayPath(highway.slug)}
              eyebrow={highway.type}
              title={`Gasolineras más baratas en la ${highway.name}`}
              description={highway.description}
            />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer>
        <AppDownloadCTA />
      </SectionContainer>
    </>
  );
}
