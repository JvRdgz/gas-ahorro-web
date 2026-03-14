# gas-ahorro-web

Web SEO programática para Gas Ahorro construida con Next.js App Router.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Fuente de datos en producción

La web ya no depende solo del seed mock. Tiene una capa de datos configurable:

- `DATA_SOURCE_MODE=auto`: usa snapshot local si existe; si no, intenta la API oficial; si falla, cae a mock.
- `DATA_SOURCE_MODE=cache`: usa `data/generated/ministry-stations.json`.
- `DATA_SOURCE_MODE=live`: consulta la API oficial del ministerio en servidor con ISR.
- `DATA_SOURCE_MODE=mock`: fuerza el seed local.

## Generar snapshot local

```bash
npm run sync:stations
```

Eso descarga la fuente oficial y escribe un snapshot normalizado en `data/generated/ministry-stations.json`.

## Google Routes opcional

Si defines `GOOGLE_MAPS_SERVER_API_KEY`, la capa de rutas puede enriquecer la geometría con Google Routes API. Si no, usa la geometría seed del proyecto como fallback.
