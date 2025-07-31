import { Event } from "@/types/event";
import Link from "next/link";
import { FC } from "react";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  console.log(event);

  // Price Label
  const ticketCount = event.eventTickets?.length || 0;
  const prices = event.eventTickets?.map((ticket) => ticket.price) || [];
  const cheapestPrice = prices.length > 0 ? Math.min(...prices) : null;

  let priceLabel: React.ReactNode = "No tickets available";

  if (ticketCount === 1 && prices[0] !== undefined) {
    priceLabel = (
      <span className="font-bold">Rp{prices[0].toLocaleString()}</span>
    )
  } else if (ticketCount > 1) {
    priceLabel = (
      <>
        Starts from <span className="font-bold">Rp{cheapestPrice?.toLocaleString()}</span>
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
      <div className="flex h-full flex-col overflow-hidden rounded-md border-1 border-gray-300">
        <img src={event.thumbnail} alt={event.title} />
        <div className="flex h-full flex-col justify-between gap-2 px-4 py-2">
          <div>
            <div className="truncate font-bold">{event.title}</div>
            <div className="truncate">
              {formattedStart}
              {!isSameDay && ` - ${formattedEnd}`}
            </div>
            <div className="truncate">
              {priceLabel}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative flex w-full items-center">
              <div className="flex-grow border-t-1 border-gray-300"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="overflow-hidden rounded-full">
                <img
                  src={event.organizer?.profilePicture}
                  alt={event.organizer?.username}
                  className="h-8 w-8"
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
