import { z } from "zod";

export const addInstagramSchema = z.object({
  url: z.string().url(),
  type: z.number().default(0),
});

export const updateInstagramSchema = z.object({
  instagramId: z.number(),
  url: z.string().url().optional(),
  type: z.number().default(0).optional(),
});

export const deleteInstagramSchema = z.object({
  instagramId: z.number(),
});
