"use client";

import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import { useTranslations } from "next-intl";
import { HookActionStatus, useAction } from "next-safe-action/hooks";
import { deleteInstagramAction } from "./_actions/instagrams";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { SelectInstagram } from "@cf/db/schemaInstagram";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function InstagramsList({
  instagramsData,
}: {
  instagramsData: SelectInstagram[];
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
      <h1>Instagram Images</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {instagramsData.map((item) => (
          <InstagramCard
            key={item.instagramId}
            instagram={item}
            execute={execute}
            status={status}
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
}: {
  instagram: SelectInstagram;
  execute: ({ instagramId }: { instagramId: number }) => void;
  status: HookActionStatus;
}) => {
  return (
    <li className="relative grid h-48 grid-cols-2 gap-1.5 overflow-clip rounded-2xl border text-sm shadow">
      <CustomDataImage imageUrl={instagram.url} />

      {/* <Popover>
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
      </Popover> */}

      <Button
        className="absolute top-2 left-12"
        onClick={() => execute({ instagramId: instagram.instagramId })}
        disabled={status === "executing"}
      >
        <Trash2 />
      </Button>
    </li>
  );
};
