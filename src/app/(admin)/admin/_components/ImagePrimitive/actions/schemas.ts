import { MAX_FILE_SIZE } from "@/appConfig";
import { SelectImage } from "@cf/db/schemaImage";
import { z } from "zod";
import { zfd } from "zod-form-data";

const ACCEPTED_IMAGE_TYPES = ["image/"];

export const imageFileSchema = z.object({
  file: z.any().transform((file, ctx) => {
    if (file?.size === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "unsupported image type",
      });

      return z.NEVER;
    } else {
      // testing for max size
      if (file?.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `max image size is ${Math.floor(MAX_FILE_SIZE / 1000000)}MB`,
        });

        return z.NEVER;
      }
      // testing for image type
      if (!ACCEPTED_IMAGE_TYPES.includes(file?.type.slice(0, 6))) {
        // console.log(file.type);
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "unsupported image type",
        });
        return z.NEVER;
      }

      return file as File;
    }
  }),
  width: z.number().min(0),
  height: z.number().min(0),
});

export type TImageFile = z.infer<typeof imageFileSchema>;

export const createImagesSchema = zfd.formData({
  imageFiles: zfd.repeatableOfType(
    z.any().transform((file, ctx) => {
      if (file?.size === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "unsupported image type",
        });

        return z.NEVER;
      } else {
        // testing for max size
        if (file?.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `max image size is ${Math.floor(MAX_FILE_SIZE / 1000000)}MB`,
          });

          return z.NEVER;
        }
        // testing for image type
        if (!ACCEPTED_IMAGE_TYPES.includes(file?.type.slice(0, 6))) {
          // console.log(file.type);
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "unsupported image type",
          });
          return z.NEVER;
        }

        return file as File;
      }
    }),
  ),
  imageWidths: zfd.repeatableOfType(z.coerce.number().min(0)),
  imageHeigths: zfd.repeatableOfType(z.coerce.number().min(0)),
  restricted: zfd.json(z.boolean().default(true)),
});

export const deleteImageSchema = z.custom<Pick<SelectImage, "imageId">>();
