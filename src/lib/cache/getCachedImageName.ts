import { db } from "@cf/db";
import { images } from "../../../db/schemaImage";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedImageName = cache(async (dbImageName: string) => {
  const getCachedData = unstable_cache(
    async (dbImageName: string) => {
      console.log(`Fetching db images with name ${dbImageName}`);

      const result = await db
        .select()
        .from(images)
        .where(eq(images.name, dbImageName));

      return result[0];
    },
    [`imageName${dbImageName}`],
    { revalidate: 60 * 60 * 24 * 30, tags: [`imageNameTag${dbImageName}`] }, // 30 days.
  );

  return await getCachedData(dbImageName);
});
