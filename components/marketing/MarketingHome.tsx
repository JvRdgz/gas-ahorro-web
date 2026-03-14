"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { siteConfig } from "@/lib/site-config";

const features = [
  {
    title: "Ruta inteligente",
    description:
      "Añade tu destino y visualiza gasolineras a lo largo del camino. El radio es configurable de 500 m a 10 km y también puedes comparar rutas alternativas antes de decidir.",
  },
  {
    title: "Mapa por colores",
    description:
      "Identifica al instante el precio: verde más barato, rojo más caro. Puedes mostrar el precio junto al icono del surtidor si lo prefieres.",
  },
  {
    title: "Combustible exacto",
    description:
      "Elige gasolina 95/98, diésel normal o premium, GLP o GNC. El mapa se adapta a tu elección.",
  },
  {
    title: "Venta restringida",
    description:
      "Activa estaciones con acceso restringido para flotas privadas o camiones cuando lo necesites.",
  },
  {
    title: "Solo las más baratas",
    description:
      "Filtra y quédate solo con las estaciones más económicas en mapa o en ruta, con una selección más precisa de resultados.",
  },
  {
    title: "Evita peajes",
    description:
      "Activa el filtro para evitar autopistas de peaje y encuentra una ruta más rentable también en el coste del trayecto.",
  },
  {
    title: "Consulta horarios",
    description:
      "Si una gasolinera está cerrada, la app muestra su horario para que sepas cuándo abrirá o si te conviene elegir otra opción.",
  },
  {
    title: "Un click y a repostar",
    description:
      "Selecciona una gasolinera, revisa todos sus precios y pulsa “Ir” para abrir tu navegador o app de navegación favorita y añadir la parada.",
  },
];

const screenshots = [
  {
    light: "/img/Light/2.png",
    dark: "/img/Dark/2d.png",
    alt: "Selector de combustible",
    caption: "Filtros de combustible, precios en mapa y opciones avanzadas.",
  },
  {
    light: "/img/Light/4.png",
    dark: "/img/Dark/4d.png",
    alt: "Detalle de precios por estación",
    caption: "Vista rápida con los precios de la gasolinera seleccionada.",
  },
  {
    light: "/img/Light/6.png",
    dark: "/img/Dark/6d.png",
    alt: "Mapa con precios ocultos",
    caption: "Gasolineras por color para detectar la opción más barata.",
  },
  {
    light: "/img/Light/7.png",
    dark: "/img/Dark/7d.png",
    alt: "Vista general de España",
    caption: "Cobertura en toda España, península e islas incluidas.",
  },
];

const faqs = [
  {
    question: "¿Los precios son en tiempo real?",
    answer:
      "Se actualizan con la frecuencia disponible de los datos oficiales para que siempre tengas una referencia actual al decidir.",
  },
  {
    question: "¿Puedo ocultar el precio en el mapa?",
    answer:
      "Sí. En el filtro puedes desactivar la opción de mostrar precios junto al icono de la gasolinera.",
  },
  {
    question: "¿Qué radio de búsqueda puedo usar?",
    answer:
      "Puedes elegir entre 500 metros y 10 km, o activar el ajuste automático según la longitud de la ruta.",
  },
  {
    question: "¿Puedo evitar autopistas de peaje?",
    answer:
      "Sí. Puedes activar el filtro para evitar peajes y calcular la ruta mostrando gasolineras que encajen mejor con ese trayecto.",
  },
  {
    question: "¿Qué pasa si una gasolinera está cerrada?",
    answer:
      "La app indica que está cerrada y muestra su horario disponible para que decidas si esperar o elegir otra parada.",
  },
  {
    question: "¿La app guarda mis preferencias?",
    answer: "Sí, tu filtro se conserva cuando cierras la aplicación.",
  },
];

const legalCards = [
  {
    title: "Términos y condiciones",
    content:
      "Gas Ahorro ofrece información orientativa sobre precios de combustibles. El precio final depende de cada estación de servicio. Al usar la app, aceptas el uso responsable de la información mostrada.",
  },
  {
    title: "Privacidad",
    content:
      "La app usa permisos de ubicación para navegación y Google AdMob para mostrar anuncios. Puedes consultar cómo tratamos los datos, cómo gestionar el consentimiento y cómo desactivar anuncios con el pago único en nuestra política de privacidad completa.",
    href: "/privacidad",
    hrefLabel: "Política de Privacidad completa",
  },
  {
    title: "Soporte",
    content:
      "¿Dudas o sugerencias? Escríbenos a soporte@gasahorro.es. Respondemos rápido.",
    href: `mailto:${siteConfig.supportEmail}`,
    hrefLabel: siteConfig.supportEmail,
  },
  {
    title: "Cookies",
    content:
      "Esta web solo utiliza cookies técnicas necesarias para su funcionamiento. No usamos cookies de analítica ni de publicidad en la web. La publicidad de la app móvil se gestiona dentro de la app.",
  },
];

function getShot(theme: "light" | "dark", light: string, dark: string) {
  return theme === "dark" ? dark : light;
}

export function MarketingHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  const heroShots = useMemo(
    () => ({
      primary: getShot(theme, "/img/Light/1.png", "/img/Dark/1d.png"),
      secondary: getShot(theme, "/img/Light/3.png", "/img/Dark/3d.png"),
      filters: getShot(theme, "/img/Light/5.png", "/img/Dark/5d.png"),
    }),
    [theme],
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [theme]);

  return (
    <div className="marketing-home">
      <div className="page" id="top">
        <header className="site-header">
          <nav className="nav" aria-label="Navegación principal">
            <Link className="brand" href="/" aria-label="Ir al inicio">
              <img src="/img/logo_ios.png" alt="Logo Gas Ahorro" />
              <span>Gas Ahorro</span>
            </Link>

            <div className={`nav-links${menuOpen ? " open" : ""}`}>
              <a href="#caracteristicas" onClick={() => setMenuOpen(false)}>
                Características
              </a>
              <a href="#como-funciona" onClick={() => setMenuOpen(false)}>
                Cómo funciona
              </a>
              <a href="#capturas" onClick={() => setMenuOpen(false)}>
                Capturas
              </a>
              <a href="#precios" onClick={() => setMenuOpen(false)}>
                Precios
              </a>
              <a href="#faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </a>
              <Link href="/privacidad" onClick={() => setMenuOpen(false)}>
                Privacidad app
              </Link>
              <ThemeToggle />
              <a
                className="cta"
                href="#descarga"
                onClick={() => setMenuOpen(false)}
              >
                Descargar
              </a>
            </div>

            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              ☰
            </button>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="hero-content">
              <div className="badge">Precios en tiempo real · España</div>
              <h1>
                Convierte cada kilómetro en ahorro real.
                <span>Tu gasolinera ideal en ruta, sin perder tiempo.</span>
              </h1>
              <p>
                Gas Ahorro compara precios mientras conduces y te muestra las
                gasolineras más baratas en ruta. Ahora también sugiere rutas
                alternativas, permite evitar autopistas de peaje y muestra el
                horario de estaciones cerradas para que decidas mejor cada parada.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#descarga">
                  Quiero ahorrar ya
                </a>
                <a className="btn ghost" href="#como-funciona">
                  Ver cómo funciona
                </a>
              </div>
              <div className="hero-note">
                Gratis con publicidad · Quita los anuncios por 1,99 €
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <img
                  src={heroShots.primary}
                  alt="Mapa de precios en Gas Ahorro"
                  loading="eager"
                />
              </div>
              <div className="hero-card second">
                <img
                  src={heroShots.secondary}
                  alt="Ruta con gasolineras en Gas Ahorro"
                  loading="eager"
                />
              </div>
            </div>
          </section>

          <section className="statement">
            <div>
              <h2>¿Cuánto pierdes por no comparar?</h2>
              <p>
                En cada trayecto hay diferencias claras entre estaciones. Gas
                Ahorro te muestra las mejores opciones antes de que pagues de más.
              </p>
            </div>
            <div className="pill-row">
              <div className="pill">Ruta con gasolineras a la vista</div>
              <div className="pill">Rutas alternativas sin peajes</div>
              <div className="pill">Horario de estaciones cerradas</div>
            </div>
          </section>

          <section id="caracteristicas" className="features">
            <h2>Todo lo que necesitas para pagar menos</h2>
            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className="feature-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="como-funciona" className="how">
            <div className="how-content">
              <h2>Cómo funciona en 3 pasos</h2>
              <ol>
                <li>
                  <strong>Configura el filtro.</strong> Elige combustible, radio,
                  si quieres ver precios, si incluyes venta restringida y si
                  quieres evitar autopistas de peaje.
                </li>
                <li>
                  <strong>Marca tu destino.</strong> Verás todas las gasolineras
                  de tu ruta, sus alternativas disponibles y su precio en tiempo
                  real.
                </li>
                <li>
                  <strong>Decide y navega.</strong> Toca la estación que más te
                  conviene, revisa si está abierta y empieza a ahorrar.
                </li>
              </ol>
              <div className="how-note">
                Tu configuración se guarda automáticamente al salir de la app.
              </div>
            </div>

            <div className="how-visual">
              <img
                src={heroShots.filters}
                alt="Filtros de combustible en Gas Ahorro"
                loading="lazy"
              />
            </div>
          </section>

          <section id="capturas" className="screens">
            <div className="screens-header">
              <h2>Una experiencia clara, rápida y fluida</h2>
              <p>
                Pantallas pensadas para decidir en segundos. Todo lo importante,
                siempre visible.
              </p>
            </div>

            <div className="screens-grid">
              {screenshots.map((shot) => (
                <figure key={shot.alt} className="shot">
                  <img
                    src={getShot(theme, shot.light, shot.dark)}
                    alt={shot.alt}
                    loading="lazy"
                  />
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="precios" className="pricing">
            <div className="pricing-card">
              <h2>Gratis para todos. Sin anuncios por 1,99 €.</h2>
              <p>
                Gas Ahorro es 100% gratuita con banners. Si prefieres una
                experiencia limpia, puedes eliminar la publicidad con un pago
                único de 1,99 €.
              </p>
              <div className="pricing-actions">
                <a className="btn primary" href="#descarga">
                  Descargar gratis
                </a>
                <a className="btn ghost" href="#faq">
                  ¿Dudas sobre el pago único?
                </a>
              </div>
            </div>
          </section>

          <section id="descarga" className="download">
            <div className="download-content">
              <h2>Descarga Gas Ahorro y empieza a pagar menos hoy</h2>
              <p>Disponible para iOS y Android en App Store y Google Play.</p>
              <div className="store-buttons">
                <a
                  className="store-btn"
                  href={siteConfig.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="store-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16.736 12.887c.02 2.147 1.884 2.862 1.905 2.871-.016.05-.298 1.022-.984 2.025-.592.867-1.207 1.731-2.175 1.749-.95.018-1.255-.563-2.342-.563-1.088 0-1.428.545-2.325.58-.935.036-1.647-.936-2.244-1.8-1.22-1.765-2.153-4.99-.901-7.165.622-1.08 1.735-1.764 2.943-1.782.916-.018 1.78.617 2.342.617.561 0 1.614-.763 2.72-.651.463.02 1.763.187 2.597 1.408-.067.041-1.548.903-1.536 2.711ZM14.69 7.432c.495-.6.828-1.435.736-2.268-.714.029-1.578.476-2.09 1.076-.46.532-.864 1.383-.755 2.198.797.062 1.612-.407 2.109-1.006Z" />
                  </svg>
                  <span className="store-copy">
                    <span>Descargar en</span>
                    <strong>App Store</strong>
                  </span>
                </a>

                <a
                  className="store-btn"
                  href={siteConfig.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="store-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.509 2.896c-.344.363-.509.898-.509 1.597v15.013c0 .699.165 1.234.509 1.597l.081.073L12.02 12.05v-.1L3.59 2.823l-.081.073Z" />
                    <path d="m14.83 14.86-2.81-2.81v-.1l2.81-2.81.063.036 3.33 1.892c.95.54.95 1.416 0 1.956l-3.33 1.892-.063-.056Z" />
                    <path d="M14.892 14.824 12.02 11.95 3.509 20.46c.544.577 1.441.648 2.45.076l8.933-5.712Z" />
                    <path d="M14.892 9.176 5.959 3.464c-1.009-.572-1.906-.501-2.45.076l8.51 8.51 2.872-2.874Z" />
                  </svg>
                  <span className="store-copy">
                    <span>Descargar en</span>
                    <strong>Google Play</strong>
                  </span>
                </a>
              </div>
            </div>

            <div className="download-visual">
              <img src="/img/splash.png" alt="Icono de Gas Ahorro" loading="lazy" />
            </div>
          </section>

          <section id="faq" className="faq">
            <h2>Preguntas frecuentes</h2>
            <div className="faq-grid">
              {faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="legal" className="legal">
            {legalCards.map((card) => (
              <div key={card.title} className="legal-card">
                <h2>{card.title}</h2>
                <p>
                  {card.content}
                  {card.href && card.hrefLabel ? (
                    <>
                      {" "}
                      <a href={card.href}>{card.hrefLabel}</a>.
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-left">
            <img src="/img/logo.png" alt="Gas Ahorro" />
            <div>
              <strong>Gas Ahorro</strong>
              <span>Ahorra más en cada ruta · España</span>
            </div>
          </div>

          <div className="footer-right">
            <a href="#caracteristicas">Características</a>
            <a href="#precios">Precios</a>
            <a href="#legal">Legal</a>
            <Link href="/privacidad">Privacidad app</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
