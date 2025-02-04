import { db } from "@cf/db/db-connection";
import { SelectImage } from "@cf/db/schemaImage";
import { instagrams } from "@cf/db/schemaInstagram";
import { desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { PAGINATION_LIMIT } from "./paginationConsts";

export interface GetCachedInstagrams {
  instagramId: number;
  url: string | null;
  image: SelectImage;
}

export const getCachedInstagramsPage = cache(async (page: number) => {
  const getCachedData = unstable_cache(
    async (page: number): Promise<GetCachedInstagrams[]> => {
      console.log(`Fetching instagrams page ${page}`);

      const result = await db.query.instagrams.findMany({
        columns: {
          instagramId: true,
          url: true,
        },
        limit: PAGINATION_LIMIT,
        offset: page * PAGINATION_LIMIT,
        orderBy: desc(instagrams.instagramId),
        with: {
          image: true,
        },
      });

      return result;
    },
    [`instagrams${page}`],
    {
      revalidate: 60 * 60 * 24 * 30,
      tags: [`instagramsTag${page}`, "instagramPagesTag"],
    }, // 30 days.
  );

  return await getCachedData(page);
});
