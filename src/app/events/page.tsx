"use client";

import { AutoPlayCarousel } from "@/components/AutoplayCarousel";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categoryItems, locationItems } from "@/lib/items";
import { LuFilter } from "react-icons/lu";
import { EventList } from "./_components/EventList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <div className="container mx-auto">
          <section className="flex flex-col gap-8 px-4 py-8">
            <div className="overflow-hidden rounded-lg">
              <AutoPlayCarousel />
            </div>
            <div className="flex gap-2">
              <div className="flex h-48 flex-2/12 flex-col gap-4">
                <div className="flex flex-row items-center gap-4 font-bold">
                  <LuFilter />
                  <div className="text-xl">Filter</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">Category</div>
                  <RadioGroup defaultValue="jakarta">
                    {categoryItems.map((category, index) => (
                      <div className="flex items-center gap-3" key={index}>
                        <RadioGroupItem
                          value={category.value}
                          id={category.id}
                          className="data-[state=checked]:bg-primary h-5 w-5 rounded-[5px] border-1"
                        />
                        <Label htmlFor={category.htmlFor}>
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">Location</div>
                  <RadioGroup defaultValue="jakarta">
                    {locationItems.map((category, index) => (
                      <div className="flex items-center gap-3" key={index}>
                        <RadioGroupItem
                          value={category.value}
                          id={category.id}
                          className="data-[state=checked]:bg-primary h-5 w-5 rounded-[5px] border-1"
                        />
                        <Label htmlFor={category.htmlFor}>
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div className="flex flex-10/12 flex-col gap-4">
                <EventList />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
