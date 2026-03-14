import { getSitemapUrls, renderSitemapIndex } from "@/lib/sitemap";

export const revalidate = 3600;

export async function GET() {
  return new Response(renderSitemapIndex(getSitemapUrls()), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
