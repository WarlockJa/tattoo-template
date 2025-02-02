import { Button } from "@/components/ui/button";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { SelectArtist } from "@cf/db/schemaArtists";
import Link from "next/link";

export default function HomeArtistCard({ artist }: { artist: SelectArtist }) {
  return (
    <div className="grid gap-6 overflow-hidden p-1 md:grid-cols-2 md:p-6">
      <div className="artist-frame-clip-outer relative h-[36em]">
        <div className="bg-background absolute inset-0 bg-blend-color-dodge blur-3xl"></div>
        <div className="artist-frame-clip-inner h-full w-full">
          <CustomServerImage imageId={artist.imageId} />
          {/* <CustomServerImage dbImageName="hsa1ds7iunfezm3tpdd862v9-image_fx_(1).jpg" /> */}
          {/* <CustomServerImage dbImageName="fje99bg56pv5ikuxhtvwgxdh-image_fx_.jpg" /> */}
          <Link href={`/artist/${artist.slug}`} className="">
            <Button
              variant={"outline"}
              className="font-kings absolute right-9 bottom-2 cursor-pointer rounded-br-3xl px-8 py-5 text-2xl"
            >
              View More
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-kings text-4xl">{artist.name}</h3>
        <div className="hide-scrollbar h-[26em] space-y-4 overflow-y-scroll px-4 text-xl">
          <p>{artist.specialty}</p>
          <p className="hidden md:block">{artist.block1Description}</p>
        </div>
      </div>
    </div>
  );
}
