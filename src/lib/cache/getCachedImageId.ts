import { db } from "@cf/db/db-connection";
import { images } from "@cf/db/schemaImage";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedImageId = cache(async (dbImageId: number) => {
  const getCachedData = unstable_cache(
    async (dbImageId: number) => {
      console.log(`Fetching db images with ID ${dbImageId}`);

      const result = await db
        .select()
        .from(images)
        .where(eq(images.imageId, dbImageId));

      return result;
    },
    [`imageId${dbImageId}`],
    { revalidate: 60 * 60 * 24 * 30, tags: [`imageIdTag${dbImageId}`] }, // 30 days.
  );

  return await getCachedData(dbImageId);
});
