import { getCloudflareContext } from "@opennextjs/cloudflare";

export const r2 = (await getCloudflareContext({ async: true })).env.R2;
