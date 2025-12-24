import { db } from "@cf/db";
import { artists } from "@/../db/schemaArtists";
import { cache } from "react";
import { unstable_cache } from "next/cache";

// export const getCachedArtists = async () => {
//   console.log(`Fetching Artists`);

//   const result = await db.select().from(artists);

//   return result;
// };

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
