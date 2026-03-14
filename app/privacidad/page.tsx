import type { Metadata } from "next";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { buildPageMetadata } from "@/lib/metadata-builders";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de privacidad | Gas Ahorro",
  description:
    "Información sobre tratamiento de datos, permisos de ubicación, soporte y funcionamiento de la app Gas Ahorro.",
  path: "/privacidad",
});

export default function PrivacyPage() {
  return (
    <>
      <SectionContainer>
        <div className="article-layout">
          <header className="article-header">
            <span className="eyebrow">Legal</span>
            <h1>Política de privacidad</h1>
            <p className="lead">
              Esta página sustituye a la antigua versión estática y conserva una ruta
              estable para información legal y de soporte.
            </p>
          </header>
        </div>
      </SectionContainer>

      <SectionContainer>
        <article className="article-body">
          <section>
            <h2>Responsable y contacto</h2>
            <p>
              Gas Ahorro presta soporte a través de{" "}
              <a href="mailto:soporte@gasahorro.es">soporte@gasahorro.es</a>.
            </p>
          </section>
          <section>
            <h2>Datos tratados</h2>
            <p>
              La app puede usar la ubicación para ayudarte a encontrar estaciones
              cercanas o en ruta. La web pública no necesita crear cuenta para
              consultar páginas SEO.
            </p>
          </section>
          <section>
            <h2>Publicidad y medición</h2>
            <p>
              La app puede integrar publicidad móvil. Esta implementación web está
              orientada a SEO y no añade capas extra de tracking en la interfaz
              pública más allá de lo que se conecte en producción.
            </p>
          </section>
          <section>
            <h2>Actualizaciones</h2>
            <p>
              Cuando se conecte un backend real, conviene revisar esta política para
              reflejar con precisión proveedores, analítica y flujos de datos.
            </p>
          </section>
        </article>
      </SectionContainer>
    </>
  );
}
