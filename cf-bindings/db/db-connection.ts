import { drizzle } from "drizzle-orm/d1";
import { getRequestContext } from "@cloudflare/next-on-pages";
import * as schemaAuth from "./schemaAuth";
import * as schemaImage from "./schemaImage";
import * as schemaInstagram from "./schemaInstagram";
import * as schemaArtists from "./schemaArtists";

export const db = drizzle(
  process.env.NODE_ENV === "development"
    ? getRequestContext().env.DB
    : (process.env as unknown as CloudflareEnv).DB,
  {
    schema: {
      ...schemaAuth,
      ...schemaImage,
      ...schemaInstagram,
      ...schemaArtists,
    },
  },
);
