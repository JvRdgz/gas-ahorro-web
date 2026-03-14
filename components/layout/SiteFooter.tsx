import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { href: "/ciudades", label: "Ciudades" },
  { href: "/rutas", label: "Rutas" },
  { href: "/autopistas", label: "Autopistas" },
  { href: "/precios", label: "Precios hoy" },
  { href: "/blog", label: "Blog" },
  { href: "/privacidad", label: "Privacidad" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/img/logo.png" alt="Gas Ahorro" width={72} height={72} />
          <div>
            <strong>{siteConfig.name}</strong>
            <p>
              Canal SEO y landing transaccional para descubrir gasolineras más
              baratas antes de abrir la app.
            </p>
          </div>
        </div>

        <div className="footer-links">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-meta">
          <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
          <p>Datos visibles etiquetados como mock hasta conectar API real.</p>
        </div>
      </div>
    </footer>
  );
}
