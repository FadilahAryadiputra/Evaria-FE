"use client";

import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Ticket {
  id: string;
  title: string;
  description: string;
  price: number;
  limit: number;
}

interface TicketSelectorProps {
  ticket: Ticket;
  quantity: number;
  setQuantity: (qty: number) => void;
}

const TicketSelector: FC<TicketSelectorProps> = ({ ticket, quantity, setQuantity }) => {
  const increment = () => {
    if (quantity < ticket.limit) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <div className="flex flex-col gap-2 rounded-md border-1 border-gray-300 p-4">
      <div className="flex justify-between gap-2">
        <div className="text-xl font-bold">{ticket.title}</div>
        <Badge variant="outline">Stock: {ticket.limit}</Badge>
      </div>
      <div>{ticket.description}</div>
      <div className="relative flex w-full items-center">
        <div className="flex-grow border-t-1 border-gray-300"></div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="font-bold">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(ticket.price)}
        </div>
        <div className="grid grid-cols-3 items-center justify-center gap-2">
          <Button variant="outline" onClick={decrement} disabled={quantity <= 0}>
            -
          </Button>
          <div className="text-center">{quantity}</div>
          <Button variant="outline" onClick={increment} disabled={quantity >= ticket.limit}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelector;
