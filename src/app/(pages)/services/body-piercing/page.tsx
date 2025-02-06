import CustomeHeaderText from "@/components/CustomeHeaderText";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import { piercingFAQ } from "@/components/FAQ/faqData";
import HomeGalleryClient from "@/components/Home/Gallery/HomeGalleryClient";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import { ServicesType } from "@/components/Services/servicesData";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import { Locale } from "@/i18n/config";
import { getCachedTypeInstagramsPage } from "@/lib/cache/instagram/getCachedTypeInstagramsPage";
import { getLocale } from "next-intl/server";

export const runtime = "edge";

export default async function BodyPiercingPage() {
  const locale = (await getLocale()) as Locale;
  const piercingFAQItems = piercingFAQ({ locale });
  const serviceType: ServicesType = "body piercing";
  const galleryItems = await getCachedTypeInstagramsPage(serviceType);
  return (
    <section className="relative mx-auto max-w-5xl">
      {/* TODO translate */}
      <CustomeHeaderText text={"Body Piercing"} />
      <HomeServiceCard
        dbImageName="eqy2prcq1znnwfk1mdfrzta6-service_piercing.webp"
        // TODO translate
        name="BODY PIERCING"
        className="float-left m-4 max-w-xs"
      />
      <div>
        <div>
          <h2>What Is a Body Piercing?</h2>
          <p>
            A piercing is a hole or puncture of sorts made by a needle through a
            layer of tissue that jewelry is able to fit through and safely
            remain while the piercing heals. Many people pierce their noses,
            ears, lips, or naval, but piercing comes in many forms and styles
            from oral piercings, to surface anchor pieces embedded into the
            skin.
          </p>
          <p>
            If you are 18 years of age or older please bring a valid
            government-issued photo ID such as a state ID, driver&apos;s
            license, or passport. A learner&apos;s permit is not a valid ID.
          </p>
          <p>
            If you are a minor (14-17 yrs old) we require your birth certificate
            and one of your parent&apos;s valid photo IDs. For guardians of
            minors, we require a court-issued statement that you are the legal
            guardian.
          </p>
        </div>
        <div>
          <h2>What&apos;s the Procedure Like?</h2>
          <p>
            The licensed piercer will wash his or her hands with antibacterial
            soap and water and wear clean, fresh gloves to ensure a clean and
            sterile environment. The area to be pierced (except for the tongue
            which is cleaned with a form of Listerine) is cleaned with alcohol
            or another type of antiseptic. All needles and equipment used are
            fully sterilized prior to the procedure.
          </p>
          <p>
            Your skin is then punctured with a very sharp, sterile, single-use
            needle, and the sterile jewelry is then placed into the hole
            created. The piercing is then cleaned of any blood, and you will
            receive aftercare instructions.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="via-foreground my-6 h-0.5 w-full bg-linear-90 from-transparent to-transparent"></div>
      <HomeGalleryClient count={0} firstPage={galleryItems} />

      {/* TODO translate */}
      <AnimatedComponent once className="text-center">
        <h2 className="font-kings">FAQ</h2>
      </AnimatedComponent>
      <FAQAccordion items={piercingFAQItems} />

      <h4 className="text-center">
        If you have any questions at all, our talented artists will be more than
        happy to assist you, and all consultations are free.{" "}
      </h4>
    </section>
  );
}
