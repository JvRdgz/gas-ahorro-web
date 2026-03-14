import Link from "next/link";

interface LinkCardProps {
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
  meta?: string;
}

export function LinkCard({
  href,
  eyebrow,
  title,
  description,
  meta,
}: LinkCardProps) {
  return (
    <Link className="link-card" href={href}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h3>{title}</h3>
      <p>{description}</p>
      {meta ? <small>{meta}</small> : null}
    </Link>
  );
}
