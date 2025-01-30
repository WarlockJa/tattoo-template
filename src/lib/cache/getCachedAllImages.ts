import { db } from "@cf/db/db-connection";
import { images } from "@cf/db/schemaImage";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedAllImages = cache(async () => {
  const getCachedData = unstable_cache(
    async () => {
      console.log(`Fetching db images`);

      const result = await db.select().from(images);

      return result;
    },
    [`allImages`],
    { revalidate: 60 * 60 * 24 * 30, tags: ["allImagesTag", "imagesTag"] }, // 30 days.
  );

  return await getCachedData();
});
