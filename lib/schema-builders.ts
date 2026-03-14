import { absoluteUrl } from "@/lib/utils";
import type { BreadcrumbItem, FAQItem, Station } from "@/types/domain";

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gas Ahorro",
    url: absoluteUrl("/"),
    inLanguage: "es",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/ciudades")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gas Ahorro",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/img/logo_ios.png"),
    email: "soporte@gasahorro.es",
  };
}

export function buildMobileApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Gas Ahorro",
    operatingSystem: "iOS, Android",
    applicationCategory: "TravelApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    downloadUrl: [
      "https://apps.apple.com/es/app/gas-ahorro/id6758555135",
      "https://play.google.com/store/apps/details?id=com.strelok.gasAhorro&pcampaignid=web_share",
    ],
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildFaqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildCollectionPageSchema(
  name: string,
  description: string,
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
  };
}

export function buildItemListSchema(
  name: string,
  items: Array<{ name: string; url?: string; description?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}

export function buildStationListItems(stations: Station[]) {
  return stations.map((station) => ({
    name: station.name,
    description: `${station.address}. Gasolina 95 ${
      station.priceGasoline95 ? `${station.priceGasoline95.toFixed(3)} €/l` : "sin dato"
    }.`,
  }));
}

export function buildArticleSchema(
  title: string,
  description: string,
  path: string,
  publishedAt: string,
  updatedAt: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Organization",
      name: "Gas Ahorro",
    },
    publisher: {
      "@type": "Organization",
      name: "Gas Ahorro",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/img/logo_ios.png"),
      },
    },
  };
}
