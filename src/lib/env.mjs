// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    BLURHASHWORKER_URL: z.string().min(1),
    BLURHASHWORKER_HEADER: z.string().min(1),
    BLURHASHWORKER_ACCESS_KEY: z.string().min(1),
    SMTP_URI: z.string().min(1),
    SMTP_FROM: z.string().min(1),
    SMTP_API_KEY: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_URI: z.string().url(),
    NEXT_PUBLIC_R2_URI: z.string().url(),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_MAP_ID: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    BLURHASHWORKER_URL: process.env.BLURHASHWORKER_URL,
    BLURHASHWORKER_HEADER: process.env.BLURHASHWORKER_HEADER,
    BLURHASHWORKER_ACCESS_KEY: process.env.BLURHASHWORKER_ACCESS_KEY,
    NEXT_PUBLIC_URI: process.env.NEXT_PUBLIC_URI,
    NEXT_PUBLIC_R2_URI: process.env.NEXT_PUBLIC_R2_URI,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    SMTP_URI: process.env.SMTP_URI,
    SMTP_FROM: process.env.SMTP_FROM,
    SMTP_API_KEY: process.env.SMTP_API_KEY,
  },
});
