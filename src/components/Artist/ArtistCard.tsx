import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectArtist } from "@cf/db/schemaArtists";
import CustomServerImage from "../UniversalComponents/CustomServerImage";

export default function ArtistCard({ artist }: { artist: SelectArtist }) {
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
      </CardContent>
    </Card>
  );
}
