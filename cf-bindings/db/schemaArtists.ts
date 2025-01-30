import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { images } from "./schemaImage";

// instagram links table
export const artists = sqliteTable("artist", {
  artistId: integer("artistId").primaryKey(),
  name: text("name").notNull(),
  imageId: integer("imageId").references(() => images.imageId, {
    onDelete: "set null",
  }),
  // short description of specialization if any
  specialty: text("specialty"),
  // main block 1
  block1ImageId: integer("block1ImageId").references(() => images.imageId, {
    onDelete: "set null",
  }),
  block1Description: text("block1Description").notNull(),
  // main block 2
  block2ImageId: integer("block2ImageId").references(() => images.imageId, {
    onDelete: "set null",
  }),
  block2Description: text("block2Description").notNull(),
  // images feed
  imageFeed1ImageId: integer("imageFeed1ImageId").references(
    () => images.imageId,
    { onDelete: "set null" },
  ),
  imageFeed2ImageId: integer("imageFeed2ImageId").references(
    () => images.imageId,
    { onDelete: "set null" },
  ),
  imageFeed3ImageId: integer("imageFeed3ImageId").references(
    () => images.imageId,
    { onDelete: "set null" },
  ),
  imageFeed4ImageId: integer("imageFeed4ImageId").references(
    () => images.imageId,
    { onDelete: "set null" },
  ),
  imageFeed5ImageId: integer("imageFeed5ImageId").references(
    () => images.imageId,
    { onDelete: "set null" },
  ),
  imageFeed6ImageId: integer("imageFeed6ImageId").references(
    () => images.imageId,
    { onDelete: "set null" },
  ),
  imageFeed7ImageId: integer("imageFeed7ImageId").references(
    () => images.imageId,
    { onDelete: "set null" },
  ),
  imageFeed8ImageId: integer("imageFeed8ImageId").references(
    () => images.imageId,
    { onDelete: "set null" },
  ),
});

export type SelectArtist = typeof artists.$inferSelect;
