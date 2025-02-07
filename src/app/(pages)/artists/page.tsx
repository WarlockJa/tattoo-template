import CustomeHeaderText from "@/components/CustomeHeaderText";
import HomeArtistCard from "@/components/Home/Artists/HomeArtistCard";
import { getCachedArtists } from "@/lib/cache/artists/getCachedArtists";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";

export default async function ArtistsPage() {
  const [artists, tHeaders] = await Promise.all([
    getCachedArtists(),
    getTranslations("Headers"),
  ]);
  return (
    <div className="relative">
      <section className="relative mx-auto flex h-full min-h-[min(1080px,100vh)] max-w-5xl flex-col justify-center py-4">
        <CustomeHeaderText text={tHeaders("featured_artists")} />
        {artists.map((artist) => (
          <HomeArtistCard key={artist.artistId} artist={artist} />
        ))}
      </section>
    </div>
  );
}
