import { Transaction } from "@/types/transaction";
import { format } from "date-fns";
import { CalendarDays, ChevronRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  //Format dates
  const startDate = new Date(transaction.event.startDate);
  const endDate = new Date(transaction.event.endDate);
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
    <Link href={`/transactions/${transaction.id}`}>
      <div className="flex h-auto overflow-hidden rounded-md border-1 border-gray-300">
        <div className="relative h-auto w-full flex-4/12 overflow-hidden">
          <Image
            src={transaction.event.thumbnail ?? "/default-avatar.png"}
            alt={transaction.event.title ?? "event-thumbnail"}
            className="object-cover"
            fill
          />
        </div>
        <div className="flex h-full flex-8/12 flex-col justify-between gap-2 px-4 py-2">
          <div className="truncate font-bold">{transaction.event.title}</div>
          <div>
            <div className="flex flex-col gap-1 text-[14px] text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-[16px] w-[16px]" />
                {transaction.event.location}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-[16px] w-[16px]" />
                {formattedStart}
                {!isSameDay && ` - ${formattedEnd}`}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-[16px] w-[16px]" />
                {format(transaction.event.startTime, "HH:mm")} - {format(transaction.event.endTime, "HH:mm")}
              </div>
            </div>
          </div>
          <div className="truncate">{transaction.status}</div>
        </div>
        <div className="flex flex-col justify-center gap-2 p-4">
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
};

export default TransactionCard;
