import CustomeHeaderText from "@/components/CustomeHeaderText";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import { permanentMakeupFAQ } from "@/components/FAQ/faqData";
import HomeGalleryClient from "@/components/Home/Gallery/HomeGalleryClient";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import { ServicesType } from "@/components/Services/servicesData";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import { Locale } from "@/i18n/config";
import { getCachedTypeInstagramsPage } from "@/lib/cache/instagram/getCachedTypeInstagramsPage";
import { getLocale, getTranslations } from "next-intl/server";

export default async function PermanentMakeupPage() {
  const serviceType: ServicesType = "permanent_makeup";
  const [galleryItems, tServices, tHeaders, tNavMenu, locale] =
    await Promise.all([
      getCachedTypeInstagramsPage(serviceType),
      getTranslations("Services"),
      getTranslations("Headers"),
      getTranslations("NavMenu"),
      getLocale() as Promise<Locale>,
    ]);
  const permanentMakeupFAQItems = permanentMakeupFAQ({ locale });

  return (
    <section className="relative mx-auto max-w-5xl">
      <CustomeHeaderText text={tServices("permanent_makeup")} />
      <HomeServiceCard
        dbImageName="hi69me7mamollzpoilpog9xb-service_makeup.webp"
        name={tServices("permanent_makeup").toLocaleUpperCase()}
        className="float-left m-4 max-w-xs"
      />
      <div>
        <div>
          <h2>{tServices("whats_permanent_makeup")}</h2>
          <p>{tServices("permanent_makeup_is")}</p>
        </div>
        <div>
          <h2>{tServices("permanent_makeup_benefits")}</h2>
          <p>{tServices("permanent_makeup_benefits_text")}</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="via-foreground my-6 h-0.5 w-full bg-linear-90 from-transparent to-transparent"></div>
      <HomeGalleryClient count={0} firstPage={galleryItems} />

      <AnimatedComponent once className="text-center">
        <h2 className="font-kings">{tNavMenu("faq")}</h2>
      </AnimatedComponent>
      <FAQAccordion items={permanentMakeupFAQItems} />

      <h4 className="text-center">{tHeaders("any_questions")}</h4>
    </section>
  );
}
