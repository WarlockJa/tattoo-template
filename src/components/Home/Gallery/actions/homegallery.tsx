"use server";
import { actionClient } from "@/lib/safeAction";
import { loadHomeGalleryPageSchema } from "./schemas";
import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import { getCachedInstagramsPage } from "@/lib/cache/instagram/getCachedInstagramsPage";

export const loadHomeGalleryPageAction = actionClient
  .inputSchema(loadHomeGalleryPageSchema)
  .action(async ({ parsedInput: { page } }) => {
    // rate limiting action to 3 per minute
    await rateLimitByIp({
      key: `loadPage`,
      limit: 1,
      window: 1000, // 1 second
    });
    const result = await getCachedInstagramsPage(page);

    return result;
  });
