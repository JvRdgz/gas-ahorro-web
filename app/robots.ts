import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ciudades", "/rutas", "/autopistas", "/precios", "/blog"],
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
