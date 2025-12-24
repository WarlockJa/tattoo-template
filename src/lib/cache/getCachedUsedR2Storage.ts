import { db } from "@cf/db";
import { images } from "../../../db/schemaImage";
import { sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedUsedR2Storage = cache(async () => {
  const getCachedData = unstable_cache(
    async () => {
      console.log(`Fetching used R2 storage`);

      const result = await db
        .select({
          usedStorage: sql<number>`sum(${images.sizeBytes})`,
        })
        .from(images);

      return result[0].usedStorage;
    },
    [`usedR2Storage`],
    { revalidate: 60 * 60 * 24 * 30, tags: [`usedR2StorageTag`] },
  );

  return await getCachedData();
});
