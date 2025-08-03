import { Event } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  // Price Label
  const ticketCount = event.eventTickets?.length || 0;
  const prices = event.eventTickets?.map((ticket) => ticket.price) || [];
  const cheapestPrice = prices.length > 0 ? Math.min(...prices) : null;

  let priceLabel: React.ReactNode = "No tickets available";

  if (ticketCount === 1 && prices[0] !== undefined) {
    priceLabel = (
      <span className="font-bold">Rp{prices[0].toLocaleString()}</span>
    );
  } else if (ticketCount > 1) {
    priceLabel = (
      <>
        Starts from{" "}
        <span className="font-bold">Rp{cheapestPrice?.toLocaleString()}</span>
      </>
    );
  }

  //Format dates
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);
  const isSameDay = startDate.toDateString() === endDate.toDateString();

  return (
    <Link href={`/events/${event.slug}`}>
      <div className="flex h-auto flex-col overflow-hidden rounded-md border-1 border-gray-300">
        {/* <div className="relative overflow-hidden h-[200px]">
          <img src={event.thumbnail} alt={event.title} />
        </div> */}
        <div className="relative h-[160px] w-full overflow-hidden">
          <Image
            src={event.thumbnail ?? "/default-avatar.png"}
            alt={event.title ?? "event-thumbnail"}
            className="object-cover"
            fill
          />
        </div>
        <div className="flex h-full flex-col justify-between gap-2 px-4 py-2">
          <div>
            <div className="truncate font-bold">{event.title}</div>
            <div className="truncate">
              {formattedStart}
              {!isSameDay && ` - ${formattedEnd}`}
            </div>
            <div className="truncate">{priceLabel}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative flex w-full items-center">
              <div className="flex-grow border-t-1 border-gray-300"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={event.organizer?.profilePicture ?? "/default-avatar.png"}
                  alt={event.organizer?.username ?? "organizer-avatar"}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="truncate">
                {event.organizer?.username || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
