import ImagePrimitive from "@/app/admin/_components/ImagePrimitive/ImagePrimitive";
import { getCachedAllImages } from "@/lib/cache/getCachedAllImages";

export const runtime = "edge";

export default async function AdminAddServicePage() {
  const imagesData = await getCachedAllImages();

  return <ImagePrimitive imagesData={imagesData} />;
}
