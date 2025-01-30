import { db } from "@cf/db/db-connection";
import { products } from "@cf/db/schemaProduct";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getCachedProducts = cache(async () => {
  const getCachedData = unstable_cache(
    async () => {
      console.log(`Fetching products`);

      const result = await db.select().from(products);

      return result;
    },
    [`products`],
    { revalidate: 60 * 60 * 24 * 30, tags: ["productsTag"] }, // 30 days.
  );

  return await getCachedData();
});
