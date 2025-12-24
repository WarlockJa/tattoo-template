import CustomeHeaderText from "@/components/CustomeHeaderText";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import {
  dayAfterFAQ,
  dayBeforeFAQ,
  permanentMakeupFAQ,
  piercingFAQ,
  tattooFAQ,
} from "@/components/FAQ/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Locale } from "@/i18n/config";
import { getLocale, getTranslations } from "next-intl/server";

const addSpanStyling = (text: string) => {
  const textParts = text.split(":");
  return (
    <>
      <span className="text-xl font-bold">{textParts[0]}: </span>
      {textParts[1]}
    </>
  );
};

export default async function FAQPage() {
  const locale = (await getLocale()) as Locale;
  const dayBeforeFAQItems = dayBeforeFAQ({ locale });
  const dayAfterFAQItems = dayAfterFAQ({ locale });
  const tattooFAQItems = tattooFAQ({ locale });
  const piercingFAQItems = piercingFAQ({ locale });
  const permanentMakeupFAQItems = permanentMakeupFAQ({ locale });
  const tHeaders = await getTranslations("Headers");
  const tServices = await getTranslations("Services");
  return (
    <section className="relative mx-auto min-h-[1080px] max-w-5xl">
      <CustomeHeaderText text={tHeaders("aftercare")} />
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-daybefore`}>
          <AccordionTrigger className="bg-foreground/10 px-4 text-lg">
            {dayBeforeFAQItems.title}
          </AccordionTrigger>
          <AccordionContent className="pl-5 text-lg">
            {Object.values(dayBeforeFAQItems.items).map((item, index) => (
              <li className="mt-8 list-disc" key={`item-daybefore-${index}`}>
                {addSpanStyling(item)}
              </li>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={`item-dayafter`}>
          <AccordionTrigger className="bg-foreground/10 px-4 text-lg">
            {dayAfterFAQItems.title}
          </AccordionTrigger>
          <AccordionContent className="pl-5 text-lg">
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-dayafter-plasticwrap`}>
                <AccordionTrigger className="bg-foreground/10 px-4 text-lg">
                  {dayAfterFAQItems.PlasticWrap.title}
                </AccordionTrigger>
                <AccordionContent className="pl-5 text-lg">
                  {Object.values(dayAfterFAQItems.PlasticWrap.items).map(
                    (item, index) => (
                      <li
                        className="mt-8 list-disc"
                        key={`item-dayafter-plasticwrap-${index}`}
                      >
                        {addSpanStyling(item)}
                      </li>
                    ),
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value={`item-dayafter-adhesivefilm`}>
                <AccordionTrigger className="bg-foreground/10 px-4 text-lg">
                  {dayAfterFAQItems.AdhesiveFilm.title}
                </AccordionTrigger>
                <AccordionContent className="pl-5 text-lg">
                  {Object.values(dayAfterFAQItems.AdhesiveFilm.items).map(
                    (item, index) => (
                      <li
                        className="mt-8 list-disc"
                        key={`item-dayafter-adhesivefilm-${index}`}
                      >
                        {addSpanStyling(item)}
                      </li>
                    ),
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value={`item-dayafter-aftercare`}>
                <AccordionTrigger className="bg-foreground/10 px-4 text-lg">
                  {dayAfterFAQItems.AftercareReminders.title}
                </AccordionTrigger>
                <AccordionContent className="pl-5 text-lg">
                  {Object.values(dayAfterFAQItems.AftercareReminders.items).map(
                    (item, index) => (
                      <li
                        className="mt-8 list-disc"
                        key={`item-dayafter-aftercare-${index}`}
                      >
                        {addSpanStyling(item)}
                      </li>
                    ),
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value={`item-dayafter-additionalinfo`}>
                <AccordionTrigger className="bg-foreground/10 px-4 text-lg">
                  {dayAfterFAQItems.AdditionalInfo.title}
                </AccordionTrigger>
                <AccordionContent className="pl-5 text-lg">
                  {Object.values(dayAfterFAQItems.AdditionalInfo.items).map(
                    (item, index) => (
                      <li
                        className="mt-8 list-disc"
                        key={`item-dayafter-additionalinfo-${index}`}
                      >
                        {addSpanStyling(item)}
                      </li>
                    ),
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <CustomeHeaderText text={tServices("tattoo")} />
      <FAQAccordion items={tattooFAQItems} />
      <CustomeHeaderText text={tServices("body_piercing")} />
      <FAQAccordion items={piercingFAQItems} />
      <CustomeHeaderText text={tServices("permanent_makeup")} />
      <FAQAccordion items={permanentMakeupFAQItems} />

      <h4 className="text-center">{tHeaders("any_questions")}</h4>
    </section>
  );
}
