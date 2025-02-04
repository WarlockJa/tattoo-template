"use client";

import { brandIG } from "@/appConfig";
import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import { GetCachedInstagrams } from "@/lib/cache/instagram/getCachedInstagramsPage";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useState } from "react";
import { loadHomeGalleryPageAction } from "./actions/homegallery";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import { PAGINATION_LIMIT } from "@/lib/cache/instagram/paginationConsts";
import { Button } from "@/components/ui/button";

export default function HomeGalleryClient({
  firstPage,
  count,
}: {
  firstPage: GetCachedInstagrams[];
  count: number;
}) {
  const tErrors = useTranslations("Errors");
  const [instagrams, setInstagrams] =
    useState<GetCachedInstagrams[]>(firstPage);
  const [page, setPage] = useState<number | null>(1);

  const { execute, status } = useAction(loadHomeGalleryPageAction, {
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
        setInstagrams((prev) => [...prev, ...data]);
        (input.page + 1) * PAGINATION_LIMIT >= count
          ? setPage(null)
          : setPage(input.page !== null ? input.page + 1 : null);
      } else {
        setPage(null);
      }
    },
  });

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {instagrams.map((img) => (
          <Link
            key={img.instagramId}
            type="button"
            href={img.url ?? brandIG}
            className="aspect-video w-full cursor-pointer border-2 p-0 contrast-100 transition-all hover:scale-105 hover:shadow-xl hover:contrast-125"
          >
            <CustomDataImage dbImage={img.image} />
          </Link>
        ))}
      </div>

      <div className="xsm:flex-row flex flex-col items-center justify-center gap-2 p-4">
        {page !== null && (
          <LoaderButton
            isDisabled={status === "executing"}
            variant={"ghost"}
            className="font-kings cursor-pointer px-8 py-5 text-2xl"
            onClick={() => execute({ page })}
          >
            {/* TODO translate */}
            Load More
          </LoaderButton>
        )}

        <Link href={brandIG} className="group">
          <Button
            className="font-kings cursor-pointer px-8 py-5 text-2xl [&_svg]:size-8"
            variant={"ghost"}
          >
            <InstagramIcon className="fill-foreground group-hover:fill-background transition-colors" />{" "}
            Visit Instagram
          </Button>
        </Link>
      </div>
    </div>
  );
}
