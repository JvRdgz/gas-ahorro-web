import { formatPricePerLiter, formatUpdatedAt } from "@/lib/utils";
import type { FuelType, Station } from "@/types/domain";

interface StationTableProps {
  stations: Station[];
  fuel: FuelType;
}

export function StationTable({ stations, fuel }: StationTableProps) {
  return (
    <div className="table-card">
      <div className="table-card-header">
        <div>
          <span className="eyebrow">Tabla de estaciones</span>
          <h2>Ranking ordenado por precio</h2>
        </div>
        <p>
          Combustible activo:{" "}
          <strong>{fuel === "gasoline95" ? "Gasolina 95" : "Diésel"}</strong>
        </p>
      </div>

      <div className="table-scroll">
        <table className="station-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Estación</th>
              <th>Marca</th>
              <th>Ubicación</th>
              <th>Precio</th>
              <th>Actualizado</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => {
              const price =
                fuel === "gasoline95"
                  ? station.priceGasoline95
                  : station.priceDiesel;

              return (
                <tr key={station.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{station.name}</strong>
                    {station.highway ? <span>{station.highway.toUpperCase()}</span> : null}
                  </td>
                  <td>{station.brand}</td>
                  <td>
                    {station.city}
                    <span>{station.address}</span>
                  </td>
                  <td>{price ? formatPricePerLiter(price) : "Sin dato"}</td>
                  <td>{formatUpdatedAt(station.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
