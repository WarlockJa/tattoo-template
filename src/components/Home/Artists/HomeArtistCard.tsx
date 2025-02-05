import { Button } from "@/components/ui/button";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { ArtistTranslations } from "@/types/next-intl";
import { SelectArtist } from "@cf/db/schemaArtists";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HomeArtistCard({
  artist,
}: {
  artist: SelectArtist;
}) {
  const tArtist = await getTranslations(
    `Artist.${artist.artistId.toString() as ArtistTranslations}`,
  );
  return (
    <div className="grid overflow-hidden p-1 md:grid-cols-2 md:p-6">
      <div className="artist-frame-clip relative h-[36em] p-4">
        <div className="bg-background absolute inset-0 bg-blend-color-dodge blur-3xl"></div>
        <div className="artist-frame-clip h-full">
          <CustomServerImage imageId={artist.imageId} />
          {/* TODO delete */}
          {/* <CustomServerImage dbImageName="ol94niex1utr1wwac38b35kr-artist1.png" /> */}
          {/* <CustomServerImage dbImageName="bgavyq0tlsmu01eys7g8yj9d-artist2.png" /> */}
          <Link href={`/artists/${artist.slug}`} className="">
            <Button
              variant={"outline"}
              className="font-kings xsm:right-16 absolute right-8 bottom-3 cursor-pointer rounded-br-3xl px-8 py-5 text-2xl md:right-8 lg:right-16"
            >
              View More
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <AnimatedComponent delayS={0.1}>
          {/* <h3 className="font-kings text-4xl">{artist.name}</h3> */}
          <h3 className="font-kings text-4xl">{artist.name}</h3>
        </AnimatedComponent>
        <AnimatedComponent delayS={0.2}>
          <div className="hide-scrollbar space-y-4 overflow-y-scroll px-4 text-xl md:h-[26em]">
            <p>{tArtist("specialty")}</p>
            <p className="hidden md:block">{tArtist("block1")}</p>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
}
