"use server";

import { actionClient } from "@/lib/safeAction";
import {
  addArtistSchema,
  updateArtistSchema,
  deleteArtistSchema,
} from "./schemas";
import getSession from "@/lib/db/getSession";
import userHasOwnerPriviliges from "@/lib/Rights/userHasOwnerPriviliges";
import { UnauthorisedAccessError } from "@/lib/rateLimiting/errors";
import { db } from "@cf/db";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { artists } from "@/../db/schemaArtists";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import slugify from "react-slugify";

export const addArtistAction = actionClient
  .inputSchema(addArtistSchema)
  .action(async ({ parsedInput }) => {
    // rate limiting action to 3 per minute
    await rateLimitByIp({
      key: `addArtist`,
      limit: 3,
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
      .insert(artists)
      .values({ ...parsedInput, slug: slugify(parsedInput.name) });
    updateTag(`artistsTag`);

    return result;
  });

export const updateArtistAction = actionClient
  .inputSchema(updateArtistSchema)
  .action(async ({ parsedInput }) => {
    // rate limiting action to 3 per minute
    await rateLimitByIp({
      key: `updateArtist`,
      limit: 3,
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
      .update(artists)
      .set({ ...parsedInput, slug: slugify(parsedInput.name) })
      .where(eq(artists.artistId, parsedInput.artistId));
    updateTag(`artistsTag`);

    return result;
  });

export const deleteArtistAction = actionClient
  .inputSchema(deleteArtistSchema)
  .action(async ({ parsedInput: { artistId } }) => {
    // rate limiting action to 3 per minute
    await rateLimitByIp({
      key: `deleteArtist`,
      limit: 3,
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
      .delete(artists)
      .where(eq(artists.artistId, artistId));
    updateTag(`artistsTag`);

    return result;
  });
