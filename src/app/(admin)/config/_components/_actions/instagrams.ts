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
import { db } from "@cf/db";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { instagrams } from "@/../db/schemaInstagram";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";

export const addInstagramAction = actionClient
  .inputSchema(addInstagramSchema)
  .action(async ({ parsedInput: { url, imageId, type } }) => {
    // rate limiting action to 20 per minute
    await rateLimitByIp({
      key: `addInstagramImage`,
      limit: 20,
      window: 60 * 1000, // 1 minute
    });

    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
      throw new UnauthorisedAccessError();
    }

    const result = await db
      .insert(instagrams)
      .values({
        url,
        imageId,
        type,
      })
      .returning();
    updateTag(`instagramsTag`);
    updateTag("instagramPagesTag");
    updateTag("instagramsCountTag");

    return result;
  });

export const updateInstagramAction = actionClient
  .inputSchema(updateInstagramSchema)
  .action(async ({ parsedInput: { url, instagramId, imageId, type } }) => {
    // rate limiting action to 20 per minute
    await rateLimitByIp({
      key: `updateInstagramImage`,
      limit: 20,
      window: 60 * 1000, // 1 minute
    });

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
        url,
        imageId,
        type,
      })
      .where(eq(instagrams.instagramId, instagramId))
      .returning();
    updateTag(`instagramsTag`);
    updateTag("instagramPagesTag");

    return result;
  });

export const deleteInstagramAction = actionClient
  .inputSchema(deleteInstagramSchema)
  .action(async ({ parsedInput: { instagramId } }) => {
    // rate limiting action to 20 per minute
    await rateLimitByIp({
      key: `deleteInstagramImage`,
      limit: 20,
      window: 60 * 1000, // 1 minute
    });

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
    updateTag(`instagramsTag`);
    updateTag("instagramPagesTag");
    updateTag("instagramsCountTag");

    return result;
  });
