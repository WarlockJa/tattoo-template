import type { Metadata } from "next";
import { env } from "@/lib/env.mjs";
import {
  brandMetadataImage,
  brandMetadataTwitterAccount,
  brandName,
  defaultMetadata,
} from "@/appConfig";
import { getFileExtension } from "@/lib/getFileExtension";
import { getCachedArtistSlug } from "@/lib/cache/artists/getCachedArtistSlug";
import { getTranslations } from "next-intl/server";
import { ArtistTranslations } from "@/types/next-intl";

export async function generateMetadata(
  // { params, searchParams }: Props,
  { params }: { params: Promise<{ artist_slug: string }> },
): Promise<Metadata> {
  const { artist_slug } = await params;
  // fetching cached blog data
  const artistData = await getCachedArtistSlug(artist_slug);

  // reading translated artist specialization
  const tArtist = await getTranslations(
    `Artist.${artistData.artist.artistId.toString() as ArtistTranslations}`,
  );

  if (!artistData || !artistData.artist) return defaultMetadata;

  return {
    title: `${artistData.artist.name} ${brandName}`,
    description: tArtist("specialty"),
    openGraph: {
      title: `${artistData.artist.name} ${brandName}`,
      description: tArtist("specialty"),
      images: [
        artistData.image
          ? {
              url: `${env.NEXT_PUBLIC_R2_URI}/${artistData.image.name}`,
              width: artistData.image.width,
              height: artistData.image.height,
              alt: artistData.image.aria,
              type: getFileExtension(artistData.image.name),
            }
          : brandMetadataImage,
      ],
      type: "website",
      url: `${env.NEXT_PUBLIC_URI}/artists/${artist_slug}`,
    },
    twitter: {
      card: "summary_large_image",
      site: brandMetadataTwitterAccount,
      creator: brandMetadataTwitterAccount,
    },
  };
}

export default async function artistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ artist_slug: string }>;
}>) {
  return <>{children}</>;
}
