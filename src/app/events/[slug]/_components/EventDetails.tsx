"use client";

import { FC, useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import TicketSelector from "./TicketSelector";

interface Ticket {
  id: string;
  title: string;
  description: string;
  price: number;
  limit: number;
}

interface EventDetailsClientProps {
  eventTickets: Ticket[];
}

const EventDetails: FC<EventDetailsClientProps> = ({ eventTickets }) => {
  const [quantities, setQuantities] = useState<{ [ticketId: string]: number }>({});

  const updateQuantity = (ticketId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: quantity,
    }));
  };

  const totalPrice = eventTickets.reduce((acc, ticket) => {
    const qty = quantities[ticket.id] || 0;
    return acc + ticket.price * qty;
  }, 0);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(totalPrice);

  const hasSelection = Object.values(quantities).some((qty) => qty > 0);

  return (
    <>
      <div className="flex flex-col gap-4">
        {eventTickets.map((ticket) => (
          <TicketSelector
            key={ticket.id}
            ticket={ticket}
            quantity={quantities[ticket.id] || 0}
            setQuantity={(qty) => updateQuantity(ticket.id, qty)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-md border-1 border-gray-300 py-4 mt-8">
        <div className="mx-6 flex gap-4 items-center">
          <div className="flex flex-1/12 items-center justify-center">
            <IoTicketOutline className="text-3xl" />
          </div>
          <div className="flex-11/12 text-sm">
            {hasSelection
              ? `You've selected ${Object.values(quantities).reduce((a, b) => a + b, 0)} ticket(s).`
              : "You haven't selected any tickets."}
          </div>
        </div>
        <div className="relative flex w-full items-center px-4">
          <div className="flex-grow border-t-1 border-gray-300"></div>
        </div>
        <div className="mx-6 flex items-center justify-between">
          <div>Total price</div>
          <div>{formattedPrice}</div>
        </div>
        <Button className="mx-4 mt-2">Checkout</Button>
      </div>
    </>
  );
};

export default EventDetails;
