import getSession from "@/lib/db/getSession";
import userHasOwnerPriviliges from "@/lib/Rights/userHasOwnerPriviliges";
import { redirect } from "next/navigation";
import ImagePrimitive from "../admin/_components/ImagePrimitive/ImagePrimitive";
import { getCachedImages } from "@/lib/cache/getCachedImages";
import { getCachedUsedR2Storage } from "@/lib/cache/getCachedUsedR2Storage";
import { USER_STORAGE_LIMIT } from "@/appConfig";
import { getTranslations } from "next-intl/server";
import { getCachedArtists } from "@/lib/cache/artists/getCachedArtists";
import ArtistsConfig from "./_components/ArtistsConfig/ArtistsConfig";
import InstagramsConfig from "./_components/InstagramsConfig/InstagramsConfig";
import { getCachedInstagramsPage } from "@/lib/cache/instagram/getCachedInstagramsPage";
import { getCachedInstagramsCount } from "@/lib/cache/instagram/getCachedInstagramsCount";
import userHasAdminPriviliges from "@/lib/Rights/userHasAdminPriviliges";

export const runtime = "edge";

export default async function ConfigPage() {
  const session = await getSession();
  const user = session?.user;

  const tAdminPage = await getTranslations("AdminPage");

  if (!user || !user.id || !userHasOwnerPriviliges({ role: user.role })) {
    redirect("/");
  }

  // fetching filtered data for the user images, storage quota, and products
  const [
    imagesData,
    usedStorageVolume,
    artistsData,
    instagramsFirstPage,
    count,
  ] = await Promise.all([
    getCachedImages(),
    getCachedUsedR2Storage(),
    getCachedArtists(),
    getCachedInstagramsPage(0),
    getCachedInstagramsCount(),
  ]);

  return (
    <main className="mx-auto h-full min-h-screen w-screen max-w-[59.4rem] space-y-4">
      <h2>
        {tAdminPage("storage_volume_used")}{" "}
        {(usedStorageVolume / 1000000).toFixed(2)}/
        {(USER_STORAGE_LIMIT / 1000000).toFixed(2)} MB
      </h2>
      <ImagePrimitive imagesData={imagesData} unrestricted />

      <InstagramsConfig
        instagramsFirstPage={instagramsFirstPage}
        imagesData={imagesData}
        count={count}
      />

      <ArtistsConfig
        artistsData={artistsData}
        imagesData={imagesData}
        admin={userHasAdminPriviliges({ role: user.role })}
      />
    </main>
  );
}
