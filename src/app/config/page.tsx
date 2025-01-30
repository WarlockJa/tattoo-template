import getSession from "@/lib/db/getSession";
import userHasOwnerPriviliges from "@/lib/Rights/userHasOwnerPriviliges";
import { redirect } from "next/navigation";
import ImagePrimitive from "../admin/_components/ImagePrimitive/ImagePrimitive";
import { getCachedImages } from "@/lib/cache/getCachedImages";
import { getCachedUsedR2Storage } from "@/lib/cache/getCachedUsedR2Storage";
import { USER_STORAGE_LIMIT } from "@/appConfig";
import { getCachedProducts } from "@/lib/cache/products/getCachedProdutcts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddProductForm from "./_components/AddProductForm";
import { Button } from "@/components/ui/button";
import ProductsList from "./_components/ProductsList";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";

export default async function ConfigPage() {
  const session = await getSession();
  const user = session?.user;

  const tAdminPage = await getTranslations("AdminPage");

  if (!user || !user.id || !userHasOwnerPriviliges({ role: user.role })) {
    redirect("/");
  }

  // fetching filtered data for the user images, storage quota, and products
  const [imagesData, usedStorageVolume, productsData] = await Promise.all([
    getCachedImages(),
    getCachedUsedR2Storage(),
    getCachedProducts(),
  ]);

  return (
    <main className="mx-auto h-full min-h-screen w-screen max-w-[59.4rem] space-y-4">
      <h2>
        {tAdminPage("storage_volume_used")}{" "}
        {(usedStorageVolume / 1000000).toFixed(2)}/
        {(USER_STORAGE_LIMIT / 1000000).toFixed(2)} MB
      </h2>
      <ImagePrimitive imagesData={imagesData} unrestricted />
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full cursor-pointer">
            {tAdminPage("add_product")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen max-w-[59.4rem]">
          <AddProductForm imagesDate={imagesData} />
        </PopoverContent>
      </Popover>
      <ProductsList imagesData={imagesData} productsData={productsData} />
    </main>
  );
}
