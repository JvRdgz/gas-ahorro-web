import { routePath } from "@/lib/routes";
import type { RouteEntity } from "@/types/domain";

import { LinkCard } from "@/components/ui/LinkCard";

interface RelatedRoutesProps {
  routes: RouteEntity[];
}

export function RelatedRoutes({ routes }: RelatedRoutesProps) {
  if (!routes.length) {
    return null;
  }

  return (
    <div className="content-stack">
      <div className="section-heading">
        <span className="eyebrow">Rutas relacionadas</span>
        <h2>Explora otros trayectos con intención de ahorro similar</h2>
      </div>
      <div className="cards-grid">
        {routes.map((route) => (
          <LinkCard
            key={route.slug}
            href={routePath(route.slug)}
            eyebrow={route.highwaysIncluded.map((slug) => slug.toUpperCase()).join(" · ")}
            title={`${route.origin} - ${route.destination}`}
            description={route.summary}
            meta={`${route.distanceKm} km · ${route.estimatedDriveTime}`}
          />
        ))}
      </div>
    </div>
  );
}
