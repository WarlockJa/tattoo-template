"use client";

import { useTranslations } from "next-intl";
import { HookActionStatus, useAction } from "next-safe-action/hooks";
import { deleteInstagramAction } from "../_actions/instagrams";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { SelectInstagram } from "@cf/db/schemaInstagram";
import { Button } from "@/components/ui/button";
import { ImageDown, Trash2 } from "lucide-react";
import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import { SelectImage } from "@cf/db/schemaImage";
import { cn } from "@/lib/utils";
import { Dispatch, useEffect, useState } from "react";
import { GetCachedInstagrams } from "@/lib/cache/instagram/getCachedInstagramsPage";
import { loadHomeGalleryPageAction } from "@/components/Home/Gallery/actions/homegallery";
import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";
import { PAGINATION_LIMIT } from "@/lib/cache/instagram/paginationConsts";

export default function InstagramsList({
  imagesData,
  selectedInstagram,
  setSelectedInstagram,
  count,
  instagramsData,
  setInstagramsData,
}: {
  imagesData: SelectImage[];
  selectedInstagram: SelectInstagram | undefined;
  setSelectedInstagram: Dispatch<
    React.SetStateAction<SelectInstagram | undefined>
  >;
  count: number;
  instagramsData: GetCachedInstagrams[];
  setInstagramsData: Dispatch<React.SetStateAction<GetCachedInstagrams[]>>;
}) {
  const tErrors = useTranslations("Errors");
  const tFeedImagesForms = useTranslations("FeedImagesForms");

  const [page, setPage] = useState<number | null>(1);

  useEffect(() => {}, []);

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

    onSuccess({ data, input }) {
      if (data) {
        setInstagramsData((prev) =>
          prev.filter((img) => img.instagramId !== input.instagramId),
        );
        setSelectedInstagram((prev) =>
          prev?.instagramId === input.instagramId ? undefined : prev,
        );
      }
    },
  });

  // page loading action
  const { execute: executePage, status: statusPage } = useAction(
    loadHomeGalleryPageAction,
    {
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

      onSuccess({ data, input }) {
        if (data) {
          setInstagramsData((prev) => [...prev, ...data]);
          setPage(
            input.page !== null && (input.page + 1) * PAGINATION_LIMIT < count
              ? input.page + 1
              : null,
          );
        } else {
          setPage(null);
        }
      },
    },
  );

  return (
    <>
      <h1>{tFeedImagesForms("feed_images")}</h1>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {instagramsData.map((item) => (
          <InstagramCard
            key={item.instagramId}
            executeDelete={() => execute({ instagramId: item.instagramId })}
            status={status}
            dbImage={imagesData.find(
              (img) => img.imageId === item.image.imageId,
            )}
            callback={() =>
              selectedInstagram &&
              selectedInstagram?.instagramId === item.instagramId
                ? setSelectedInstagram(undefined)
                : setSelectedInstagram({
                    imageId: item.image.imageId,
                    instagramId: item.instagramId,
                    url: item.url,
                    type: item.type,
                  })
            }
            selected={selectedInstagram?.instagramId === item.instagramId}
          />
        ))}
      </ul>
      {page !== null && (
        <LoaderButton
          isDisabled={statusPage === "executing"}
          variant={"outline"}
          className="flex-1.5 flex w-full cursor-pointer items-center"
          onClick={() => executePage({ page })}
        >
          <ImageDown /> {tFeedImagesForms("load_more")}
        </LoaderButton>
      )}
    </>
  );
}

const InstagramCard = ({
  executeDelete,
  status,
  dbImage,
  callback,
  selected,
}: {
  executeDelete: () => void;
  status: HookActionStatus;
  dbImage: SelectImage | undefined;
  callback: () => void;
  selected?: boolean;
}) => {
  return (
    <li
      className={cn(
        "relative h-48 cursor-pointer overflow-clip rounded-2xl border text-sm shadow",
        selected && "outline-accent outline",
      )}
      onClick={callback}
    >
      <CustomDataImage dbImage={dbImage} />

      <Button
        className="absolute right-2 bottom-2 cursor-pointer"
        size={"icon"}
        variant={"destructive"}
        onClick={(e) => {
          e.stopPropagation();
          executeDelete();
        }}
        disabled={status === "executing"}
      >
        <Trash2 />
      </Button>
    </li>
  );
};
