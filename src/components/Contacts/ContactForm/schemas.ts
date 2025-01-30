import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().min(3).max(60),
  phone: z.string().min(7).max(20),
  email: z.string().email().max(60),
  message: z.string().min(20).max(500),
});
