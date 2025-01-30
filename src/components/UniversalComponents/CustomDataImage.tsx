// CustomDataImage accepts SelectImages data
// can be both client and server

import { defaultBlurhash, defaultImageName } from "@/appConfig";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { env } from "@/lib/env.mjs";
import { cn } from "@/lib/utils";
import { SelectImage } from "@cf/db/schemaImage";
import Image from "next/image";

export default function CustomDataImage({
  dbImage,
  className,
}: {
  dbImage: SelectImage | null;
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
  ) : (
    <Image
      src={`${env.NEXT_PUBLIC_R2_URI}/${defaultImageName}`}
      alt={"default image"}
      aria-label={"default image"}
      placeholder="blur"
      blurDataURL={defaultBlurhash}
      width={1024}
      height={1024}
      className={cn("h-full w-full object-cover", className)}
      sizes="100vw"
    />
  );
}
