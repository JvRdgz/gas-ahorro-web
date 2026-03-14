import type { Highway } from "@/types/domain";

export const highways: Highway[] = [
  {
    slug: "a1",
    name: "A-1",
    type: "Autovía",
    citiesConnected: ["Madrid", "Burgos", "Bilbao"],
    citySlugs: ["madrid", "bilbao"],
    stationIds: [
      "somosierra-petroprix-a1",
      "burgos-ballenoil-a1",
      "bilbao-etxebarri-repsol",
    ],
    description:
      "La A-1 une Madrid con el norte peninsular y concentra varias paradas donde el precio mejora frente a estaciones de conveniencia de alto tráfico.",
    isMock: true,
  },
  {
    slug: "a2",
    name: "A-2",
    type: "Autovía",
    citiesConnected: ["Madrid", "Guadalajara", "Zaragoza", "Barcelona"],
    citySlugs: ["madrid", "barcelona"],
    stationIds: [
      "guadalajara-lowcost-a2",
      "zaragoza-plenergy-a2",
      "barcelona-meridiana-repsol",
    ],
    description:
      "La A-2 es clave para viajes entre Madrid y Barcelona y ofrece oportunidades de ahorro especialmente fuera de las áreas de servicio más evidentes.",
    isMock: true,
  },
  {
    slug: "a3",
    name: "A-3",
    type: "Autovía",
    citiesConnected: ["Madrid", "Tarancón", "Requena", "Valencia"],
    citySlugs: ["madrid", "valencia"],
    stationIds: [
      "madrid-getafe-ballenoil",
      "tarancon-plenergy-a3",
      "requena-ballenoil-a3",
      "valencia-xirivella-ballenoil",
    ],
    description:
      "La A-3 soporta una parte muy relevante del tráfico entre Madrid y Valencia y es un eje prioritario para páginas SEO de repostaje en ruta.",
    isMock: true,
  },
  {
    slug: "a4",
    name: "A-4",
    type: "Autovía",
    citiesConnected: ["Madrid", "Valdepeñas", "Córdoba", "Sevilla"],
    citySlugs: ["madrid", "sevilla"],
    stationIds: [
      "madrid-getafe-ballenoil",
      "valdepenas-repsol-a4",
      "cordoba-plenergy-a4",
      "sevilla-dos-hermanas-plenergy",
    ],
    description:
      "La A-4 es uno de los corredores más rentables para SEO transaccional, porque el impacto del precio por litro se acumula rápido en viajes largos.",
    isMock: true,
  },
  {
    slug: "a5",
    name: "A-5",
    type: "Autovía",
    citiesConnected: ["Madrid", "Talavera de la Reina", "Badajoz"],
    citySlugs: ["madrid"],
    stationIds: ["madrid-leganes-petroprix", "talavera-a5-lowcost"],
    description:
      "La A-5 combina tráfico de salida de Madrid y trayectos de media distancia. Una estructura SEO sólida aquí ayuda a capturar búsquedas por autovía concreta.",
    isMock: true,
  },
  {
    slug: "a6",
    name: "A-6",
    type: "Autovía",
    citiesConnected: ["Madrid", "Adanero", "León", "Galicia"],
    citySlugs: ["madrid"],
    stationIds: ["madrid-las-rozas-plenoil", "adanero-a6-shell"],
    description:
      "La A-6 es una vía estratégica para escapadas de fin de semana y viajes largos. Las búsquedas por carretera concreta suelen tener alta intención.",
    isMock: true,
  },
  {
    slug: "ap7",
    name: "AP-7",
    type: "Autopista",
    citiesConnected: ["Barcelona", "Castellón", "Valencia", "Alicante", "Málaga"],
    citySlugs: ["barcelona", "valencia", "malaga"],
    stationIds: [
      "barcelona-cornella-esclatoil",
      "castellon-plenergy-ap7",
      "alicante-san-vicente-ballenoil",
      "malaga-norte-petroprix",
    ],
    description:
      "La AP-7 atraviesa buena parte del arco mediterráneo y permite construir páginas de autopista y de ruta con gran potencial de crecimiento orgánico.",
    isMock: true,
  },
];
