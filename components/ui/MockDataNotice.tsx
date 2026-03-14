import { siteConfig } from "@/lib/site-config";

export function MockDataNotice() {
  return (
    <div className="mock-notice" role="note">
      <strong>Datos mock etiquetados.</strong>
      <span>{siteConfig.mockDisclaimer}</span>
    </div>
  );
}
