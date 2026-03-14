import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { runtimeConfig } from "../lib/env";
import { createCachedMinistrySnapshot } from "../lib/server/ministry-station-source";

async function main() {
  const snapshot = await createCachedMinistrySnapshot();
  const target = path.join(process.cwd(), runtimeConfig.ministryCacheFile);

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, JSON.stringify(snapshot, null, 2), "utf8");

  console.log(
    `Snapshot escrito en ${runtimeConfig.ministryCacheFile} con ${snapshot.stations.length} estaciones.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
