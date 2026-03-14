import { SectionContainer } from "@/components/ui/SectionContainer";

export default function Loading() {
  return (
    <SectionContainer>
      <div className="empty-state">
        <span className="eyebrow">Cargando</span>
        <h1>Preparando la vista</h1>
        <p>Generando contenido SEO, datos y enlaces relacionados.</p>
      </div>
    </SectionContainer>
  );
}
