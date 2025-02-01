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
import { SelectArtist } from "@cf/db/schemaArtists";
import { SelectImage } from "@cf/db/schemaImage";
import UpdateArtistForm from "./UpdateArtistForm";

export default function ArtistsConfig({
  artistsData,
  imagesData,
}: {
  artistsData: SelectArtist[];
  imagesData: SelectImage[];
}) {
  const [selectedArtist, setSelectedArtist] = useState<
    SelectArtist | undefined
  >();

  return (
    <>
      <Accordion type="single" collapsible>
        {selectedArtist ? (
          <AccordionItem value="item-update">
            <AccordionTrigger className="bg-foreground/10 px-4">
              {/* TODO translate */}
              <span className="flex gap-4">
                <UserPen />{" "}
                <span
                  className="bg-foreground/10 flex cursor-pointer items-center gap-1.5 rounded-2xl px-1"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedArtist(undefined);
                  }}
                >
                  <ArrowLeftRight />
                  {/* TODO translate */}
                  Unselect
                </span>
              </span>
              {/* TODO translate */}
              Editing {selectedArtist.name}
            </AccordionTrigger>
            <AccordionContent className="w-screen max-w-[59.4rem]">
              <UpdateArtistForm
                imagesData={imagesData}
                artist={selectedArtist}
              />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <AccordionItem value="item-add">
            <AccordionTrigger className="bg-foreground/10 px-4">
              {/* TODO translate */}
              <Plus /> Click to Add a New Artist
            </AccordionTrigger>
            <AccordionContent className="w-screen max-w-[59.4rem]">
              <AddArtistForm imagesData={imagesData} />
            </AccordionContent>
          </AccordionItem>
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
