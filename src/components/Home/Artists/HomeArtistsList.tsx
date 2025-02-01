import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { SelectArtist } from "@cf/db/schemaArtists";
import Link from "next/link";

export default function HomeArtistsList({
  artists,
}: {
  artists: SelectArtist[];
}) {
  return (
    <ul className="flex flex-col">
      {artists.map((artist) => (
        <ArtistCard key={artist.artistId} artist={artist} />
      ))}
    </ul>
  );
}

function ArtistCard({ artist }: { artist: SelectArtist }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{artist.name}</CardTitle>
        <CardDescription>
          {artist.specialty} {artist.block1Description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomServerImage imageId={artist.imageId} />
        <Link href={`/artist/${artist.slug}`}>
          <Button>View More</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
