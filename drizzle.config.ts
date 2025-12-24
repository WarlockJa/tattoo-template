import type { Config } from "drizzle-kit";

export default process.env.LOCAL_DB_PATH
  ? ({
      schema: "./db/schemas.ts",
      dialect: "sqlite",
      dbCredentials: {
        url: process.env.LOCAL_DB_PATH,
      },
    } as Config)
  : ({
      driver: "d1-http",
      dialect: "sqlite",
      schema: "./db/schemas.ts",
      out: "./drizzle",
    } satisfies Config);
