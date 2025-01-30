// CustomDataImage accepts SelectImages data
// can be both client and server

import {
  defaultBlurhash,
  defaultImageHeight,
  defaultImageName,
  defaultImageWidth,
} from "@/appConfig";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { env } from "@/lib/env.mjs";
import { cn } from "@/lib/utils";
import { SelectImage } from "@cf/db/schemaImage";
import Image from "next/image";

export default function CustomDataImage({
  dbImage,
  className,
  imageUrl,
}: {
  dbImage?: SelectImage | null;
  imageUrl?: string;
  className?: string;
}) {
  // displaying image
  return dbImage ? (
    <Image
      src={`${env.NEXT_PUBLIC_R2_URI}/${dbImage.name}`}
      // TODO add translation to alt and aria
      alt={dbImage.aria}
      aria-label={dbImage.aria}
      placeholder="blur"
      blurDataURL={blurHashToDataURL(dbImage.blurhash ?? defaultBlurhash)}
      width={dbImage.width}
      height={dbImage.height}
      className={cn("h-full w-full object-cover", className)}
      sizes="100vw"
    />
  ) : imageUrl ? (
    <Image
      src={imageUrl}
      alt={"remote image"}
      aria-label={"remote image"}
      placeholder="blur"
      blurDataURL={defaultBlurhash}
      width={1024}
      height={1024}
      className={cn("h-full w-full object-cover", className)}
      sizes="100vw"
    />
  ) : (
    <Image
      src={`${env.NEXT_PUBLIC_R2_URI}/${defaultImageName}`}
      alt={"default image"}
      aria-label={"default image"}
      placeholder="blur"
      blurDataURL={defaultBlurhash}
      width={defaultImageWidth}
      height={defaultImageHeight}
      className={cn("h-full w-full object-cover", className)}
      sizes="100vw"
    />
  );
}
