interface RouteSummaryCardProps {
  title: string;
  summary: string;
  distanceKm: number;
  estimatedDriveTime: string;
  highways: string[];
}

export function RouteSummaryCard({
  title,
  summary,
  distanceKm,
  estimatedDriveTime,
  highways,
}: RouteSummaryCardProps) {
  return (
    <article className="route-summary-card">
      <span className="eyebrow">Resumen de ruta</span>
      <h2>{title}</h2>
      <p>{summary}</p>
      <div className="route-summary-metrics">
        <div>
          <span>Distancia</span>
          <strong>{distanceKm} km</strong>
        </div>
        <div>
          <span>Tiempo estimado</span>
          <strong>{estimatedDriveTime}</strong>
        </div>
        <div>
          <span>Vías incluidas</span>
          <strong>{highways.map((item) => item.toUpperCase()).join(" · ")}</strong>
        </div>
      </div>
    </article>
  );
}
