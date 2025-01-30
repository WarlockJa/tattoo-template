import { getRequestContext } from "@cloudflare/next-on-pages";

export const r2 =
  process.env.NODE_ENV === "development"
    ? getRequestContext().env.R2
    : (process.env as unknown as CloudflareEnv).R2;
