import { MarketingHome } from "@/components/marketing/MarketingHome";

export const revalidate = 3600;

export default function HomePage() {
  return <MarketingHome />;
}
