import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// instagram links table
export const instagrams = sqliteTable("instagram", {
  instagramId: integer("instagramId").primaryKey(),
  url: text("url").unique().notNull(),
});

export type SelectInstagram = typeof instagrams.$inferSelect;
