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
  const tHome = await getTranslations("Home");

  const artists = await getCachedArtists();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh_-_var(--navbar-height))] max-h-[1080px]">
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
              {/* TODO translate */}
              <NavMenuCard href={"/#services"} title={"Services"}>
                <Brush />
              </NavMenuCard>
            </AnimatedComponent>
            <AnimatedComponent once delayS={0.1}>
              {/* TODO translate */}
              <NavMenuCard href={"/#artists"} title={"Artists"}>
                <Users />
              </NavMenuCard>
            </AnimatedComponent>
            <AnimatedComponent once delayS={0.2}>
              {/* TODO translate */}
              <NavMenuCard href={"/faq"} title={"FAQ"}>
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
        {/* TODO translate */}
        <CustomeHeaderText text={"Our Services"} />
        <div className="lg:mx-auto">
          <ul className="xsm:grid-cols-2 xsm:gap-2 grid max-w-7xl grid-cols-1 gap-16 p-2 md:grid-cols-3 lg:gap-16">
            <HomeServiceCard
              dbImageName="m0daxp5j80m3mf6nk394qvda-service_tattoo.webp"
              // TODO translate
              name="TATTOO"
              className="md:mb-80"
              href="/services/tattoo"
            />
            <HomeServiceCard
              dbImageName="eqy2prcq1znnwfk1mdfrzta6-service_piercing.webp"
              // TODO translate
              name="BODY PIERCING"
              className="xsm:row-span-2 xsm:mt-40 xsm:mb-80"
              href="/services/body-piercing"
            />
            <HomeServiceCard
              dbImageName="hi69me7mamollzpoilpog9xb-service_makeup.webp"
              // TODO translate
              name="PERMANENT MAKEUP"
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
        {/* TODO translate */}
        <CustomeHeaderText text={"Featured Artists"} />

        <ArtistsCarousel>
          {artists.map((artist) => (
            <HomeArtistCard key={artist.artistId} artist={artist} />
          ))}
        </ArtistsCarousel>
      </section>

      {/* Images Gallery */}
      <section className="py-20">
        {/* TODO translate */}
        <CustomeHeaderText text={"Gallery"} />
        <HomeGallery />
      </section>
    </main>
  );
}
