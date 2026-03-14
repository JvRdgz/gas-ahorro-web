interface PriceSummaryCardProps {
  title: string;
  value: string;
  description: string;
}

export function PriceSummaryCard({
  title,
  value,
  description,
}: PriceSummaryCardProps) {
  return (
    <article className="summary-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{description}</p>
    </article>
  );
}
