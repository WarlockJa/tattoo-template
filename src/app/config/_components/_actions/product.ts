"use server";

import { actionClient } from "@/lib/safeAction";
import {
  addProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from "./schemas";
import getSession from "@/lib/db/getSession";
import userHasOwnerPriviliges from "@/lib/Rights/userHasOwnerPriviliges";
import { UnauthorisedAccessError } from "@/lib/rateLimiting/errors";
import { db } from "@cf/db/db-connection";
import { products } from "@cf/db/schemaProduct";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const addProductAction = actionClient
  .schema(addProductSchema)
  .action(
    async ({ parsedInput: { description, name, price, special, imageId } }) => {
      // verifying user rights
      const session = await getSession();
      const user = session?.user;

      // protecting from unauthorised access
      if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
        throw new UnauthorisedAccessError();
      }

      const result = await db.insert(products).values({
        name,
        description,
        price,
        imageId,
        special,
      });
      revalidateTag(`productsTag`);

      return result;
    },
  );

export const updateProductAction = actionClient
  .schema(updateProductSchema)
  .action(
    async ({
      parsedInput: { productId, description, name, price, special, imageId },
    }) => {
      // verifying user rights
      const session = await getSession();
      const user = session?.user;

      // protecting from unauthorised access
      if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
        throw new UnauthorisedAccessError();
      }

      const result = await db
        .update(products)
        .set({
          name,
          description,
          price,
          imageId,
          special,
        })
        .where(eq(products.productId, productId));
      revalidateTag(`productsTag`);

      return result;
    },
  );

export const deleteProductAction = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { productId } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
      throw new UnauthorisedAccessError();
    }

    const result = await db
      .delete(products)
      .where(eq(products.productId, productId));
    revalidateTag(`productsTag`);

    return result;
  });
