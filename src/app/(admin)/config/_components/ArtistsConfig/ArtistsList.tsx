"use client";

import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import { useTranslations } from "next-intl";
import { HookActionStatus, useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { deleteArtistAction } from "../_actions/artists";
import { SelectArtist } from "@/../db/schemaArtists";
import { SelectImage } from "@/../db/schemaImage";
import { DeleteButton } from "@/components/UniversalComponents/DeleteButton";
import { cn } from "@/lib/utils";

export default function ArtistsList({
  artistsData,
  imagesData,
  selectedArtist,
  setSelectedArtist,
}: {
  artistsData: SelectArtist[];
  imagesData: SelectImage[];
  selectedArtist: SelectArtist | undefined;
  setSelectedArtist: (artistData: SelectArtist | undefined) => void;
}) {
  const tErrors = useTranslations("Errors");
  const tArtistForms = useTranslations("ArtistForms");
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
      <h2>{tArtistForms("artists")}</h2>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {artistsData.map((item) => (
          <ArtistCard
            key={item.artistId}
            artist={item}
            execute={execute}
            status={status}
            imagesData={imagesData}
            callback={() =>
              selectedArtist && selectedArtist?.artistId === item.artistId
                ? setSelectedArtist(undefined)
                : setSelectedArtist(item)
            }
            selected={selectedArtist?.artistId === item.artistId}
            tArtistForms={tArtistForms}
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
  callback,
  selected,
  tArtistForms,
}: {
  artist: SelectArtist;
  execute: ({ artistId }: { artistId: number }) => void;
  status: HookActionStatus;
  imagesData: SelectImage[];
  callback: () => void;
  selected?: boolean;
  tArtistForms: (text: string, { name }: { name: string }) => string;
}) => {
  // const tArtistForms = useTranslations("ArtistForms");
  return (
    <li
      className={cn(
        "relative grid h-96 cursor-pointer overflow-clip rounded-2xl border text-sm shadow",
        selected && "outline-accent outline",
      )}
      onClick={callback}
    >
      <CustomDataImage
        dbImage={imagesData.find((img) => img.imageId === artist.imageId)}
      />

      <DeleteButton
        title={tArtistForms("deleting_artist", { name: artist.name })}
        className="absolute right-2 bottom-2 cursor-pointer"
        description={tArtistForms("deleting_artist_warning", {
          name: artist.name,
        })}
        execute={() => execute({ artistId: artist.artistId })}
        isDisabled={status === "executing"}
        isLoading={status === "executing"}
      />
    </li>
  );
};
