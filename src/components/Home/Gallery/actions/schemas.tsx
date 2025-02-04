import { z } from "zod";

export const loadHomeGalleryPageSchema = z.object({
  page: z.number().min(0),
});
