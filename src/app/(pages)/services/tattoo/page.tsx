import CustomeHeaderText from "@/components/CustomeHeaderText";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import { tattooFAQ } from "@/components/FAQ/faqData";
import HomeGalleryClient from "@/components/Home/Gallery/HomeGalleryClient";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import { ServicesType } from "@/components/Services/servicesData";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import { Locale } from "@/i18n/config";
import { getCachedTypeInstagramsPage } from "@/lib/cache/instagram/getCachedTypeInstagramsPage";
import { getLocale, getTranslations } from "next-intl/server";

export const runtime = "edge";

export default async function ServiceTattooPage() {
  const serviceType: ServicesType = "tattoo";
  const [galleryItems, tServices, tHeaders, tNavMenu, locale] =
    await Promise.all([
      getCachedTypeInstagramsPage(serviceType),
      getTranslations("Services"),
      getTranslations("Headers"),
      getTranslations("NavMenu"),
      getLocale() as Promise<Locale>,
    ]);
  const tattooFAQItems = tattooFAQ({ locale });

  return (
    <section className="relative mx-auto max-w-5xl">
      <CustomeHeaderText text={tServices("tattoo")} />
      <HomeServiceCard
        dbImageName="m0daxp5j80m3mf6nk394qvda-service_tattoo.webp"
        name={tServices("tattoo").toLocaleUpperCase()}
        className="float-left m-4 max-w-xs"
      />
      <div>
        <div>
          <h2 className="text-2xl">{tServices("what_is_tattoo")}</h2>
          <p>{tServices("tattoo_is")}</p>
        </div>
        <div>
          <h2>{tServices("whats_tattoo_procedure_like")}</h2>
          <p>{tServices("tattoo_procedure_1")}</p>
          <p>{tServices("tattoo_procedure_2")}</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="via-foreground my-6 h-0.5 w-full bg-linear-90 from-transparent to-transparent"></div>
      <HomeGalleryClient count={0} firstPage={galleryItems} />

      <AnimatedComponent once className="text-center">
        <h2 className="font-kings">{tNavMenu("faq")}</h2>
      </AnimatedComponent>
      <FAQAccordion items={tattooFAQItems} />

      <h4 className="text-center">{tHeaders("any_questions")}</h4>
    </section>
  );
}
