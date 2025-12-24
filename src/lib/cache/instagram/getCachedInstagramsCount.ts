import { db } from "@cf/db";
import { instagrams } from "../../../../db/schemaInstagram";
import { count } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedInstagramsCount = cache(async () => {
  const getCachedData = unstable_cache(
    async (): Promise<number> => {
      console.log(`Fetching instagrams count`);

      const result = (await db.select({ count: count() }).from(instagrams))[0]
        .count;

      return result;
    },
    [`instagramsCount`],
    { revalidate: 60 * 60 * 24 * 30, tags: [`instagramsCountTag`] }, // 30 days.
  );

  return await getCachedData();
});
