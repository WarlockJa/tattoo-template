import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { images } from "./schemaImage";
import { relations } from "drizzle-orm";

// instagram links table
export const instagrams = sqliteTable("instagram", {
  instagramId: integer("instagramId").primaryKey(),
  url: text("url"),
  imageId: integer("imageId")
    .notNull()
    .references(() => images.imageId, {
      onDelete: "cascade",
    }),
  type: text("type").notNull().default("tattoo"),
});

export type SelectInstagram = typeof instagrams.$inferSelect;

// exporting relations for query builder
export const instagrams_relations = relations(instagrams, ({ one }) => ({
  image: one(images, {
    fields: [instagrams.imageId],
    references: [images.imageId],
  }),
}));
