import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "leaflet/dist/leaflet.css";

import "./globals.css";
import "./marketing-home.css";

import { AppChrome } from "@/components/layout/AppChrome";
import { SchemaScript } from "@/components/seo/SchemaScript";
import {
  buildMobileApplicationSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/schema-builders";
import { siteConfig } from "@/lib/site-config";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: "Gas Ahorro | Gasolineras baratas por ciudad, ruta y autopista",
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: siteConfig.domain,
  },
  icons: {
    icon: "/img/favicon/favicon.ico",
    apple: "/img/favicon/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f6644",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeScript />
        <SchemaScript
          data={[
            buildWebSiteSchema(),
            buildOrganizationSchema(),
            buildMobileApplicationSchema(),
          ]}
        />
        <ThemeProvider>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
