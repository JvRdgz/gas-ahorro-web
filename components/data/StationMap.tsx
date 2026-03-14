import dynamic from "next/dynamic";

import type { FuelType, Station } from "@/types/domain";

const StationMapClient = dynamic(() => import("./StationMapClient"), {
  ssr: false,
  loading: () => (
    <div className="map-placeholder">
      <strong>Mapa cargando</strong>
      <span>El contenido SEO principal ya es visible. El mapa se hidrata después.</span>
    </div>
  ),
});

interface StationMapProps {
  center: [number, number];
  stations: Station[];
  fuel: FuelType;
  routeCoordinates?: [number, number][];
  zoom?: number;
}

export function StationMap(props: StationMapProps) {
  return (
    <div className="map-card">
      <div className="table-card-header">
        <div>
          <span className="eyebrow">Mapa</span>
          <h2>Estaciones ubicadas sobre el mapa</h2>
        </div>
        <p>Renderizado progresivo para no penalizar la carga inicial.</p>
      </div>

      <div className="map-shell">
        <StationMapClient {...props} />
      </div>
    </div>
  );
}
