import { getRouteSitemapEntries, renderUrlSet } from "@/lib/sitemap";

export const revalidate = 3600;

export async function GET() {
  return new Response(renderUrlSet(await getRouteSitemapEntries()), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
