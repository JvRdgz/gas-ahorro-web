import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

const navigation = [
  { href: "/ciudades", label: "Ciudades" },
  { href: "/rutas", label: "Rutas" },
  { href: "/autopistas", label: "Autopistas" },
  { href: "/precios", label: "Precios hoy" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-shell">
        <Link className="brand" href="/">
          <Image
            src="/img/logo_ios.png"
            alt="Gas Ahorro"
            width={56}
            height={56}
            priority
          />
          <div>
            <strong>{siteConfig.name}</strong>
            <span>Gasolineras baratas y ahorro en ruta</span>
          </div>
        </Link>

        <nav className="main-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          className="button button-primary header-download"
          href={siteConfig.playStoreUrl}
          target="_blank"
          rel="noreferrer"
        >
          Descargar app
        </a>
      </div>
    </header>
  );
}
