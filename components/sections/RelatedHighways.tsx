import { highwayPath } from "@/lib/routes";
import type { Highway } from "@/types/domain";

import { LinkCard } from "@/components/ui/LinkCard";

interface RelatedHighwaysProps {
  highways: Highway[];
}

export function RelatedHighways({ highways }: RelatedHighwaysProps) {
  if (!highways.length) {
    return null;
  }

  return (
    <div className="content-stack">
      <div className="section-heading">
        <span className="eyebrow">Autopistas y carreteras</span>
        <h2>Corredores donde la diferencia de precio suele ser relevante</h2>
      </div>
      <div className="cards-grid">
        {highways.map((highway) => (
          <LinkCard
            key={highway.slug}
            href={highwayPath(highway.slug)}
            eyebrow={highway.type}
            title={`Gasolineras más baratas en la ${highway.name}`}
            description={highway.description}
            meta={highway.citiesConnected.join(" · ")}
          />
        ))}
      </div>
    </div>
  );
}
