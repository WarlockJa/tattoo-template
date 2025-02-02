import { SelectArtist } from "@cf/db/schemaArtists";
import CustomServerImage from "../UniversalComponents/CustomServerImage";
import Gallery from "../Gallery/Gallery";
import { getCachedImageId } from "@/lib/cache/getCachedImageId";

export default async function ArtistCard({ artist }: { artist: SelectArtist }) {
  const artistGalleryImagesData = await Promise.all([
    artist.imageFeed1ImageId
      ? getCachedImageId(artist.imageFeed1ImageId)
      : null,
    artist.imageFeed2ImageId
      ? getCachedImageId(artist.imageFeed2ImageId)
      : null,
    artist.imageFeed3ImageId
      ? getCachedImageId(artist.imageFeed3ImageId)
      : null,
    artist.imageFeed4ImageId
      ? getCachedImageId(artist.imageFeed4ImageId)
      : null,
    artist.imageFeed5ImageId
      ? getCachedImageId(artist.imageFeed5ImageId)
      : null,
    artist.imageFeed6ImageId
      ? getCachedImageId(artist.imageFeed6ImageId)
      : null,
    artist.imageFeed7ImageId
      ? getCachedImageId(artist.imageFeed7ImageId)
      : null,
    artist.imageFeed8ImageId
      ? getCachedImageId(artist.imageFeed8ImageId)
      : null,
  ]);
  const galleryImages = artistGalleryImagesData.filter((img) => img !== null);

  return (
    <div className="space-y-8">
      <div className="h-[32em]">
        <CustomServerImage imageId={artist.imageId} />
      </div>
      <h1 className="font-kings text-center text-5xl">{artist.name}</h1>
      <h2 className="text-center">{artist.specialty}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>{artist.block1Description}</p>
          <div className="h-[40em]">
            <CustomServerImage imageId={artist.block1ImageId} />
          </div>
        </div>
        <div>
          <div className="h-[40em]">
            <CustomServerImage imageId={artist.block1ImageId} />
          </div>
          <p>{artist.block1Description}</p>
        </div>
      </div>

      <div className="from-background to-background via-foreground h-0.5 w-full bg-linear-90"></div>

      <div className="grid grid-cols-4 gap-4">
        <Gallery images={galleryImages} />
      </div>
    </div>
  );
}
