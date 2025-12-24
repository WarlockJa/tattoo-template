import { getCloudflareContext } from "@opennextjs/cloudflare";

export const CWBlurhash = (await getCloudflareContext({ async: true })).env
  .CWBlurhash;
