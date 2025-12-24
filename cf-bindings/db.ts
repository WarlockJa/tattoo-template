import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schemas";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const db = drizzle(
  (await getCloudflareContext({ async: true })).env.DB,
  {
    schema,
  },
);
