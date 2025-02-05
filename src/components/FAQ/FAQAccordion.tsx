import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

interface FAQEntry {
  title: string;
  description: string | ReactNode;
}

export default function FAQAccordion({ items }: { items: FAQEntry[] }) {
  return (
    <Accordion type="single" collapsible className="not-prose space-y-1">
      {items.map((item, index) => (
        <AccordionItem key={`faqaccordion-${index}`} value={`item-${index}`}>
          <AccordionTrigger className="bg-foreground/10 px-4 text-lg">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            {item.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
