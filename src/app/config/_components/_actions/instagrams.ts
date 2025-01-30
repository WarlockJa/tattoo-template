"use server";

import { actionClient } from "@/lib/safeAction";
import {
  addInstagramSchema,
  deleteInstagramSchema,
  updateInstagramSchema,
} from "./schemas";
import getSession from "@/lib/db/getSession";
import userHasOwnerPriviliges from "@/lib/Rights/userHasOwnerPriviliges";
import { UnauthorisedAccessError } from "@/lib/rateLimiting/errors";
import { db } from "@cf/db/db-connection";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { instagrams } from "@cf/db/schemaInstagram";

export const addInstagramAction = actionClient
  .schema(addInstagramSchema)
  .action(async ({ parsedInput: { type, url } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
      throw new UnauthorisedAccessError();
    }

    const result = await db.insert(instagrams).values({
      type,
      url,
    });
    revalidateTag(`instagramsTag`);

    return result;
  });

export const updateInstagramAction = actionClient
  .schema(updateInstagramSchema)
  .action(async ({ parsedInput: { type, url, instagramId } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
      throw new UnauthorisedAccessError();
    }

    const result = await db
      .update(instagrams)
      .set({
        type,
        url,
      })
      .where(eq(instagrams.instagramId, instagramId));
    revalidateTag(`instagramsTag`);

    return result;
  });

export const deleteInstagramAction = actionClient
  .schema(deleteInstagramSchema)
  .action(async ({ parsedInput: { instagramId } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
      throw new UnauthorisedAccessError();
    }

    const result = await db
      .delete(instagrams)
      .where(eq(instagrams.instagramId, instagramId));
    revalidateTag(`instagramsTag`);

    return result;
  });
