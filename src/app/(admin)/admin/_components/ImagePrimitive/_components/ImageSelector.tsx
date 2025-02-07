"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useTranslations } from "next-intl";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { deleteImageAction } from "../actions/image";
import { SelectImage } from "@cf/db/schemaImage";
import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";

export default function ImageSelector({
  imagesData,
  unrestricted,
  selectImage,
  selectedImage,
  allowDelete,
}: {
  imagesData: SelectImage[];
  unrestricted?: boolean;
  selectedImage?: number | null;
  selectImage?: (image: SelectImage) => void;
  allowDelete?: boolean;
}) {
  const tErrors = useTranslations("Errors");
  const { execute, status } = useAction(deleteImageAction, {
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
    <div className="relative h-52 w-full overflow-y-scroll border md:max-w-lg">
      <ul className="flex flex-wrap gap-1">
        {imagesData.map((img) => (
          <li
            key={img.imageId}
            onClick={() => selectImage && selectImage(img)}
            className="hover:border-secondary-foreground relative aspect-video w-[8.5rem] cursor-pointer rounded border-1 shadow-sm transition-all hover:shadow-lg"
            style={
              // stored value is a image name without resoltuion prefix
              // comparing values using slice
              selectedImage === img.imageId
                ? {
                    borderColor: "lightgreen",
                    borderWidth: "0.25rem",
                    marginBottom: "0",
                  }
                : undefined
            }
          >
            {!unrestricted && (
              <Button
                onClick={() => navigator.clipboard.writeText(img.name)}
                type="button"
                variant={"ghost"}
                className="absolute top-0 left-0 z-10"
                size={"icon"}
              >
                <Copy />
              </Button>
            )}
            {allowDelete && (
              <Button
                type="button"
                variant={"ghost"}
                className="absolute top-0 right-0 z-10"
                size={"icon"}
                disabled={status === "executing"}
                onClick={(e) => {
                  e.stopPropagation();
                  execute({ imageId: img.imageId });
                }}
              >
                <X className="text-destructive" />
              </Button>
            )}
            <CustomDataImage dbImage={img} className="object-contain" />
          </li>
        ))}
      </ul>
    </div>
  );
}
