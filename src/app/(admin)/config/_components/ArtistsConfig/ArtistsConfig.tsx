"use client";

import { useState } from "react";
import AddArtistForm from "./AddArtistForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeftRight, Plus, UserPen } from "lucide-react";
import ArtistsList from "./ArtistsList";
import { SelectArtist } from "@/../db/schemaArtists";
import { SelectImage } from "@/../db/schemaImage";
import UpdateArtistForm from "./UpdateArtistForm";
import { useTranslations } from "next-intl";

export default function ArtistsConfig({
  artistsData,
  imagesData,
  admin,
}: {
  artistsData: SelectArtist[];
  imagesData: SelectImage[];
  admin?: boolean;
}) {
  const [selectedArtist, setSelectedArtist] = useState<
    SelectArtist | undefined
  >();

  const tArtistForms = useTranslations("ArtistForms");

  return (
    <>
      <Accordion type="single" collapsible defaultValue="item-update">
        {selectedArtist ? (
          <AccordionItem value="item-update">
            <AccordionTrigger className="bg-foreground/10 px-4">
              <span className="flex gap-4">
                <UserPen />
                <span
                  className="bg-foreground/10 flex cursor-pointer items-center gap-1.5 rounded-2xl px-1"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedArtist(undefined);
                  }}
                >
                  <ArrowLeftRight />
                  {tArtistForms("unselect")}
                </span>
              </span>
              {tArtistForms("editing", { name: selectedArtist.name })}
            </AccordionTrigger>
            <AccordionContent className="w-screen max-w-[59.4rem]">
              <UpdateArtistForm
                imagesData={imagesData}
                artist={selectedArtist}
              />
            </AccordionContent>
          </AccordionItem>
        ) : admin ? (
          <AccordionItem value="item-add">
            <AccordionTrigger className="bg-foreground/10 px-4">
              <Plus /> {tArtistForms("click_to_add_new_artist")}
            </AccordionTrigger>
            <AccordionContent className="w-screen max-w-[59.4rem]">
              <AddArtistForm imagesData={imagesData} />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <div className="bg-foreground/10 w-full p-5 text-center text-sm">
            {tArtistForms("select_artist_to_edit")}
          </div>
        )}
      </Accordion>

      <ArtistsList
        artistsData={artistsData}
        imagesData={imagesData}
        setSelectedArtist={setSelectedArtist}
        selectedArtist={selectedArtist}
      />
    </>
  );
}
