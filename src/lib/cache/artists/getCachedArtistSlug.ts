import { db } from "@cf/db";
import { artists } from "../../../../db/schemaArtists";
import { images } from "../../../../db/schemaImage";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedArtistSlug = cache(async (name_slug: string) => {
  const getCachedData = unstable_cache(
    async (name_slug: string) => {
      console.log(`Fetching Artist ${name_slug}`);

      const result = await db
        .select()
        .from(artists)
        .leftJoin(images, eq(images.imageId, artists.imageId))
        .where(eq(artists.slug, name_slug));

      return result[0];
    },
    [`artist${name_slug}`],
    { revalidate: 60 * 60 * 24 * 30, tags: [`artistTag${name_slug}`] }, // 30 days.
  );

  return await getCachedData(name_slug);
});
