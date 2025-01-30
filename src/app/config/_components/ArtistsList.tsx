"use client";

import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import { useTranslations } from "next-intl";
import { HookActionStatus, useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { deleteArtistAction } from "./_actions/artists";
import { SelectArtist } from "@cf/db/schemaArtists";
import { SelectImage } from "@cf/db/schemaImage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpdateArtistForm from "./UpdateArtistForm";
import { DeleteButton } from "@/components/UniversalComponents/DeleteButton";

export default function ArtistsList({
  artistData,
  imagesData,
}: {
  artistData: SelectArtist[];
  imagesData: SelectImage[];
}) {
  const tErrors = useTranslations("Errors");
  const { execute, status } = useAction(deleteArtistAction, {
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
      <h2>Artists</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {artistData.map((item) => (
          <ArtistCard
            key={item.artistId}
            artist={item}
            execute={execute}
            status={status}
            imagesData={imagesData}
          />
        ))}
      </ul>
    </>
  );
}

const ArtistCard = ({
  artist,
  execute,
  status,
  imagesData,
}: {
  artist: SelectArtist;
  execute: ({ artistId }: { artistId: number }) => void;
  status: HookActionStatus;
  imagesData: SelectImage[];
}) => {
  return (
    <li className="relative grid h-48 grid-cols-2 gap-1.5 overflow-clip rounded-2xl border text-sm shadow">
      <CustomDataImage
        dbImage={imagesData.find((img) => img.imageId === artist.imageId)}
      />

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
          <UpdateArtistForm imagesData={imagesData} artist={artist} />
        </PopoverContent>
      </Popover>

      <DeleteButton
        // TODO translate
        title={`Deleting product: ${artist.name}`}
        className="absolute top-2 left-12"
        description={`This will delete artist ${artist.name}. This action cannot be reversed. Are you sure?`}
        execute={() => execute({ artistId: artist.artistId })}
        isDisabled={status === "executing"}
        isLoading={status === "executing"}
      />
    </li>
  );
};
