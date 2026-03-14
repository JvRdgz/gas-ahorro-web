import Link from "next/link";

import { SectionContainer } from "@/components/ui/SectionContainer";

export default function NotFound() {
  return (
    <SectionContainer>
      <div className="empty-state">
        <span className="eyebrow">404</span>
        <h1>Página no encontrada</h1>
        <p>
          La URL no existe o todavía no forma parte del seed inicial de ciudades,
          rutas y autopistas.
        </p>
        <div className="button-row">
          <Link className="button button-primary" href="/">
            Volver al inicio
          </Link>
          <Link className="button button-secondary" href="/ciudades">
            Ver ciudades
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
