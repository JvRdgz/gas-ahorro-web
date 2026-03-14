import { formatUpdatedAt } from "@/lib/utils";
import type { DataSourceInfo } from "@/types/domain";

interface DataSourceNoticeProps {
  source: DataSourceInfo;
}

export function DataSourceNotice({ source }: DataSourceNoticeProps) {
  return (
    <div className="mock-notice" role="note">
      <strong>{source.label}</strong>
      <span>
        {source.description} Actualización visible:{" "}
        <strong>{formatUpdatedAt(source.fetchedAt)}</strong>. Estaciones cargadas:{" "}
        <strong>{source.stationCount}</strong>.
      </span>
    </div>
  );
}
