"use client";

import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function AutoPlayCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    api.on("select", () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api]);

  const images = [
    {
      url: "https://res.cloudinary.com/dfm5iyef8/image/upload/v1754399251/6074010_lm2lcx.jpg",
    },
    {
      url: "https://res.cloudinary.com/dfm5iyef8/image/upload/v1754399247/8441302_mx1cil.jpg",
    },
    {
      url: "https://res.cloudinary.com/dfm5iyef8/image/upload/v1754399182/Screenshot_2025-08-05_195656_lo1wnt.jpg",
    },
    {
      url: "https://res.cloudinary.com/dfm5iyef8/image/upload/v1754399444/Screenshot_2025-08-05_194837_o01fgg.jpg",
    },
    {
      url: "https://res.cloudinary.com/dfm5iyef8/image/upload/v1754399237/7494743_g7vmfu.jpg",
    },
  ];

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="mx-auto w-full"
      >
        <CarouselContent>
          {images.map((content, index) => (
            <CarouselItem
              key={index}
              className="relative h-80 w-full basis-full overflow-hidden"
            >
              <img
                src={content.url}
                alt="hero-image"
                width={1600}
                height={1600}
                className="h-full w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-2 z-10 -translate-y-1/2 border-0 bg-black text-white" />
        <CarouselNext className="absolute top-1/2 right-2 z-10 -translate-y-1/2 border-0 bg-black text-white" />
        {/* Dot navigation */}
        <div className="absolute bottom-3 left-4 flex justify-center gap-1">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full ${
                index === selectedIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
