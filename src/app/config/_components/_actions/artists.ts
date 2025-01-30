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
import { db } from "@cf/db/db-connection";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { artists } from "@cf/db/schemaArtists";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";

export const addArtistAction = actionClient
  .schema(addArtistSchema)
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

    const result = await db.insert(artists).values(parsedInput);
    revalidateTag(`artistsTag`);

    return result;
  });

export const updateArtistAction = actionClient
  .schema(updateArtistSchema)
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
      .set(parsedInput)
      .where(eq(artists.artistId, parsedInput.artistId));
    revalidateTag(`artistsTag`);

    return result;
  });

export const deleteArtistAction = actionClient
  .schema(deleteArtistSchema)
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
    revalidateTag(`artistsTag`);

    return result;
  });
