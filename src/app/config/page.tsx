import getSession from "@/lib/db/getSession";
import userHasOwnerPriviliges from "@/lib/Rights/userHasOwnerPriviliges";
import { redirect } from "next/navigation";
import ImagePrimitive from "../admin/_components/ImagePrimitive/ImagePrimitive";
import { getCachedImages } from "@/lib/cache/getCachedImages";
import { getCachedUsedR2Storage } from "@/lib/cache/getCachedUsedR2Storage";
import { USER_STORAGE_LIMIT } from "@/appConfig";
import { getTranslations } from "next-intl/server";
import { getCachedInstagrams } from "@/lib/cache/instagram/getCachedInstagrams";
import InstagramsList from "./_components/InstagramsList";
import { getCachedArtists } from "@/lib/cache/artists/getCachedArtists";
import AddArtistForm from "./_components/AddArtistForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import ArtistsList from "./_components/ArtistsList";

export const runtime = "edge";

export default async function ConfigPage() {
  const session = await getSession();
  const user = session?.user;

  const tAdminPage = await getTranslations("AdminPage");

  if (!user || !user.id || !userHasOwnerPriviliges({ role: user.role })) {
    redirect("/");
  }

  // fetching filtered data for the user images, storage quota, and products
  const [imagesData, usedStorageVolume, artistsData, instagramsData] =
    await Promise.all([
      getCachedImages(),
      getCachedUsedR2Storage(),
      getCachedArtists(),
      getCachedInstagrams(),
    ]);

  return (
    <main className="mx-auto h-full min-h-screen w-screen max-w-[59.4rem] space-y-4">
      <h2>
        {tAdminPage("storage_volume_used")}{" "}
        {(usedStorageVolume / 1000000).toFixed(2)}/
        {(USER_STORAGE_LIMIT / 1000000).toFixed(2)} MB
      </h2>
      <ImagePrimitive imagesData={imagesData} unrestricted />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-foreground/10 px-4">
            <Plus /> Click to Add a New Artist
          </AccordionTrigger>
          <AccordionContent className="w-screen max-w-[59.4rem]">
            <AddArtistForm imagesData={imagesData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ArtistsList artistData={artistsData} imagesData={imagesData} />

      <InstagramsList instagramsData={instagramsData} />
    </main>
  );
}
