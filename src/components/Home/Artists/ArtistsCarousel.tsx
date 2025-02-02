"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

export default function ArtistsCarousel({
  children,
  delayMs = 5000,
  className,
}: {
  children: ReactNode[];
  delayMs?: number;
  className?: string;
}) {
  // carousel api
  const [api, setApi] = useState<CarouselApi>();

  // active slide state
  const [activeSlide, setActiveSlide] = useState(0);

  // tracking active slide change
  useEffect(() => {
    if (!api) return;
    setActiveSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: true,
        duration: 15,
      }}
      className={cn(className, "relative mx-auto max-w-5xl")}
      plugins={[
        Autoplay({
          delay: delayMs,
          stopOnInteraction: true,
          stopOnFocusIn: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {children.map((artistCard, index) => (
          <CarouselItem key={index}>{artistCard}</CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex w-full justify-center">
        <Button
          type="button"
          onClick={() => api?.scrollPrev()}
          variant={"ghost"}
          disabled={!api?.canScrollPrev()}
          className={cn(children.length === 1 && "md:hidden")}
        >
          <ChevronLeft />
        </Button>

        <ul className="m-0 flex justify-center">
          {children.map((_, index) => (
            <Button
              type="button"
              key={`dot${index}`}
              size={"icon"}
              variant={"ghost"}
              className="z-10"
              onClick={() => api?.scrollTo(index)}
            >
              {activeSlide === index ? <CircleDot /> : <Circle />}
            </Button>
          ))}
        </ul>

        <Button
          type="button"
          onClick={() => api?.scrollNext()}
          disabled={!api?.canScrollNext()}
          variant={"ghost"}
          className={cn(children.length === 1 && "md:hidden")}
        >
          <ChevronRight />
        </Button>
      </div>
    </Carousel>
  );
}
