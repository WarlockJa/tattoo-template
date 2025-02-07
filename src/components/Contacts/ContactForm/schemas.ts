import { Locale } from "@/i18n/config";
import { z } from "zod";

const locales: Locale[] = ["en", "ru", "tr"];
const locale = z.enum([locales[0], locales[1], locales[2]]);

export const messageSchema = z.object({
  name: z.string().min(3).max(60),
  phone: z.string().min(7).max(20),
  email: z.string().email().max(60),
  message: z.string().min(20).max(500),
  locale: locale.optional().default("en"),
});
