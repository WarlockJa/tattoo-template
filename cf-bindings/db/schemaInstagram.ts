import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// instagram links table
export const instagrams = sqliteTable("instagram", {
  instagramId: integer("instagramId").primaryKey(),
  url: text("url").unique().notNull(),
  // 0 - picture
  // 1 - reel
  type: integer("type").notNull().default(0),
});

export type SelectInstagram = typeof instagrams.$inferSelect;
