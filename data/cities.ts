import type { City } from "@/types/domain";

export const cities: City[] = [
  {
    slug: "madrid",
    name: "Madrid",
    province: "Madrid",
    latitude: 40.4168,
    longitude: -3.7038,
    intro:
      "Madrid concentra un volumen muy alto de estaciones y diferencias de precio relevantes entre surtidores urbanos, corredores logísticos y accesos por autovía.",
    summary:
      "La combinación entre estaciones low-cost en el sur, salidas por la A-3 y la A-6 y áreas de servicio premium genera margen real para ahorrar en cada repostaje.",
    stationIds: [
      "madrid-castellana-repsol",
      "madrid-getafe-ballenoil",
      "madrid-leganes-petroprix",
      "madrid-las-rozas-plenoil",
      "somosierra-petroprix-a1",
      "guadalajara-lowcost-a2",
      "tarancon-plenergy-a3",
      "talavera-a5-lowcost",
      "adanero-a6-shell",
    ],
    highwaySlugs: ["a1", "a2", "a3", "a4", "a5", "a6"],
    nearbyCitySlugs: ["valencia", "sevilla", "bilbao", "barcelona"],
    pricePageSlug: "madrid",
    isMock: true,
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    province: "Barcelona",
    latitude: 41.3874,
    longitude: 2.1686,
    intro:
      "Barcelona mezcla estaciones urbanas con nodos de acceso a la AP-7 y la A-2, donde suele haber más dispersión de precios que en el centro.",
    summary:
      "Comparar Cornellà, Sant Andreu y los accesos metropolitanos evita repostajes caros de último minuto dentro de la ciudad.",
    stationIds: [
      "barcelona-sant-andreu-bonarea",
      "barcelona-cornella-esclatoil",
      "barcelona-meridiana-repsol",
      "castellon-plenergy-ap7",
      "zaragoza-plenergy-a2",
    ],
    highwaySlugs: ["a2", "ap7"],
    nearbyCitySlugs: ["valencia", "bilbao", "madrid", "malaga"],
    pricePageSlug: "barcelona",
    isMock: true,
  },
  {
    slug: "valencia",
    name: "Valencia",
    province: "Valencia",
    latitude: 39.4699,
    longitude: -0.3763,
    intro:
      "Valencia es una de las plazas más competitivas para captar búsquedas de precio diario porque concentra estaciones urbanas, logísticas y de paso por la A-3 y la AP-7.",
    summary:
      "Paterna y Xirivella suelen marcar diferencias claras frente a estaciones de paso más caras cerca del puerto o de la primera línea metropolitana.",
    stationIds: [
      "valencia-paterna-plenoil",
      "valencia-xirivella-ballenoil",
      "valencia-puerto-galp",
      "requena-ballenoil-a3",
      "castellon-plenergy-ap7",
      "alicante-san-vicente-ballenoil",
    ],
    highwaySlugs: ["a3", "ap7"],
    nearbyCitySlugs: ["barcelona", "madrid", "malaga", "sevilla"],
    pricePageSlug: "valencia",
    isMock: true,
  },
  {
    slug: "sevilla",
    name: "Sevilla",
    province: "Sevilla",
    latitude: 37.3891,
    longitude: -5.9845,
    intro:
      "Sevilla combina tráfico urbano y de largo recorrido por la A-4, una situación ideal para búsquedas transaccionales ligadas a ahorro en ruta.",
    summary:
      "Dos Hermanas y los accesos orientales suelen ofrecer mejor precio que las estaciones más céntricas o las áreas de servicio de conveniencia.",
    stationIds: [
      "sevilla-este-petroprix",
      "sevilla-dos-hermanas-plenergy",
      "valdepenas-repsol-a4",
      "cordoba-plenergy-a4",
    ],
    highwaySlugs: ["a4"],
    nearbyCitySlugs: ["madrid", "malaga", "valencia"],
    pricePageSlug: "sevilla",
    isMock: true,
  },
  {
    slug: "bilbao",
    name: "Bilbao",
    province: "Bizkaia",
    latitude: 43.263,
    longitude: -2.935,
    intro:
      "Bilbao es un punto potente para búsquedas locales y para viajes largos hacia Madrid por la A-1, donde merece la pena elegir bien la parada.",
    summary:
      "Las estaciones de Zorrotza y Etxebarri sirven como base local, pero el ahorro crece cuando se compara con áreas de servicio en Burgos o Somosierra.",
    stationIds: [
      "bilbao-zorroza-avia",
      "bilbao-etxebarri-repsol",
      "burgos-ballenoil-a1",
      "somosierra-petroprix-a1",
    ],
    highwaySlugs: ["a1"],
    nearbyCitySlugs: ["madrid", "barcelona"],
    pricePageSlug: "madrid",
    isMock: true,
  },
  {
    slug: "malaga",
    name: "Málaga",
    province: "Málaga",
    latitude: 36.7213,
    longitude: -4.4214,
    intro:
      "Málaga funciona bien como nodo SEO para viajes de costa y trayectos por la AP-7, donde la dispersión tarifaria sigue siendo significativa.",
    summary:
      "Las búsquedas de gasolineras baratas en Málaga y en la Costa del Sol suelen necesitar datos útiles y una CTA fuerte a la app para continuar el viaje.",
    stationIds: ["malaga-norte-petroprix", "alicante-san-vicente-ballenoil"],
    highwaySlugs: ["ap7"],
    nearbyCitySlugs: ["sevilla", "valencia", "barcelona"],
    pricePageSlug: "valencia",
    isMock: true,
  },
  {
    slug: "alicante",
    name: "Alicante",
    province: "Alicante",
    latitude: 38.3452,
    longitude: -0.4815,
    intro:
      "Alicante amplía la cobertura mediterránea de la arquitectura SEO y sirve para reforzar búsquedas de repostaje en la AP-7 y viajes de costa.",
    summary:
      "Aunque no forma parte del seed mínimo, esta ciudad permite enlazar mejor rutas como Valencia - Alicante y autopistas con alta intención de compra.",
    stationIds: ["alicante-san-vicente-ballenoil"],
    highwaySlugs: ["ap7"],
    nearbyCitySlugs: ["valencia", "malaga", "barcelona"],
    pricePageSlug: "valencia",
    isMock: true,
  },
];
