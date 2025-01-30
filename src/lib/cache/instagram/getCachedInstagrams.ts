import { db } from "@cf/db/db-connection";
import { instagrams } from "@cf/db/schemaInstagram";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedInstagrams = cache(async () => {
  const getCachedData = unstable_cache(
    async () => {
      console.log(`Fetching instagrams`);

      const result = await db.select().from(instagrams);

      return result;
    },
    [`instagrams`],
    { revalidate: 60 * 60 * 24 * 30, tags: ["instagramsTag"] }, // 30 days.
  );

  return await getCachedData();
});
