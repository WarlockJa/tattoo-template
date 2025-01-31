import React from "react";
import AddInstagramForm from "./AddInstagramForm";
import InstagramsList from "./InstagramsList";
import { SelectInstagram } from "@cf/db/schemaInstagram";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function InstagramsConfig({
  instagramsData,
}: {
  instagramsData: SelectInstagram[];
}) {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-update">
          <AccordionTrigger className="bg-foreground/10 px-4">
            {/* TODO translate */}
            Add New Instagram Media
          </AccordionTrigger>
          <AccordionContent>
            <AddInstagramForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <InstagramsList instagramsData={instagramsData} />
    </>
  );
}
