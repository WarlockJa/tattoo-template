import CustomeHeaderText from "@/components/CustomeHeaderText";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import { piercingFAQ } from "@/components/FAQ/faqData";
import HomeGalleryClient from "@/components/Home/Gallery/HomeGalleryClient";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import { ServicesType } from "@/components/Services/servicesData";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import { Locale } from "@/i18n/config";
import { getCachedTypeInstagramsPage } from "@/lib/cache/instagram/getCachedTypeInstagramsPage";
import { getLocale, getTranslations } from "next-intl/server";

export default async function BodyPiercingPage() {
  const serviceType: ServicesType = "body_piercing";
  const [galleryItems, tServices, tHeaders, tNavMenu, locale] =
    await Promise.all([
      getCachedTypeInstagramsPage(serviceType),
      getTranslations("Services"),
      getTranslations("Headers"),
      getTranslations("NavMenu"),
      getLocale() as Promise<Locale>,
    ]);
  const piercingFAQItems = piercingFAQ({ locale });
  return (
    <section className="relative mx-auto max-w-5xl">
      <CustomeHeaderText text={tServices("body_piercing")} />
      <HomeServiceCard
        dbImageName="eqy2prcq1znnwfk1mdfrzta6-service_piercing.webp"
        name={tServices("body_piercing").toLocaleUpperCase()}
        className="float-left m-4 max-w-xs"
      />
      <div>
        <div>
          <h2>{tServices("whats_body_piercing")}</h2>
          <p>{tServices("body_piercing_1")}</p>
          <p>{tServices("body_piercing_2")}</p>
          <p>{tServices("body_piercing_3")}</p>
        </div>
        <div>
          <h2>{tServices("whats_body_piercing_procedure_like")}</h2>
          <p>{tServices("body_piercing_procedure_1")}</p>
          <p>{tServices("body_piercing_procedure_2")}</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="via-foreground my-6 h-0.5 w-full bg-linear-90 from-transparent to-transparent"></div>
      <HomeGalleryClient count={0} firstPage={galleryItems} />

      <AnimatedComponent once className="text-center">
        <h2 className="font-kings">{tNavMenu("faq")}</h2>
      </AnimatedComponent>
      <FAQAccordion items={piercingFAQItems} />

      <h4 className="text-center">{tHeaders("any_questions")}</h4>
    </section>
  );
}
