"use client";

import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import useGetEvents from "../_hooks/useGetEvents";
import BlogCardSkeleton from "./EventCardSkeleton";
import EventCard from "./EventCard";
import { Input } from "@/components/ui/input";
import PaginationSection from "@/components/PaginationSection";

export const EventList = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 1000);

  const { data: events, isPending } = useGetEvents({
    page,
    search: debounceSearch,
  });

  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl font-bold">Newest Event</div>
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 max-w-md flex "
        />
      </div>
      <div className="grid grid-cols-4 gap-6">
        {isPending && <BlogCardSkeleton count={8} />}
        {events?.data.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {events && (
        <div className="mt-12">
          <PaginationSection  meta={events.meta} setPage={setPage} />
        </div>
      )}
    </>
  );
};
