import ArtistCard from "@/components/Artists/ArtistCard";
import { getCachedArtistSlug } from "@/lib/cache/artists/getCachedArtistSlug";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ artist_slug: string }>;
}) {
  const { artist_slug } = await params;
  const artistData = await getCachedArtistSlug(artist_slug);

  const artist = artistData.artist;

  return (
    <main className="mx-auto w-full max-w-5xl">
      <ArtistCard artist={artist} />
    </main>
  );
}
