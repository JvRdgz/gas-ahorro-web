export const siteConfig = {
  name: "Gas Ahorro",
  legalName: "Gas Ahorro",
  description:
    "Encuentra gasolineras baratas por ciudad, ruta y autopista, compara precios y calcula tu ahorro antes de repostar.",
  domain: "https://www.gasahorro.es",
  appStoreUrl: "https://apps.apple.com/es/app/gas-ahorro/id6758555135",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.strelok.gasAhorro&pcampaignid=web_share",
  supportEmail: "soporte@gasahorro.es",
  locale: "es_ES",
  country: "ES",
  mockDisclaimer:
    "Vista SEO programática montada con datos mock etiquetados. Sustituye los módulos de data por API o base de datos para producción.",
} as const;

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.domain;
}
