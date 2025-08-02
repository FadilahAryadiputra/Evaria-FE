"use client";

import { AutoPlayCarousel } from "@/components/AutoplayCarousel";

import Footer from "@/components/Footer";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categoryItems, locationItems } from "@/lib/items";
import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { useDebounceValue } from "usehooks-ts";
import EventCard from "./_components/EventCard";
import BlogCardSkeleton from "./_components/EventCardSkeleton";
import useGetEvents from "./_hooks/useGetEvents";
import { DateRangePicker } from "@/components/DateRangePicker";
import Navbar from "@/components/Navbar";

export default function Home() {
  const handleDateChange = (date: { from: string; to: string }) => {
    if (date.from !== dateRange?.from || date.to !== dateRange?.to) {
      setDateRange(date);
      console.log(date);
    }
  };
  const [dateRange, setDateRange] = useState<{
    from: string;
    to: string;
  } | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 1000);

  const { data: events, isPending } = useGetEvents({
    page,
    category: category,
    location: location,
    search: debounceSearch,
    startDate: dateRange?.from,
    endDate: dateRange?.to,
  });

  return (
    <>
      <main className="flex-grow">
        <Navbar />
        <div className="container mx-auto">
          <section className="flex flex-col gap-8 px-4 py-8">
            <div className="overflow-hidden rounded-lg">
              <AutoPlayCarousel />
            </div>
            <div className="flex items-stretch gap-2">
              <div className="flex flex-2/12 flex-col gap-4">
                <div className="flex flex-row items-center gap-4 font-bold">
                  <LuFilter />
                  <div className="text-xl">Filter</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">Category</div>
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) => setCategory(value)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                          value=""
                          id="all"
                          className="data-[state=checked]:bg-primary h-5 w-5 rounded-[5px] border-1"
                        />
                        <Label htmlFor="all">
                          All
                        </Label>
                    </div>
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
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) => setLocation(value)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                          value=""
                          id="all"
                          className="data-[state=checked]:bg-primary h-5 w-5 rounded-[5px] border-1"
                        />
                        <Label htmlFor="all">
                          All
                        </Label>
                    </div>
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
              <div className="flex flex-10/12 flex-col justify-between gap-4">
                <div>
                  <div className="flex justify-between">
                    <div className="text-xl font-bold">Newest Event</div>
                    <div className="flex gap-2">
                      <DateRangePicker
                        onChange={handleDateChange}
                        className="max-w-md"
                      />
                      <Input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-4 flex w-[400px]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {isPending && <BlogCardSkeleton count={8} />}
                    {!isPending && events?.data.length === 0 && (
                      <div className="col-span-4 text-center text-gray-500">
                        No events available.
                      </div>
                    )}
                    {events?.data.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
                {events && (
                  <div className="mt-12">
                    <PaginationSection meta={events.meta} setPage={setPage} />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
