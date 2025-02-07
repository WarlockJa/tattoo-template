import CustomeHeaderText from "@/components/CustomeHeaderText";
import ArtistsCarousel from "@/components/Home/Artists/ArtistsCarousel";
import HomeArtistCard from "@/components/Home/Artists/HomeArtistCard";
import HomeGallery from "@/components/Home/Gallery/HomeGallery";
import NavMenuCard from "@/components/Home/Hero/NavMenuCard";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { getCachedArtists } from "@/lib/cache/artists/getCachedArtists";
import { Brush, Calendar, TableOfContents, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";

export default async function Home() {
  const [tHome, tHeaders, tServices, artists] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Headers"),
    getTranslations("Services"),
    getCachedArtists(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative z-20 h-[calc(100vh_-_var(--navbar-height))] max-h-[1080px]">
        <CustomServerImage
          dbImageName="jg6qk2zt5unngmrgwvdwxmso-bg-hero.webp"
          priority
        />

        <div className="xsm:right-10 xsm:bottom-10 xsm:p-0 xsm:left-auto absolute inset-x-0 bottom-0 p-4">
          <div className="mb-4 h-60 w-full md:mb-[12vh]">
            <img
              src="/default.webp"
              alt="tattoo salon logo"
              className="h-full w-full object-contain"
            />
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            <AnimatedComponent once>
              <NavMenuCard href={"/#services"} title={tHome("services")}>
                <Brush />
              </NavMenuCard>
            </AnimatedComponent>
            <AnimatedComponent once delayS={0.1}>
              <NavMenuCard href={"/#artists"} title={tHome("artists")}>
                <Users />
              </NavMenuCard>
            </AnimatedComponent>
            <AnimatedComponent once delayS={0.2}>
              <NavMenuCard href={"/faq"} title={tHome("faq")}>
                <TableOfContents />
              </NavMenuCard>
            </AnimatedComponent>
            <AnimatedComponent once delayS={0.3}>
              <NavMenuCard href={"/contact"} title={tHome("contacts")}>
                <Calendar />
              </NavMenuCard>
            </AnimatedComponent>
          </ul>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative flex h-full min-h-[min(1080px,100vh)] w-screen max-w-full flex-col justify-center overflow-hidden py-4"
      >
        <CustomeHeaderText text={tHeaders("our_services")} />
        <div className="lg:mx-auto">
          <ul className="xsm:grid-cols-2 xsm:gap-2 grid max-w-7xl grid-cols-1 gap-16 p-2 md:grid-cols-3 lg:gap-16">
            <HomeServiceCard
              dbImageName="m0daxp5j80m3mf6nk394qvda-service_tattoo.webp"
              name={tServices("tattoo").toLocaleUpperCase()}
              className="md:mb-80"
              href="/services/tattoo"
            />
            <HomeServiceCard
              dbImageName="eqy2prcq1znnwfk1mdfrzta6-service_piercing.webp"
              name={tServices("body_piercing").toLocaleUpperCase()}
              className="xsm:row-span-2 xsm:mt-40 xsm:mb-80"
              href="/services/body-piercing"
            />
            <HomeServiceCard
              dbImageName="hi69me7mamollzpoilpog9xb-service_makeup.webp"
              name={tServices("permanent_makeup").toLocaleUpperCase()}
              className="md:mt-80"
              href="/services/permanent-makeup"
            />
          </ul>
        </div>
      </section>

      {/* Artists Section */}
      <section
        id="artists"
        className="relative flex h-full min-h-[min(1080px,100vh)] flex-col justify-center py-4"
      >
        <div className="absolute inset-0 -z-10">
          <CustomServerImage
            dbImageName="sbofwpw3r6id1bi475w6vrin-bg-antalya.webp"
            className="absolute inset-0"
          />
          <div className="bg-background/80 absolute inset-0"></div>
        </div>
        <CustomeHeaderText text={tHeaders("featured_artists")} />

        <ArtistsCarousel>
          {artists.map((artist) => (
            <HomeArtistCard key={artist.artistId} artist={artist} />
          ))}
        </ArtistsCarousel>
      </section>

      {/* Images Gallery */}
      <section className="py-20">
        <CustomeHeaderText text={tHeaders("gallery")} />
        <HomeGallery />
      </section>
    </main>
  );
}
