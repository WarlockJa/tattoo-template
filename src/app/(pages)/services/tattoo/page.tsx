import CustomeHeaderText from "@/components/CustomeHeaderText";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import { tattooFAQ } from "@/components/FAQ/faqData";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import { Locale } from "@/i18n/config";
import { getLocale } from "next-intl/server";

export const runtime = "edge";

export default async function ServiceTattooPage() {
  const locale = (await getLocale()) as Locale;
  const tattooFAQItems = tattooFAQ({ locale });
  return (
    <section className="relative mx-auto max-w-5xl">
      {/* TODO translate */}
      <CustomeHeaderText text={"Tattoo"} />
      <HomeServiceCard
        dbImageName="m0daxp5j80m3mf6nk394qvda-service_tattoo.webp"
        // TODO translate
        name="TATTOO"
        className="float-left m-4 max-w-xs"
      />
      <div>
        <div>
          <h2 className="text-2xl">What is a Tattoo?</h2>
          <p>
            A tattoo is a permanent form of body art. A tattoo design is made by
            puncturing the top layer of the skin with needles and injecting ink,
            dyes, and pigments into the deeper layers.
          </p>
        </div>
        <div>
          <h2>What&apos;s the Procedure Like?</h2>
          <p>
            The tattoo artist will wash his or her hands with antibacterial soap
            and water and wear clean, fresh gloves (and possibly a surgical
            mask) to ensure a safe and clean environment. The area which will be
            tattooed is washed with soap and shaved, if necessary before the
            artist draws or stencils the design on your skin.
          </p>
          <p>
            Once you are happy with the design, the area is cleaned once more,
            and a thin layer of ointment is applied. The actual process of
            tattooing normally begins with outlines and moves on from there. The
            artist may use different needles during the process depending upon
            the desired design, and the style of the artist. Any fluids from the
            tattoo are wiped away with a sterile and disposable gauze or towel.
            Once the tattoo is finished the area is cleaned once more and a
            sterile bandage is applied.
          </p>
        </div>
      </div>

      {/* TODO translate */}
      <AnimatedComponent once className="text-center">
        <h2 className="font-kings">FAQ</h2>
      </AnimatedComponent>
      <FAQAccordion items={tattooFAQItems} />

      <h4 className="text-center">
        If you have any questions at all, our talented artists will be more than
        happy to assist you, and all consultations are free.{" "}
      </h4>
    </section>
  );
}
