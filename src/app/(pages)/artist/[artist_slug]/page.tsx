import ArtistCard from "@/components/Artist/ArtistCard";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { getCachedArtistSlug } from "@/lib/cache/artists/getCachedArtistSlug";

export const runtime = "edge";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ artist_slug: string }>;
}) {
  const { artist_slug } = await params;
  const artistData = await getCachedArtistSlug(artist_slug);

  const artist = artistData.artist;

  return (
    <>
      {/* Background Image relative to body */}
      <div className="absolute inset-0 -z-10">
        <CustomServerImage
          dbImageName="wxj6qt7h4f2w69wjwkk2kre6-bg-ocean.webp"
          className="opacity-10"
        />
      </div>
      <main className="mx-auto w-full max-w-5xl">
        <ArtistCard artist={artist} />
      </main>
    </>
  );
}
