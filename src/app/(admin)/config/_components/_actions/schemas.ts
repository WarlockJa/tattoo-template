import { ServicesType } from "@/components/Services/servicesData";
import { z } from "zod";

// Instagram images schemas
const services: ServicesType[] = [
  "tattoo",
  "permanent_makeup",
  "body_piercing",
];
const servicesType = z.enum([services[0], services[1], services[2]]);

export const addInstagramSchema = z.object({
  url: z.string().optional(),
  imageId: z.number(),
  type: servicesType.default("tattoo"),
});

export const updateInstagramSchema = z.object({
  instagramId: z.number(),
  url: z.string().optional(),
  type: servicesType.default("tattoo").optional(),
  imageId: z.number().optional(),
});

export const deleteInstagramSchema = z.object({
  instagramId: z.number(),
});

// artists schemas
export const addArtistSchema = z.object({
  name: z.string().min(3).max(255),
  imageId: z.number().optional(),
  block1ImageId: z.number().optional(),
  block2ImageId: z.number().optional(),
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
  block1ImageId: z.number().nullable().optional(),
  block2ImageId: z.number().nullable().optional(),
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
