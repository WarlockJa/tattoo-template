import CustomeHeaderText from "@/components/CustomeHeaderText";
import NavMenuCard from "@/components/Hero/NavMenuCard";
import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import ParallaxWrapper from "@/components/UniversalComponents/ParallaxWrapper";
import WorkHoursCard from "@/components/WorkHoursCard";
// import { getCachedInstagrams } from "@/lib/cache/instagram/getCachedInstagrams";
import { Cake, Calendar, Clock, Croissant } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";

export default async function Home() {
  // const instagramsData = await getCachedInstagrams();
  const tHome = await getTranslations("Home");
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-full max-h-[1080px]">
        <div className="h-[calc(100vh_-_var(--navbar-height))]">
          <CustomServerImage
            dbImageName="r5jeiegoj1d9ji02jz45lmdx-hero.webp"
            priority
          />
        </div>

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

      {/* Products Section */}
      <section
        id="products"
        className="h-full min-h-[1080px] bg-linear-[25deg,hsl(var(--background))_80%,hsl(var(--accent))_90%,hsl(var(--background))] md:pt-24"
      >
        <CustomeHeaderText text={tHome("our_products")} />
        {/* TODO change to instagrams */}
        {/* <ul className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productsData
            .filter((product) => !product.special)
            .map((product) => (
              <AnimatedComponent once key={`product${product.productId}`}>
                <ProductCard
                  title={product.name}
                  description={product.description}
                  price={product.price}
                >
                  <CustomServerImage imageId={product.imageId ?? null} />
                </ProductCard>
              </AnimatedComponent>
            ))}
        </ul> */}
      </section>

      {/* Workhours */}
      <section id="workhours" className="pt-24">
        <ParallaxWrapper>
          <WorkHoursCard />
        </ParallaxWrapper>
      </section>

      {/* Specials Section */}
      <section
        id="special"
        className="h-full min-h-[1080px] bg-linear-[25deg,hsl(var(--background))_80%,hsl(var(--accent))_90%,hsl(var(--background))] md:pt-24"
      >
        <CustomeHeaderText text={tHome("our_specials")} />
        {/* TODO Change to artists */}
        {/* <ul className="mx-auto grid max-w-6xl gap-4">
          {productsData
            .filter((special) => special.special)
            .map((special) => (
              <AnimatedComponent once key={`special${special.productId}`}>
                <SpecialCard
                  title={special.name}
                  description={special.description}
                  price={special.price}
                >
                  <CustomServerImage imageId={special.imageId} />
                </SpecialCard>
              </AnimatedComponent>
            ))}
        </ul> */}
      </section>
    </main>
  );
}
