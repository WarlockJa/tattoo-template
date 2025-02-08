// CustomServerImage is a server component that fetches data from Images table
// when passed either imageId or name fields
// WARNING because this is a server component it needs to be nested as a children prop
// when used inside of the client components

import { defaultBlurhash, defaultImageName } from "@/appConfig";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { getCachedImageId } from "@/lib/cache/getCachedImageId";
import { getCachedImageName } from "@/lib/cache/getCachedImageName";
import { env } from "@/lib/env.mjs";
import { cn } from "@/lib/utils";
import { SelectImage } from "@cf/db/schemaImage";
import Image from "next/image";

export default async function CustomServerImage({
  imageId,
  dbImageName,
  className,
  priority,
}: {
  imageId?: number | null;
  dbImageName?: string;
  className?: string;
  priority?: boolean;
}) {
  // development environment workaround to access images
  if (process.env.NODE_ENV === "development") {
    return dbImageName ? (
      <Image
        src={`${env.NEXT_PUBLIC_R2_URI}/${dbImageName}`}
        alt={"development"}
        aria-label={"development"}
        placeholder="blur"
        blurDataURL={blurHashToDataURL(defaultBlurhash)}
        width={640}
        height={480}
        className={cn("h-full w-full object-cover", className)}
        sizes="100vw"
        priority={priority}
      />
    ) : (
      <Image
        src={`${env.NEXT_PUBLIC_R2_URI}/${defaultImageName}`}
        alt={"development"}
        aria-label={"development"}
        placeholder="blur"
        blurDataURL={blurHashToDataURL(defaultBlurhash)}
        width={640}
        height={480}
        className={cn("h-full w-full object-cover", className)}
        sizes="100vw"
        priority={priority}
      />
    );
  }

  // fetching image data from the DB
  let image: SelectImage | undefined;
  if (imageId) {
    image = await getCachedImageId(imageId);
  } else if (dbImageName) {
    image = await getCachedImageName(dbImageName);
  }

  // displaying image
  return image ? (
    <Image
      src={`${env.NEXT_PUBLIC_R2_URI}/${image.name}`}
      alt={image.aria}
      aria-label={image.aria}
      placeholder="blur"
      blurDataURL={blurHashToDataURL(image.blurhash ?? defaultBlurhash)}
      width={image.width}
      height={image.height}
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
