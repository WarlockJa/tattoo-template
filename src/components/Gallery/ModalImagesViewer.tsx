"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Circle, CircleDot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SelectImage } from "@cf/db/schemaImage";
import CustomDataImage from "../UniversalComponents/CustomDataImage";

// modal viewer for images
export default function ModalImagesViewer({
  activeImageIndex,
  images,
  children,
}: {
  images: SelectImage[];
  activeImageIndex?: number;
  children: ReactNode;
}) {
  // carousel api
  const [api, setApi] = useState<CarouselApi>();
  // active slide state
  const [activeSlide, setActiveSlide] = useState(activeImageIndex ?? 0);

  // tracking active slide change
  useEffect(() => {
    if (!api) return;
    if (activeImageIndex) api.scrollTo(activeImageIndex, true);

    setActiveSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // carousel keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!api) return;
    switch (e.code) {
      case "ArrowRight":
        api.scrollNext();
        break;
      case "ArrowLeft":
        api.scrollPrev();
        break;

      default:
        break;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"top"} onKeyDown={handleKeyDown} className="p-0">
        <SheetTitle className="hidden">Images Modal</SheetTitle>
        <SheetDescription className="hidden">Images Modal</SheetDescription>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="bg-secondary max-h-screen"
        >
          <CarouselContent className="m-0">
            {images.map((img, index) => (
              <CarouselItem key={`${index}`} className="h-screen w-screen pl-0">
                <CustomDataImage dbImage={img} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              api?.scrollPrev();
            }}
            variant={"ghost"}
            className={
              "text-foreground fixed inset-y-0 left-0 hidden h-full cursor-pointer p-0 md:block [&_svg]:size-24"
            }
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              api?.scrollNext();
            }}
            variant={"ghost"}
            className={cn(
              "text-foreground fixed inset-y-0 right-0 hidden h-full cursor-pointer p-0 md:block [&_svg]:size-24",
            )}
          >
            <ChevronRight />
          </Button>
          <ul className="absolute right-0 bottom-0 left-0 flex justify-center">
            {images.length > 1 &&
              images.map((_, index) => (
                <Button
                  type="button"
                  variant={"ghost"}
                  key={`dot${index}`}
                  size={"icon"}
                  onFocus={(e) => e.currentTarget.blur()}
                  onClick={() => api?.scrollTo(index)}
                  className={cn("text-secondary-foreground")}
                >
                  {activeSlide === index ? <CircleDot /> : <Circle />}
                </Button>
              ))}
          </ul>
        </Carousel>
        <SheetClose
          onClick={(e) => {
            e.stopPropagation();
          }}
          asChild
        >
          <Button
            type="button"
            className="hover:bg-background hover:text-accent absolute right-10 bottom-12 flex cursor-pointer items-center rounded-sm p-8 text-xl transition-colors hover:underline [&_svg]:size-16"
            size={"icon"}
            variant={"ghost"}
          >
            <X />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
