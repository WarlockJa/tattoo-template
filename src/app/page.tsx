import CustomeHeaderText from "@/components/CustomeHeaderText";
import ArtistsCarousel from "@/components/Home/Artists/ArtistsCarousel";
import HomeArtistCard from "@/components/Home/Artists/HomeArtistCard";
import NavMenuCard from "@/components/Home/Hero/NavMenuCard";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import ParallaxWrapper from "@/components/UniversalComponents/ParallaxWrapper";
import WorkHoursCard from "@/components/WorkHoursCard";
import { getCachedArtists } from "@/lib/cache/artists/getCachedArtists";
// import { getCachedInstagrams } from "@/lib/cache/instagram/getCachedInstagrams";
import { Cake, Calendar, Clock, Croissant } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";

export default async function Home() {
  // const instagramsData = await getCachedInstagrams();
  const tHome = await getTranslations("Home");

  const artists = await getCachedArtists();

  return (
    <main>
      {/* Bakcground Image */}
      <CustomServerImage
        dbImageName="tovil2jszthacb4auh62osis-bg-paint-bw.webp"
        className="absolute inset-0 -z-50 opacity-10"
      />

      {/* Hero Section */}
      <section className="relative h-[calc(100vh_-_var(--navbar-height))] max-h-[1080px]">
        <CustomServerImage
          dbImageName="jg6qk2zt5unngmrgwvdwxmso-bg-hero.webp"
          priority
        />

        <div className="absolute right-10 bottom-10">
          <ul className="grid gap-4 md:grid-cols-2">
            <AnimatedComponent once>
              <NavMenuCard href={"/#products"} title={tHome("products")}>
                <Croissant />
              </NavMenuCard>
            </AnimatedComponent>
            <AnimatedComponent once delayS={0.1}>
              <NavMenuCard href={"/#special"} title={tHome("special_occasion")}>
                <Cake />
              </NavMenuCard>
            </AnimatedComponent>
            <AnimatedComponent once delayS={0.2}>
              <NavMenuCard href={"/#workhours"} title={tHome("workhours")}>
                <Clock />
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
      <section className="flex h-full min-h-[min(1080px,100vh)] w-screen max-w-full flex-col justify-center py-4">
        {/* TODO translate */}
        <CustomeHeaderText text={"Our Services"} />
        <div className="lg:mx-auto">
          <ul className="xsm:grid-cols-2 xsm:gap-2 grid max-w-7xl grid-cols-1 gap-16 p-2 md:grid-cols-3 lg:gap-16">
            <HomeServiceCard
              dbImageName="m0daxp5j80m3mf6nk394qvda-service_tattoo.webp"
              // TODO translate
              name="TATTOO"
              className="md:mb-80"
            />
            <HomeServiceCard
              dbImageName="eqy2prcq1znnwfk1mdfrzta6-service_piercing.webp"
              // TODO translate
              name="BODY PIERCING"
              className="xsm:row-span-2 xsm:my-40"
            />
            <HomeServiceCard
              dbImageName="hi69me7mamollzpoilpog9xb-service_makeup.webp"
              // TODO translate
              name="PERMANENT MAKEUP"
              className="md:mt-80"
            />
          </ul>
        </div>
      </section>

      {/* Artists Section */}
      <section className="relative flex h-full min-h-[min(1080px,100vh)] flex-col justify-center py-4">
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

      {/* Workhours */}
      <section id="workhours" className="pt-24">
        <ParallaxWrapper>
          <WorkHoursCard />
        </ParallaxWrapper>
      </section>
    </main>
  );
}
