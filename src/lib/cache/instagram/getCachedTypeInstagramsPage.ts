import { db } from "@cf/db/db-connection";
import { SelectImage } from "@cf/db/schemaImage";
import { instagrams } from "@cf/db/schemaInstagram";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { PAGINATION_LIMIT } from "./paginationConsts";

export interface GetCachedInstagrams {
  instagramId: number;
  url: string | null;
  type: string;
  image: SelectImage;
}

export const getCachedTypeInstagramsPage = cache(async (type: string) => {
  const getCachedData = unstable_cache(
    async (type: string): Promise<GetCachedInstagrams[]> => {
      console.log(`Fetching instagrams page for type ${type}`);

      const result = await db.query.instagrams.findMany({
        columns: {
          instagramId: true,
          url: true,
          type: true,
        },
        where: eq(instagrams.type, type),
        limit: PAGINATION_LIMIT,
        orderBy: desc(instagrams.instagramId),
        with: {
          image: true,
        },
      });

      return result;
    },
    [`instagramsType${type}`],
    {
      revalidate: 60 * 60 * 24 * 30,
      tags: [`instagramsTypeTag${type}`, "instagramPagesTag"],
    }, // 30 days.
  );

  return await getCachedData(type);
});
