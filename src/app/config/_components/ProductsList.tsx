"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import { SelectImage } from "@cf/db/schemaImage";
import { SelectProduct } from "@cf/db/schemaProduct";
import { Edit } from "lucide-react";
import UpdateProductForm from "./UpdateProductForm";
import { DeleteButton } from "@/components/UniversalComponents/DeleteButton";
import { useTranslations } from "next-intl";
import { HookActionStatus, useAction } from "next-safe-action/hooks";
import { deleteProductAction } from "./_actions/product";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { Button } from "@/components/ui/button";

export default function ProductsList({
  productsData,
  imagesData,
}: {
  productsData: SelectProduct[];
  imagesData: SelectImage[];
}) {
  const tErrors = useTranslations("Errors");
  const { execute, status } = useAction(deleteProductAction, {
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(tErrors("rate_limit_title"), {
          description: tErrors("rate_limit_description"),
        });

        return;
      }

      if (error.serverError === "UnauthorisedAccess") {
        toast(tErrors("insufficient_rights_title"), {
          description: tErrors("insufficient_rights_general_description"),
        });

        return;
      }

      if (error.serverError) {
        toast(
          <SonnerErrorCard
            title={tErrors("general_error_title")}
            errors={error.serverError}
          />,
        );

        return;
      }

      toast(
        <SonnerErrorCard
          title={tErrors("general_error_title")}
          errors={JSON.stringify(error)}
        />,
      );
    },
  });

  return (
    <>
      {/* TODO translate */}
      <h1>Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {productsData.map((item) => (
          <ProductCard
            key={item.productId}
            image={imagesData.find((img) => img.imageId === item.imageId)}
            product={item}
            imagesData={imagesData}
            execute={execute}
            status={status}
          />
        ))}
      </ul>
    </>
  );
}

const ProductCard = ({
  image,
  product,
  imagesData,
  execute,
  status,
}: {
  product: SelectProduct;
  image: SelectImage | undefined;
  imagesData: SelectImage[];
  execute: ({ productId }: { productId: number }) => void;
  status: HookActionStatus;
}) => {
  return (
    <li className="relative grid h-48 grid-cols-2 gap-1.5 overflow-clip rounded-2xl border text-sm shadow">
      <CustomDataImage dbImage={image ?? null} />
      <div className="space-y-1">
        <h2>{product.name}</h2>
        <p className="line-clamp-2 text-ellipsis">{product.description}</p>
        {/* TODO translate */}
        <p>Price: {product.price}₺</p>
        {/* TODO translate */}
        <p>Special: {product.special ? "YES" : "NO"}</p>
      </div>

      <Popover>
        <PopoverTrigger
          className="absolute top-2 left-2 cursor-pointer"
          asChild
        >
          <Button size={"icon"}>
            <Edit />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen max-w-[59.4rem]">
          <UpdateProductForm imagesDate={imagesData} product={product} />
        </PopoverContent>
      </Popover>

      <DeleteButton
        // TODO translate
        title={`Deleting product: ${product.name}`}
        className="absolute top-2 left-12"
        description={`This will delete product ${product.name}. This action cannot be reversed. Are you sure?`}
        execute={() => execute({ productId: product.productId })}
        isDisabled={status === "executing"}
        isLoading={status === "executing"}
      />
    </li>
  );
};
