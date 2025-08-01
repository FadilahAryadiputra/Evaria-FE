import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { FC } from "react";
import { getEvent } from "../_api/get-event";

import { format } from "date-fns";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { IoTicketOutline } from "react-icons/io5";
import TicketSelector from "./TicketSelector";
import { Button } from "@/components/ui/button";
import EventDetails from "./EventDetails";
import Markdown from "@/components/Markdown";

interface EventBodyProps {
  slug: string;
}

const EventBody: FC<EventBodyProps> = async ({ slug }) => {
  const event = await getEvent(slug);

  const formattedDateFrom = format(new Date(event.startDate), "dd MMM yyyy");
  const formattedDateTo = format(new Date(event.endDate), "dd MMM yyyy");
  const formattedTimeFrom = format(new Date(event.startTime), "HH:mm");
  const formattedTimeTo = format(new Date(event.endTime), "HH:mm");
  const formattedLocation =
    event.location.charAt(0) + event.location.slice(1).toLowerCase();

  return (
    <section className="my-8">
      <div className="grid grid-cols-3 gap-12">
        <div className="flex flex-col gap-2">
          <div className="relative h-[400px] overflow-hidden rounded-md">
            <Image
              src={event.thumbnail}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex justify-end">
            <div className="bg-primary text-secondary rounded-lg px-3">
              {event.category}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="mx-6 text-xl font-bold">{event.title}</div>
            <div className="text-md mx-6 my-4 flex flex-col gap-2">
              <div className="flex gap-4">
                <MapPin />
                {formattedLocation}
              </div>
              <div className="flex gap-4">
                <CalendarDays />
                {formattedDateFrom === formattedDateTo
                  ? formattedDateFrom
                  : `${formattedDateFrom} - ${formattedDateTo}`}
              </div>
              <div className="flex gap-4">
                <Clock />
                {formattedTimeFrom} - {formattedTimeTo}
              </div>
            </div>
            <div className="relative flex w-full items-center">
              <div className="flex-grow border-t-1 border-gray-300"></div>
            </div>
            <div className="mx-6 flex items-center gap-4">
              <div className="relative size-[40px] overflow-hidden rounded-full">
                <Image
                  src={event.organizer?.profilePicture ?? "/default-avatar.png"}
                  alt={event.organizer?.username ?? "Organizer"}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="truncate">
                {event.organizer?.username || "Unknown"}
              </div>
            </div>
          </div>
          <Tabs defaultValue="description">
            <TabsList className="w-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Markdown content={event.description} />
            </TabsContent>
            <TabsContent value="content">
              <Markdown content={event.content} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-lg">Select ticket :</div>
          <EventDetails eventTickets={event.eventTickets ?? []} />
        </div>
      </div>
    </section>
  );
};

export default EventBody;
