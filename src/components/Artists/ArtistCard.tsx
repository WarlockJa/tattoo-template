import { SelectArtist } from "@cf/db/schemaArtists";
import CustomServerImage from "../UniversalComponents/CustomServerImage";
import Gallery from "../Gallery/Gallery";
import { getCachedImageId } from "@/lib/cache/getCachedImageId";
import { getTranslations } from "next-intl/server";
import { ArtistTranslations } from "@/types/next-intl";

export default async function ArtistCard({ artist }: { artist: SelectArtist }) {
  const tArtist = await getTranslations(
    `Artist.${artist.artistId.toString() as ArtistTranslations}`,
  );

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
      <div className="artist-frame-clip relative mx-auto h-[32em] max-w-96 p-4">
        <div className="bg-background absolute inset-0 bg-blend-color-dodge blur-3xl"></div>
        <div className="artist-frame-clip h-full">
          <CustomServerImage imageId={artist.imageId} />
          {/* TODO delete */}
          {/* <CustomServerImage dbImageName="ol94niex1utr1wwac38b35kr-artist1.png" /> */}
        </div>
      </div>

      <h1 className="font-kings text-center text-5xl">{artist.name}</h1>
      <h2 className="text-center">{tArtist("specialty")}</h2>
      <div className="grid gap-4 p-1 md:grid-cols-2">
        <div>
          <p>{tArtist("block1")}</p>
          <div className="h-[40em]">
            <CustomServerImage imageId={artist.block1ImageId} />
            {/* TODO delete */}
            {/* <CustomServerImage dbImageName="hsy5aqhs1xlzx4say0c6ltw2-artist1-main1.png" /> */}
          </div>
        </div>
        <div>
          <div className="h-[40em]">
            <CustomServerImage imageId={artist.block2ImageId} />
            {/* TODO delete */}
            {/* <CustomServerImage dbImageName="kagtcaadl9n0fpdauv9ikhgu-artist1-main2.png" /> */}
          </div>
          <p>{tArtist("block2")}</p>
        </div>
      </div>

      <div className="from-background to-background via-foreground h-0.5 w-full bg-linear-90"></div>

      <div className="grid gap-4 p-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Gallery images={galleryImages} />
      </div>

      {/* TODO translate */}
      <h4 className="text-center">
        Got a design idea to run by our artists? Or any other questions? We will
        be more than happy to assist you, and all consultations are free.
      </h4>
    </div>
  );
}
