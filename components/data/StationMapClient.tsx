"use client";

import { CircleMarker, MapContainer, Polyline, Popup, TileLayer } from "react-leaflet";

import { formatPricePerLiter } from "@/lib/utils";
import type { FuelType, Station } from "@/types/domain";

interface StationMapClientProps {
  center: [number, number];
  stations: Station[];
  fuel: FuelType;
  routeCoordinates?: [number, number][];
  zoom?: number;
}

function markerColor(price: number | null) {
  if (price === null) {
    return "#94a3b8";
  }

  if (price <= 1.495) {
    return "#159947";
  }

  if (price <= 1.535) {
    return "#ffb703";
  }

  return "#d62828";
}

export default function StationMapClient({
  center,
  stations,
  fuel,
  routeCoordinates,
  zoom = routeCoordinates ? 6 : 10,
}: StationMapClientProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="station-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {routeCoordinates ? (
        <Polyline
          positions={routeCoordinates}
          pathOptions={{ color: "#0f6644", weight: 5, opacity: 0.7 }}
        />
      ) : null}

      {stations.map((station) => {
        const price =
          fuel === "gasoline95" ? station.priceGasoline95 : station.priceDiesel;

        return (
          <CircleMarker
            key={station.id}
            center={[station.latitude, station.longitude]}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: markerColor(price),
              fillOpacity: 0.95,
            }}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              {station.city}
              <br />
              {price ? formatPricePerLiter(price) : "Sin dato"}
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
