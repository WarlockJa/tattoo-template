import { z } from "zod";

// Instagram images schemas
export const addInstagramSchema = z.object({
  url: z.string().url(),
});

export const updateInstagramSchema = z.object({
  instagramId: z.number(),
  url: z.string().url().optional(),
});

export const deleteInstagramSchema = z.object({
  instagramId: z.number(),
});

// artists schemas
export const addArtistSchema = z.object({
  name: z.string().min(3).max(255),
  imageId: z.number().optional(),
  specialty: z.string().max(512).optional(),
  block1ImageId: z.number().optional(),
  block1Description: z.string().min(20).max(2048),
  block2ImageId: z.number().optional(),
  block2Description: z.string().min(20).max(2048),
  imageFeed1ImageId: z.number().optional(),
  imageFeed2ImageId: z.number().optional(),
  imageFeed3ImageId: z.number().optional(),
  imageFeed4ImageId: z.number().optional(),
  imageFeed5ImageId: z.number().optional(),
  imageFeed6ImageId: z.number().optional(),
  imageFeed7ImageId: z.number().optional(),
  imageFeed8ImageId: z.number().optional(),
});

export const updateArtistSchema = z.object({
  artistId: z.number(),
  name: z.string().min(3).max(255).optional(),
  imageId: z.number().nullable().optional(),
  specialty: z.string().max(512).nullable().optional(),
  block1ImageId: z.number().nullable().optional(),
  block1Description: z.string().min(20).max(2048),
  block2ImageId: z.number().nullable().optional(),
  block2Description: z.string().min(20).max(2048).optional(),
  imageFeed1ImageId: z.number().nullable().optional(),
  imageFeed2ImageId: z.number().nullable().optional(),
  imageFeed3ImageId: z.number().nullable().optional(),
  imageFeed4ImageId: z.number().nullable().optional(),
  imageFeed5ImageId: z.number().nullable().optional(),
  imageFeed6ImageId: z.number().nullable().optional(),
  imageFeed7ImageId: z.number().nullable().optional(),
  imageFeed8ImageId: z.number().nullable().optional(),
});

export const deleteArtistSchema = z.object({
  artistId: z.number(),
});
