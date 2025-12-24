import { brandCoordinates, brandName, brandPlaceId } from "@/appConfig";
import AddressCard from "@/components/Contacts/AddressCard";
import CustomeHeaderText from "@/components/CustomeHeaderText";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import GoogleMaps from "@/components/UniversalComponents/GoogleMaps/GoogleMaps";
import { Locale } from "@/i18n/config";
import getCachedGoogleData from "@/lib/cache/getCachedGoogleData";
import { env } from "@/lib/env.mjs";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ContactPage() {
  // translations
  const locale = (await getLocale()) as Locale;
  // const tContact = await getTranslations("ContactForm");
  // getting cached Google Maps data
  const cachedGoogleData = await getCachedGoogleData({
    placeId: brandPlaceId,
    key: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    language: locale,
  });
  const placeInfo = await cachedGoogleData();

  const tContact = await getTranslations("ContactPage");

  return (
    //  TODO replace #aaa3 with hsla accent
    // <main className="h-full min-h-screen space-y-16 bg-linear-[75deg,hsl(var(--background))_30%,#aaa3_90%,hsl(var(--background))]">
    <main className="h-full min-h-screen space-y-16">
      <div className="mx-auto w-screen max-w-screen-lg md:pt-24">
        <AnimatedComponent once>
          <CustomeHeaderText text={tContact("where_to_find_us")} />
        </AnimatedComponent>
      </div>

      <div className="mx-auto w-screen max-w-7xl grid-cols-[1fr_20em] md:grid">
        <section className="h-screen max-h-[32em] flex-col justify-center sm:pt-0">
          <GoogleMaps
            coordinates={brandCoordinates}
            placeInfo={placeInfo.status === "OK" ? placeInfo.result : undefined}
            className="relative h-full w-full"
            pinchild={
              <div className="h-6 w-6">
                <img
                  src="/logo.png"
                  alt={`${brandName} logo`}
                  className="h-full w-full object-cover"
                />
              </div>
            }
          />
        </section>
        <AddressCard />
      </div>
    </main>
  );
}
