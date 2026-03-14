import { formatCurrency, formatPricePerLiter, formatUpdatedAt } from "@/lib/utils";
import type { FAQItem, Highway, RouteEntity, Station } from "@/types/domain";

export function buildCityFaqs(cityName: string, stations: Station[]): FAQItem[] {
  const sorted = [...stations].sort(
    (left, right) => (left.priceGasoline95 ?? 99) - (right.priceGasoline95 ?? 99),
  );
  const cheapest = sorted[0];
  const priciest = sorted[sorted.length - 1];
  const spread =
    cheapest?.priceGasoline95 && priciest?.priceGasoline95
      ? priciest.priceGasoline95 - cheapest.priceGasoline95
      : 0;

  return [
    {
      question: `¿Cuál es la gasolinera más barata en ${cityName} hoy?`,
      answer: cheapest
        ? `${cheapest.name} aparece como la referencia más competitiva de esta vista mock, con gasolina 95 a ${formatPricePerLiter(
            cheapest.priceGasoline95 ?? 0,
          )} y actualización ${formatUpdatedAt(cheapest.updatedAt)}.`
        : `Todavía no hay estaciones suficientes para responder con precisión en ${cityName}.`,
    },
    {
      question: `¿Dónde repostar barato cerca de ${cityName}?`,
      answer:
        "Conviene revisar tanto el núcleo urbano como accesos logísticos y salidas de autovía. Ahí suele aparecer la mayor dispersión de precio por litro.",
    },
    {
      question: `¿Qué diferencia de precio puede haber entre estaciones en ${cityName}?`,
      answer:
        spread > 0
          ? `En esta demo la diferencia ronda ${formatCurrency(spread)} por litro entre las estaciones más barata y más cara. Con un depósito medio el impacto económico ya es visible.`
          : "La diferencia exacta depende del combustible y del momento de actualización de los datos.",
    },
  ];
}

export function buildRouteFaqs(
  route: RouteEntity,
  stations: Station[],
): FAQItem[] {
  const cheapest = [...stations].sort(
    (left, right) => (left.priceGasoline95 ?? 99) - (right.priceGasoline95 ?? 99),
  )[0];

  return [
    {
      question: `¿Dónde conviene repostar en la ruta ${route.origin} - ${route.destination}?`,
      answer: cheapest
        ? `En esta ruta mock destaca ${cheapest.name}, situada cerca de ${cheapest.city}. Sirve como referencia para mostrar cómo priorizar una parada barata sin desviarte demasiado.`
        : "La mejor parada depende del combustible, el tráfico y el estado del depósito en ese momento.",
    },
    {
      question: "¿Cuánto se puede ahorrar repostando en una estación barata en esta ruta?",
      answer:
        "Depende del consumo y del depósito, pero unos pocos céntimos por litro ya suponen varios euros si el viaje es largo y el repostaje es completo.",
    },
    {
      question: "¿Es mejor repostar al salir o esperar a mitad de camino?",
      answer:
        "Lo más útil es comparar el precio de salida con estaciones competitivas en ruta. En corredores largos suele compensar reservar la parada para un punto intermedio.",
    },
  ];
}

export function buildHighwayFaqs(
  highway: Highway,
  stations: Station[],
): FAQItem[] {
  const cheapest = [...stations].sort(
    (left, right) => (left.priceGasoline95 ?? 99) - (right.priceGasoline95 ?? 99),
  )[0];

  return [
    {
      question: `¿Cuál es la gasolinera más barata en la ${highway.name}?`,
      answer: cheapest
        ? `En esta demo la estación mejor posicionada es ${cheapest.name}, una referencia útil para búsquedas de alta intención sobre ${highway.name}.`
        : `La respuesta depende del tramo concreto de la ${highway.name} y de la actualización disponible.`,
    },
    {
      question: `¿Merece la pena comparar estaciones en la ${highway.name}?`,
      answer:
        "Sí. En vías de mucho tráfico es habitual que exista una dispersión relevante entre áreas de servicio de paso y estaciones de salida o polígonos cercanos.",
    },
    {
      question: `¿Qué tipo de viajes activa búsquedas sobre la ${highway.name}?`,
      answer:
        "Normalmente viajes interurbanos, escapadas de fin de semana o trayectos recurrentes donde el usuario quiere decidir una parada concreta antes de llegar.",
    },
  ];
}

export function buildPriceFaqs(cityName: string): FAQItem[] {
  return [
    {
      question: `¿Cuál es el precio de la gasolina en ${cityName} hoy?`,
      answer:
        "Esta página resume el rango de precios detectado en la vista mock para ayudar a entender el mercado local antes de saltar a la app.",
    },
    {
      question: `¿Dónde está el diésel más barato en ${cityName}?`,
      answer:
        "La tabla permite ordenar estaciones y comparar el diésel con la gasolina 95 para detectar rápidamente la opción más competitiva.",
    },
    {
      question: `¿Cada cuánto conviene actualizar los precios de ${cityName}?`,
      answer:
        "En un proyecto real conviene regenerar estas páginas con ISR varias veces al día o cada vez que llegue un lote nuevo de datos oficiales.",
    },
  ];
}
