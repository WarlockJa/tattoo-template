"use client";

import { useTranslations } from "next-intl";
import { HookActionStatus, useAction } from "next-safe-action/hooks";
import { deleteInstagramAction } from "../_actions/instagrams";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { SelectInstagram } from "@cf/db/schemaInstagram";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import { SelectImage } from "@cf/db/schemaImage";
import { cn } from "@/lib/utils";

export default function InstagramsList({
  instagramsData,
  imagesData,
  selectedInstagram,
  setSelectedInstagram,
}: {
  instagramsData: SelectInstagram[];
  imagesData: SelectImage[];
  selectedInstagram: SelectInstagram | undefined;
  setSelectedInstagram: (instagramData: SelectInstagram | undefined) => void;
}) {
  const tErrors = useTranslations("Errors");
  const { execute, status } = useAction(deleteInstagramAction, {
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
      <h1>Feed Images</h1>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {instagramsData.map((item) => (
          <InstagramCard
            key={item.instagramId}
            instagram={item}
            execute={execute}
            status={status}
            dbImage={imagesData.find((img) => img.imageId === item.imageId)}
            callback={() =>
              selectedInstagram && selectedInstagram?.imageId === item.imageId
                ? setSelectedInstagram(undefined)
                : setSelectedInstagram(item)
            }
            selected={selectedInstagram?.imageId === item.imageId}
          />
        ))}
      </ul>
    </>
  );
}

const InstagramCard = ({
  instagram,
  execute,
  status,
  dbImage,
  callback,
  selected,
}: {
  instagram: SelectInstagram;
  execute: ({ instagramId }: { instagramId: number }) => void;
  status: HookActionStatus;
  dbImage: SelectImage | undefined;
  callback: () => void;
  selected?: boolean;
}) => {
  return (
    <li
      className={cn(
        "relative grid h-48 cursor-pointer grid-cols-2 gap-1.5 overflow-clip rounded-2xl border text-sm shadow",
        selected && "outline-accent outline",
      )}
      onClick={callback}
    >
      <p>{instagram.url}</p>

      <CustomDataImage dbImage={dbImage} />

      <Button
        className="absolute right-2 bottom-2"
        size={"icon"}
        variant={"destructive"}
        onClick={() => execute({ instagramId: instagram.instagramId })}
        disabled={status === "executing"}
      >
        <Trash2 />
      </Button>
    </li>
  );
};
