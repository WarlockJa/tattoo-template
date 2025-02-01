import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { images } from "./schemaImage";

// instagram links table
export const instagrams = sqliteTable("instagram", {
  instagramId: integer("instagramId").primaryKey(),
  url: text("url"),
  imageId: integer("imageId")
    .notNull()
    .references(() => images.imageId, {
      onDelete: "cascade",
    }),
});

export type SelectInstagram = typeof instagrams.$inferSelect;
