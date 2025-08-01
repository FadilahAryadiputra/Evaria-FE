
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
      <div className="flex gap-2">
        <div className="flex flex-8/12 flex-col px-8">
          <div className="relative h-[400px] overflow-hidden rounded-md">
            <Image
              src={event.thumbnail}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
          <div className="my-4">
            <Tabs defaultValue="tickets">
              <TabsList className="w-auto">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
              </TabsList>
              <TabsContent value="description">{event.description}</TabsContent>
              <TabsContent value="tickets">
                <div className="flex flex-col gap-4">
                  <EventDetails eventTickets={event.eventTickets ?? []} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex flex-4/12 flex-col gap-12">
          <div className="flex flex-col gap-4 rounded-md border-1 border-gray-300 py-4">
            <div className="mx-6 text-xl font-bold">{event.title}</div>
            <div className="text-md mx-6 my-4 flex flex-col gap-2">
              <div className="flex gap-4">
                <MapPin />
                {formattedLocation}
              </div>
              <div className="flex gap-4">
                <CalendarDays />
                {formattedDateFrom}
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
          <div className="flex flex-col gap-4 rounded-md border-1 border-gray-300 py-4">
            <div className="mx-6 flex gap-2">
              <div className="flex flex-2/12 items-center justify-center">
                <IoTicketOutline />
              </div>
              <div className="flex-10/12 text-sm">
                You haven't selected any tickets.
              </div>
            </div>
            <div className="relative flex w-full items-center px-4">
              <div className="flex-grow border-t-1 border-gray-300"></div>
            </div>
            <div className="mx-6 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div>Total price</div>
                <div>0</div>
              </div>
            </div>
            <Button className="mx-4 mt-2">Checkout</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBody;
