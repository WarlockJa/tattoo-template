import CustomeHeaderText from "@/components/CustomeHeaderText";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import { permanentMakeupFAQ } from "@/components/FAQ/faqData";
import HomeGalleryClient from "@/components/Home/Gallery/HomeGalleryClient";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import { ServicesType } from "@/components/Services/servicesData";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import { Locale } from "@/i18n/config";
import { getCachedTypeInstagramsPage } from "@/lib/cache/instagram/getCachedTypeInstagramsPage";
import { getLocale } from "next-intl/server";

export const runtime = "edge";

export default async function PermanentMakeupPage() {
  const locale = (await getLocale()) as Locale;
  const permanentMakeupFAQItems = permanentMakeupFAQ({ locale });
  const serviceType: ServicesType = "permanent makeup";
  const galleryItems = await getCachedTypeInstagramsPage(serviceType);
  return (
    <section className="relative mx-auto max-w-5xl">
      {/* TODO translate */}
      <CustomeHeaderText text={"Permanent Makeup"} />
      <HomeServiceCard
        dbImageName="hi69me7mamollzpoilpog9xb-service_makeup.webp"
        // TODO translate
        name="PERMANENT MAKEUP"
        className="float-left m-4 max-w-xs"
      />
      <div>
        <div>
          <h2>What is Permanent Makeup?</h2>
          <p>
            Permanent makeup is a form of cosmetic tattooing in which a tattoo
            machine is used to inject pigment and ink into the skin to change
            the coloration of the desired area. Permanent makeup artists have
            all the skills of the average makeup artist and are able to produce
            the same look as real makeup, but with permanent results. Eyeliner,
            color enhancement of skin on the face, eyelids, lips, and eyebrows
            are common for permanent makeup, but we also offer many other
            services to make you look and feel your best. Please contact us for
            more information, specifics, and availability.
          </p>
        </div>
        <div>
          <h2>Permanent Makeup Beauty Benefits</h2>
          <p>
            The most obvious beauty benefit to permanent makeup is waking up
            every day with your face always “on”. You can go for a swim,
            exercise, shower and wake up still looking put together and ready to
            go. You never have to take time to do your makeup or worry about
            taking it off. For many, it is a great way to free up precious time.
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
      <FAQAccordion items={permanentMakeupFAQItems} />

      <h4 className="text-center">
        If you have any questions at all, our talented artists will be more than
        happy to assist you, and all consultations are free.{" "}
      </h4>
    </section>
  );
}
