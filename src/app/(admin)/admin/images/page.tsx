import { getCachedAllImages } from "@/lib/cache/getCachedAllImages";
import ImagePrimitive from "../_components/ImagePrimitive/ImagePrimitive";

export default async function AdminAddServicePage() {
  const imagesData = await getCachedAllImages();

  return <ImagePrimitive imagesData={imagesData} />;
}
