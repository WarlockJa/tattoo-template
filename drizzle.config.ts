import type { Config } from "drizzle-kit";

export default process.env.LOCAL_DB_PATH
  ? ({
      schema: [
        "./cf-bindings/db/schemaAuth.ts",
        "./cf-bindings/db/schemaImage.ts",
        "./cf-bindings/db/schemaInstagram.ts",
        "./cf-bindings/db/schemaArtists.ts",
      ],
      dialect: "sqlite",
      dbCredentials: {
        url: process.env.LOCAL_DB_PATH,
      },
    } as Config)
  : ({
      driver: "d1-http",
      dialect: "sqlite",
      schema: [
        "./cf-bindings/db/schemaAuth.ts",
        "./cf-bindings/db/schemaImage.ts",
        "./cf-bindings/db/schemaInstagram.ts",
        "./cf-bindings/db/schemaArtists.ts",
      ],
      out: "./drizzle",
    } satisfies Config);
