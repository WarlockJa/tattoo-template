"use server";

import getSession from "@/lib/db/getSession";
import { r2 } from "@cf/bucket/r2";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import {
  R2StorageLimitExceededError,
  UnauthorisedAccessError,
} from "@/lib/rateLimiting/errors";
import {
  createImagesSchema,
  deleteImageSchema,
  imageFileSchema,
} from "./schemas";
import { defaultBlurhash, USER_STORAGE_LIMIT } from "@/appConfig";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import userHasOwnerPriviliges from "@/lib/Rights/userHasOwnerPriviliges";
import { getCachedUsedR2Storage } from "@/lib/cache/getCachedUsedR2Storage";
import { images, SelectImage } from "@cf/db/schemaImage";
import { db } from "@cf/db/db-connection";
import { env } from "@/lib/env.mjs";
import { CWBlurhash } from "@cf/blurhash/blurhash";

export const createImagesAction = actionClient
  .schema(createImagesSchema)
  .action(async ({ parsedInput }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
      throw new UnauthorisedAccessError();
    }

    // TODO rate limit before file data transfer?
    // rate limiting action to 100 per hour
    await rateLimitByIp({
      key: `createImage${user.id}`,
      limit: 100,
      window: 60 * 60 * 1000,
    });

    // reassembling parsed file and file dimensions array into a single array
    const parsedImages = parsedInput.imageFiles.map((file, index) => ({
      file: file,
      width: parsedInput.imageWidths[index],
      height: parsedInput.imageHeigths[index],
    }));

    // checking user storage limit
    const userUsedR2Storage = await getCachedUsedR2Storage();
    // console.log(userUsedR2Storage);

    const newFilesSize = parsedImages.reduce(
      (sum, item) => (item.file ? (sum += item.file.size) : sum),
      0,
    );

    // if user storage limit exceeded returning an error
    if (userUsedR2Storage + newFilesSize >= USER_STORAGE_LIMIT) {
      throw new R2StorageLimitExceededError();
    }

    const createImagePromises = parsedImages.map(
      (item) =>
        item && createImage({ ...item, restricted: parsedInput.restricted }),
    );
    const result = await Promise.all(createImagePromises);

    // revalidating cached data
    revalidateTag(`usedR2StorageTag`);
    revalidateTag(`imagesTag`);

    return result;
  });
async function createImage({
  file,
  height,
  width,
  restricted,
}: z.infer<typeof imageFileSchema> & {
  restricted: boolean;
}): Promise<SelectImage> {
  // generating cuid2 to be used as image unique prefix allows images with the same name to be saved separately
  const prefix = createId();

  // saving image to R2
  try {
    // writing file to R2
    await r2.put(`${prefix}-${file.name}`, file);
  } catch (error: unknown) {
    throw new Error(JSON.stringify(error));
  }
  // creating DB image and blog_image records
  try {
    // generating blurhash from the worker in production
    let blurhash: string = defaultBlurhash;
    try {
      const headers = new Headers();
      headers.append(env.BLURHASHWORKER_HEADER, env.BLURHASHWORKER_ACCESS_KEY);
      if (process.env.NODE_ENV === "production") {
        blurhash = await CWBlurhash.fetch(
          `${env.BLURHASHWORKER_URL}?img=${env.NEXT_PUBLIC_R2_URI}/${prefix}-${file.name}`,
          { headers },
        ).then((response) => response.text());
      }
    } catch (error: unknown) {
      throw new Error(JSON.stringify(error));
    }

    // creating image DB record and returning object to use the imageId
    const result = (
      await db
        .insert(images)
        .values({
          name: `${prefix}-${file.name}`,
          blurhash,
          width,
          height,
          sizeBytes: file.size,
          aria: file.name,
          restricted,
        })
        .returning()
    )[0];

    return result;
  } catch (error: unknown) {
    // if error writing to R2 then deleting previously created DB record
    await Promise.all([
      db.delete(images).where(eq(images.name, `${prefix}-${file.name}`)),
      r2.delete(`${prefix}-${file.name}`),
    ]);
    throw new Error(JSON.stringify(error));
  }
}

export const deleteImageAction = actionClient
  .schema(deleteImageSchema)
  .action(async ({ parsedInput: { imageId } }) => {
    // verifying user rights
    const session = await getSession();
    const user = session?.user;

    // protecting from unauthorised access
    if (!user || !userHasOwnerPriviliges({ role: user?.role })) {
      throw new UnauthorisedAccessError();
    }

    const result = await db.delete(images).where(eq(images.imageId, imageId));
    revalidateTag(`usedR2StorageTag`);
    revalidateTag(`imagesTag`);

    return result;
  });
