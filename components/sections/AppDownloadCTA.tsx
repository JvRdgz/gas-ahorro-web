import { siteConfig } from "@/lib/site-config";

interface AppDownloadCTAProps {
  title?: string;
  description?: string;
}

export function AppDownloadCTA({
  title = "Encuentra todas las gasolineras más baratas cerca de ti con la app Gas Ahorro",
  description = "Usa la web para descubrir la mejor opción y la app para seguir la ruta, filtrar combustibles y navegar hasta la parada que más te conviene.",
}: AppDownloadCTAProps) {
  return (
    <div className="cta-card">
      <div>
        <span className="eyebrow">Descarga la app</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="store-buttons">
        <a
          className="store-button"
          href={siteConfig.appStoreUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>Descargar en</span>
          <strong>App Store</strong>
        </a>
        <a
          className="store-button"
          href={siteConfig.playStoreUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>Descargar en</span>
          <strong>Google Play</strong>
        </a>
      </div>
    </div>
  );
}
