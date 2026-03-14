import { cityPath } from "@/lib/routes";
import type { City } from "@/types/domain";

import { LinkCard } from "@/components/ui/LinkCard";

interface RelatedCitiesProps {
  cities: City[];
}

export function RelatedCities({ cities }: RelatedCitiesProps) {
  if (!cities.length) {
    return null;
  }

  return (
    <div className="content-stack">
      <div className="section-heading">
        <span className="eyebrow">Ciudades relacionadas</span>
        <h2>Más páginas locales para seguir comparando</h2>
      </div>
      <div className="cards-grid">
        {cities.map((city) => (
          <LinkCard
            key={city.slug}
            href={cityPath(city.slug)}
            eyebrow={city.province}
            title={`Gasolineras baratas en ${city.name}`}
            description={city.summary}
          />
        ))}
      </div>
    </div>
  );
}
