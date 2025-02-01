import ArtistCard from "@/components/Artist/ArtistCard";
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
    <div>
      <ArtistCard artist={artist} />
    </div>
  );
}
