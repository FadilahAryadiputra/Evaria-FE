"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

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
      url: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/event-ticket-design-template-7790ce89f17c9b72dead3b8551c88142_screen.jpg?ts=1698308471",
    },
    {
      url: "https://thumbs.dreamstime.com/b/gift-voucher-discount-sale-flyer-box-promotion-ticket-special-offer-customer-certificate-shopping-card-birthday-prize-306187779.jpg",
    },
    {
      url: "https://thumbs.dreamstime.com/b/shopping-day-sale-banner-template-design-abstract-red-geometric-pixel-labels-sign-promotion-every-month-numbers-condensed-font-332835337.jpg",
    },
    {
      url: "https://www.bca.co.id/-/media/Feature/Promo/Page/2024/10/20241028-promo-3-jdf-2024-BANNER.png?v=1",
    },
    {
      url: "https://static.vecteezy.com/system/resources/thumbnails/059/554/946/small/colorful-vintage-circus-horizontal-advertising-banner-design-for-promotion-of-events-creation-of-posters-invitations-tickets-and-more-retro-illustration-free-vector.jpg",
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
              className="flex h-72 items-center justify-center bg-neutral-900 text-4xl font-bold text-white"
            >
              <img
                src={content.url}
                alt="hero-image"
                width={1600}
                height={1600}
                className="object-fill"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-black text-white border-0" />
        <CarouselNext className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-black text-white border-0" />
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
