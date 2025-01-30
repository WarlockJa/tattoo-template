import { db } from "@cf/db/db-connection";
import { artists } from "@cf/db/schemaArtists";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedArtists = cache(async () => {
  const getCachedData = unstable_cache(
    async () => {
      console.log(`Fetching Artists`);

      const result = await db.select().from(artists);

      return result;
    },
    [`artists`],
    { revalidate: 60 * 60 * 24 * 30, tags: ["artistsTag"] }, // 30 days.
  );

  return await getCachedData();
});
