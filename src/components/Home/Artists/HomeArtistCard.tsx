import { Button } from "@/components/ui/button";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { SelectArtist } from "@cf/db/schemaArtists";
import Link from "next/link";

export default function HomeArtistCard({ artist }: { artist: SelectArtist }) {
  return (
    <div className="grid gap-6 overflow-hidden p-1 md:grid-cols-2 md:p-6">
      <div className="shadow-foreground relative h-[36em] rounded-br-3xl shadow">
        <CustomServerImage imageId={artist.imageId} />
        <Link href={`/artist/${artist.slug}`} className="">
          <Button
            variant={"outline"}
            className="font-kings absolute right-1 bottom-1 cursor-pointer rounded-br-3xl px-8 py-5 text-2xl"
          >
            View More
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        <h3 className="font-kings text-4xl">{artist.name}</h3>
        <div className="h-[26em] space-y-4 overflow-y-scroll px-4 text-xl">
          <p>{artist.specialty}</p>
          <p className="hidden md:block">{artist.block1Description}</p>
        </div>
      </div>
    </div>
  );
}
