import { getRequestContext } from "@cloudflare/next-on-pages";

export const CWBlurhash =
  process.env.NODE_ENV === "development"
    ? getRequestContext().env.CWBlurhash
    : (process.env as unknown as CloudflareEnv).CWBlurhash;
