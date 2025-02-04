import { getCachedInstagramsCount } from "@/lib/cache/instagram/getCachedInstagramsCount";
import { getCachedInstagramsPage } from "@/lib/cache/instagram/getCachedInstagramsPage";
import HomeGalleryClient from "./HomeGalleryClient";

export default async function HomeGallery() {
  const firstPage = await getCachedInstagramsPage(0);
  const count = await getCachedInstagramsCount();

  return <HomeGalleryClient firstPage={firstPage} count={count} />;
}
