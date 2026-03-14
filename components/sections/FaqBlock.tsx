import type { FAQItem } from "@/types/domain";

interface FaqBlockProps {
  title?: string;
  description?: string;
  items: FAQItem[];
}

export function FaqBlock({
  title = "Preguntas frecuentes",
  description,
  items,
}: FaqBlockProps) {
  return (
    <div className="content-stack">
      <div className="section-heading">
        <span className="eyebrow">FAQs</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>

      <div className="faq-grid">
        {items.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
