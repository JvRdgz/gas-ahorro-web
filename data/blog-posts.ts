import type { BlogPost } from "@/types/domain";

export const blogPosts: BlogPost[] = [
  {
    slug: "como-ahorrar-gasolina-en-carretera",
    title: "Cómo ahorrar gasolina en carretera sin alargar tu viaje",
    excerpt:
      "Una guía práctica para elegir mejor tus paradas, evitar estaciones caras y planificar repostajes con más criterio.",
    publishedAt: "2026-03-10T09:00:00+01:00",
    updatedAt: "2026-03-14T09:15:00+01:00",
    readingTimeMinutes: 7,
    sections: [
      {
        heading: "Prioriza el punto de repostaje, no la primera estación",
        paragraphs: [
          "En carretera, la estación más visible rara vez es la más barata. Comparar el siguiente nodo logístico o una salida con competencia suele generar una diferencia suficiente como para compensar el pequeño desvío.",
          "Ese patrón es especialmente claro en corredores como la A-3, la A-4 o la AP-7, donde las áreas de paso premium conviven con estaciones low-cost muy cerca de la ruta principal.",
        ],
      },
      {
        heading: "Lleva una referencia de precio antes de salir",
        paragraphs: [
          "Repostar sin referencia convierte cada parada en una decisión impulsiva. Si conoces el rango de precio de tu ciudad y de la carretera que vas a usar, detectas enseguida cuándo una estación está fuera de mercado.",
          "Esa referencia también te ayuda a decidir si te conviene salir con más depósito o reservar la parada para un tramo posterior del viaje.",
        ],
      },
      {
        heading: "Calcula el ahorro real por trayecto",
        paragraphs: [
          "Una diferencia de pocos céntimos por litro parece pequeña, pero en trayectos largos y con depósitos medianos se convierte en varios euros por repostaje.",
          "Por eso una web SEO útil no debe limitarse a listar estaciones: tiene que traducir la diferencia de precio en ahorro estimado y facilitar la transición a la app.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cuánto se puede ahorrar repostando fuera del área principal de servicio?",
        answer:
          "Depende del trayecto y del combustible, pero incluso diferencias moderadas por litro se convierten en varios euros si llenas el depósito o haces un viaje largo.",
      },
      {
        question: "¿Merece la pena desviarse para repostar más barato?",
        answer:
          "Sí, cuando el desvío es pequeño y la diferencia de precio compensa. Las rutas SEO deben mostrar esa lógica de forma clara, no solo una lista de estaciones.",
      },
    ],
    relatedCitySlugs: ["madrid", "valencia"],
    relatedRouteSlugs: ["madrid-valencia", "madrid-sevilla"],
    relatedHighwaySlugs: ["a3", "a4"],
    isMock: true,
  },
  {
    slug: "cuanto-puedes-ahorrar-repostando-barato",
    title: "Cuánto puedes ahorrar repostando barato durante un mes",
    excerpt:
      "Un enfoque simple para traducir céntimos por litro en ahorro acumulado según consumo, kilómetros y frecuencia de repostaje.",
    publishedAt: "2026-03-08T09:00:00+01:00",
    updatedAt: "2026-03-14T09:05:00+01:00",
    readingTimeMinutes: 6,
    sections: [
      {
        heading: "El ahorro pequeño repetido es el que cambia el coste anual",
        paragraphs: [
          "La mayoría de conductores subestima el impacto de una diferencia modesta por litro. El problema no es un repostaje aislado, sino repetir durante semanas estaciones sistemáticamente más caras.",
          "Por eso las páginas de precios hoy y de ciudades deben mostrar medias, mínimos y máximos visibles, para que el usuario entienda el rango real del mercado local.",
        ],
      },
      {
        heading: "Qué variables importan más",
        paragraphs: [
          "La frecuencia de uso del coche, la capacidad del depósito y la dispersión de precio en tu zona son más relevantes que encontrar una oferta puntual.",
          "Una calculadora de ahorro bien diseñada permite adaptar esas variables a cada ciudad, ruta o autopista sin generar contenido vacío.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Es útil comparar el precio medio con el más barato?",
        answer:
          "Sí. Esa diferencia ayuda a estimar el ahorro potencial y a entender cuándo merece la pena cambiar tu estación habitual.",
      },
      {
        question: "¿Qué páginas convierten mejor para búsquedas de precio?",
        answer:
          "Las que muestran información actualizada, contexto local, CTA clara a la app y un enlazado interno coherente con ciudades, rutas y autopistas cercanas.",
      },
    ],
    relatedCitySlugs: ["barcelona", "madrid", "valencia"],
    relatedRouteSlugs: ["madrid-barcelona", "barcelona-valencia"],
    relatedHighwaySlugs: ["a2", "ap7"],
    isMock: true,
  },
  {
    slug: "consejos-para-viajar-en-coche-gastando-menos",
    title: "Consejos para viajar en coche gastando menos en combustible",
    excerpt:
      "Recomendaciones sencillas para combinar planificación, velocidad estable y paradas inteligentes con el objetivo de reducir el gasto total del viaje.",
    publishedAt: "2026-03-06T09:00:00+01:00",
    updatedAt: "2026-03-14T08:55:00+01:00",
    readingTimeMinutes: 8,
    sections: [
      {
        heading: "Planifica antes de arrancar",
        paragraphs: [
          "Salir con una idea clara de dónde conviene repostar reduce las decisiones improvisadas y evita parar en la estación más cara del corredor.",
          "Esto es especialmente útil en operaciones salida o fines de semana, cuando el tráfico condiciona dónde termina repostando la mayoría de usuarios.",
        ],
      },
      {
        heading: "Combina eficiencia de conducción y eficiencia de compra",
        paragraphs: [
          "Conducir de forma suave ayuda, pero no corrige una mala decisión de precio. Ahorrar combustible y comprarlo mejor son dos palancas distintas que deben trabajar juntas.",
          "Las landings SEO que mejor convierten muestran ambas capas: consumo aproximado y diferencia de precio entre estaciones.",
        ],
      },
      {
        heading: "Usa la web para descubrir y la app para ejecutar",
        paragraphs: [
          "En SEO, la web debe resolver la búsqueda y demostrar utilidad. La app es el siguiente paso para continuar el trayecto con más detalle, filtros y navegación.",
          "Esa transición funciona mejor cuando la página ya incluye ranking, mapa, ahorro estimado y enlaces internos relevantes.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué es más importante: consumir menos o repostar más barato?",
        answer:
          "Las dos cosas suman. La primera reduce litros consumidos y la segunda reduce el coste de cada litro que terminas comprando.",
      },
      {
        question: "¿Qué busca normalmente un usuario que llega desde Google?",
        answer:
          "Suele buscar una respuesta muy concreta: precio en su ciudad, una gasolinera barata en su ruta o una referencia fiable para decidir la próxima parada.",
      },
    ],
    relatedCitySlugs: ["sevilla", "malaga", "madrid"],
    relatedRouteSlugs: ["madrid-sevilla", "bilbao-madrid"],
    relatedHighwaySlugs: ["a1", "a4", "a6"],
    isMock: true,
  },
];
