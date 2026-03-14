import { pricePageSlugs } from "@/data/price-pages";
import {
  getAllBlogPosts,
  getAllCities,
  getAllHighways,
  getAllRoutes,
  getCityBySlug,
  getCityStations,
  getHighwayStations,
  getLatestGlobalUpdate,
  getRouteStations,
} from "@/lib/content";
import { blogPath, cityPath, highwayPath, pricePath, routePath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import type { City } from "@/types/domain";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

const staticLastModified = "2026-03-14T16:00:00+01:00";

function absolute(path: string) {
  return `${siteConfig.domain}${path}`;
}

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderUrlSet(entries: SitemapEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>`;
}

export function renderSitemapIndex(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <sitemap>
    <loc>${xmlEscape(url)}</loc>
    <lastmod>${staticLastModified}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;
}

export function getSitemapUrls() {
  return [
    absolute("/sitemap-static.xml"),
    absolute("/sitemap-cities.xml"),
    absolute("/sitemap-routes.xml"),
    absolute("/sitemap-highways.xml"),
    absolute("/sitemap-prices.xml"),
    absolute("/sitemap-blog.xml"),
  ];
}

export function getStaticSitemapEntries(): SitemapEntry[] {
  return [
    "/",
    "/ciudades",
    "/rutas",
    "/autopistas",
    "/precios",
    "/blog",
    "/privacidad",
  ].map((path) => ({
    loc: absolute(path),
    lastmod: staticLastModified,
  }));
}

async function cityLastmod(city: City) {
  return getLatestGlobalUpdate(await getCityStations(city)) ?? staticLastModified;
}

export async function getCitySitemapEntries(): Promise<SitemapEntry[]> {
  return Promise.all(
    getAllCities().map(async (city) => ({
      loc: absolute(cityPath(city.slug)),
      lastmod: await cityLastmod(city),
    })),
  );
}

export async function getRouteSitemapEntries(): Promise<SitemapEntry[]> {
  return Promise.all(
    getAllRoutes().map(async (route) => ({
      loc: absolute(routePath(route.slug)),
      lastmod: getLatestGlobalUpdate(await getRouteStations(route)) ?? staticLastModified,
    })),
  );
}

export async function getHighwaySitemapEntries(): Promise<SitemapEntry[]> {
  return Promise.all(
    getAllHighways().map(async (highway) => ({
      loc: absolute(highwayPath(highway.slug)),
      lastmod:
        getLatestGlobalUpdate(await getHighwayStations(highway)) ?? staticLastModified,
    })),
  );
}

export async function getPriceSitemapEntries(): Promise<SitemapEntry[]> {
  const cities = pricePageSlugs
    .map((slug) => getCityBySlug(slug))
    .filter((item): item is City => Boolean(item));

  return Promise.all(
    cities.map(async (city) => ({
      loc: absolute(pricePath(city.slug)),
      lastmod: await cityLastmod(city),
    })),
  );
}

export function getBlogSitemapEntries(): SitemapEntry[] {
  return getAllBlogPosts().map((post) => ({
    loc: absolute(blogPath(post.slug)),
    lastmod: post.updatedAt,
  }));
}
