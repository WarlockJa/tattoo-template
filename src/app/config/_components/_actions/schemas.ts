import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(2048),
  imageId: z.number().optional(),
  price: z.coerce.number().min(1),
  special: z.boolean(),
});

export const updateProductSchema = z.object({
  productId: z.number(),
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(2048).optional(),
  imageId: z.number().nullable().optional(),
  price: z.coerce.number().min(1).optional(),
  special: z.boolean().optional(),
});

export const deleteProductSchema = z.object({
  productId: z.number(),
});
