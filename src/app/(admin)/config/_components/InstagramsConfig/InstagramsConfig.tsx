"use client";

import React, { useState } from "react";
import AddInstagramForm from "./AddInstagramForm";
import InstagramsList from "./InstagramsList";
import { SelectInstagram } from "@cf/db/schemaInstagram";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectImage } from "@cf/db/schemaImage";
import { ArrowLeftRight, Plus, UserPen } from "lucide-react";
import UpdateInstagramForm from "./UpdateInstagramForm";
import { GetCachedInstagrams } from "@/lib/cache/instagram/getCachedInstagramsPage";
import { useTranslations } from "next-intl";

export default function InstagramsConfig({
  instagramsFirstPage,
  imagesData,
  count,
}: {
  instagramsFirstPage: GetCachedInstagrams[];
  imagesData: SelectImage[];
  count: number;
}) {
  const [selectedInstagram, setSelectedInstagram] = useState<
    SelectInstagram | undefined
  >();
  const [instagramsData, setInstagramsData] = useState(instagramsFirstPage);
  const tFeedImagesForms = useTranslations("FeedImagesForms");

  return (
    <>
      <Accordion type="single" collapsible defaultValue="item-update">
        <AccordionItem value="item-update">
          {selectedInstagram ? (
            <AccordionItem value="item-update">
              <AccordionTrigger className="bg-foreground/10 px-4">
                <span className="flex gap-4">
                  <UserPen />
                  <span
                    className="bg-foreground/10 flex cursor-pointer items-center gap-1.5 rounded-2xl px-1"
                    onClick={(e) => {
                      e.stopPropagation();

                      setSelectedInstagram(undefined);
                    }}
                  >
                    <ArrowLeftRight />
                    {tFeedImagesForms("unselect")}
                  </span>
                </span>
                {tFeedImagesForms("editing_feed_image")}
              </AccordionTrigger>
              <AccordionContent className="w-screen max-w-[59.4rem]">
                <UpdateInstagramForm
                  imagesData={imagesData}
                  instagram={selectedInstagram}
                  setSelectedInstagram={setSelectedInstagram}
                  setInstagramsData={setInstagramsData}
                />
              </AccordionContent>
            </AccordionItem>
          ) : (
            <AccordionItem value="item-add">
              <AccordionTrigger className="bg-foreground/10 px-4">
                <Plus /> {tFeedImagesForms("add_new_feed_image")}
              </AccordionTrigger>
              <AccordionContent className="w-screen max-w-[59.4rem]">
                <AddInstagramForm imagesData={imagesData} />
              </AccordionContent>
            </AccordionItem>
          )}
        </AccordionItem>
      </Accordion>

      <InstagramsList
        instagramsData={instagramsData}
        setInstagramsData={setInstagramsData}
        imagesData={imagesData}
        selectedInstagram={selectedInstagram}
        setSelectedInstagram={setSelectedInstagram}
        count={count}
      />
    </>
  );
}
