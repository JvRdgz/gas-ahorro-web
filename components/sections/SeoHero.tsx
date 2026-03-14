import { formatUpdatedAt } from "@/lib/utils";
import type { SummaryMetric } from "@/types/domain";

interface SeoHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  metrics?: SummaryMetric[];
  updatedAt?: string;
}

export function SeoHero({
  eyebrow,
  title,
  description,
  metrics = [],
  updatedAt,
}: SeoHeroProps) {
  return (
    <div className="hero hero-page">
      <div className="hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {updatedAt ? (
          <div className="last-updated">
            Última actualización visible: <strong>{formatUpdatedAt(updatedAt)}</strong>
          </div>
        ) : null}
      </div>

      {metrics.length ? (
        <div className="hero-metrics">
          {metrics.map((metric) => (
            <article className="metric-card" key={`${metric.label}-${metric.value}`}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              {metric.hint ? <small>{metric.hint}</small> : null}
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
