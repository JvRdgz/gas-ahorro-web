export type FuelType = "gasoline95" | "diesel";
export type DatasetSourceKind = "mock" | "ministry-live" | "ministry-cache";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface SummaryMetric {
  label: string;
  value: string;
  hint?: string;
}

export interface Station {
  id: string;
  name: string;
  brand: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  province: string;
  highway?: string;
  priceGasoline95: number | null;
  priceDiesel: number | null;
  updatedAt: string;
  isMock: boolean;
}

export interface City {
  slug: string;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
  intro: string;
  summary: string;
  stationIds: string[];
  highwaySlugs: string[];
  nearbyCitySlugs: string[];
  pricePageSlug: string;
  isMock: boolean;
}

export interface RouteEntity {
  slug: string;
  origin: string;
  originSlug: string;
  destination: string;
  destinationSlug: string;
  distanceKm: number;
  estimatedDriveTime: string;
  highwaysIncluded: string[];
  stationIds: string[];
  summary: string;
  routeCoordinates: [number, number][];
  isMock: boolean;
}

export interface Highway {
  slug: string;
  name: string;
  type: string;
  citiesConnected: string[];
  citySlugs: string[];
  stationIds: string[];
  description: string;
  isMock: boolean;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  sections: BlogSection[];
  faqs: FAQItem[];
  relatedCitySlugs: string[];
  relatedRouteSlugs: string[];
  relatedHighwaySlugs: string[];
  isMock: boolean;
}

export interface PriceSummary {
  fuel: FuelType;
  cheapest: number;
  highest: number;
  average: number;
  spread: number;
  stationCount: number;
}

export interface DataSourceInfo {
  kind: DatasetSourceKind;
  label: string;
  description: string;
  fetchedAt: string;
  stationCount: number;
  isMock: boolean;
}

export interface RouteDataset {
  stations: Station[];
  coordinates: [number, number][];
}
