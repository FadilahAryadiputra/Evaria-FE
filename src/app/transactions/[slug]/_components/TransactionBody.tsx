"use client";

import { FC } from "react";
import { Transaction } from "@/types/transaction";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ClockAlert, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Markdown from "@/components/Markdown";
import Countdown from "./Countdown";
import usePayTransaction from "../../_hooks/usePayTransaction";

interface TransactionBodyProps {
  transaction: Transaction;
}

const TransactionBody: FC<TransactionBodyProps> = ({ transaction }) => {
  const formattedDateFrom = format(
    new Date(transaction.event.startDate),
    "dd MMM yyyy",
  );
  const formattedDateTo = format(
    new Date(transaction.event.endDate),
    "dd MMM yyyy",
  );
  const formattedTimeFrom = format(
    new Date(transaction.event.startTime),
    "HH:mm",
  );
  const formattedTimeTo = format(new Date(transaction.event.endTime), "HH:mm");

  const formattedLocation =
    transaction.event.location.charAt(0) +
    transaction.event.location.slice(1).toLowerCase();

  const { mutateAsync: payTransaction, isPending } = usePayTransaction();

  return (
    <section className="my-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <div className="relative h-[400px] overflow-hidden rounded-md">
            <Image
              src={transaction.event.thumbnail}
              alt="thumbnail"
              className="object-cover"
              fill
            />
            <div className="absolute right-3 bottom-3">
              <div className="bg-primary rounded-lg px-3 font-semibold text-white dark:text-white">
                {transaction.event.category}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="mx-6 text-xl font-bold">
              {transaction.event.title}
            </div>
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
                  src={
                    transaction.event.organizer?.profilePicture ??
                    "/default-avatar.png"
                  }
                  alt={transaction.event.organizer?.username ?? "Organizer"}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="truncate">
                {transaction.event.organizer?.username || "Unknown"}
              </div>
            </div>
          </div>
          <Tabs defaultValue="description">
            <TabsList className="w-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Markdown content={transaction.event.description} />
            </TabsContent>
            <TabsContent value="content">
              <Markdown content={transaction.event.content} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex flex-col gap-6">
          {transaction.status === "WAITING_FOR_CONFIRMATION" && (
            <div className="text-secondary flex items-center justify-center gap-2 rounded-md bg-purple-300 px-4 py-2">
              <ClockAlert className="size-[38px]" />
              <div className="flex flex-col font-semibold">
                Please wait while the admin confirms your payment.
              </div>
            </div>
          )}
          {transaction.status === "WAITING_FOR_PAYMENT" && (
            <div className="text-secondary flex items-center justify-center gap-2 rounded-md bg-amber-200 px-4 py-2">
              <ClockAlert className="size-[38px]" />
              <div className="flex flex-col font-semibold">
                Your order will expire in :
                <Countdown targetDateTime={transaction.expiredAt} />
              </div>
            </div>
          )}
          {transaction.status === "EXPIRED" && (
            <div className="text-secondary flex items-center justify-center gap-2 rounded-md bg-red-400 px-4 py-2">
              <ClockAlert className="size-[38px]" />
              <div className="flex flex-col font-semibold">
                Your order has been expired
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div className="font-bold">Detail Price</div>
            <div className="flex justify-between border-b-1 border-b-gray-300 pb-2">
              <div>Total ticket price</div>
              <div>Rp {transaction.totalPrice}</div>
            </div>
            <div className="flex justify-between">
              <div>Total</div>
              <div>Rp {transaction.totalPrice}</div>
            </div>
          </div>
          {transaction.status === "WAITING_FOR_PAYMENT" && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="default" className="w-full">
                  Pay
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button
                    onClick={async () => {
                      const payload = { transactionId: transaction.id };
                      await payTransaction(payload);
                    }}
                    disabled={isPending}
                  >
                    {isPending ? "Processing..." : "Confirm"}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
          {transaction.status === "WAITING_FOR_CONFIRMATION" && (
            <Button
              onClick={async () => {
                // const payload = { transactionId: transaction.id };
                // await payTransaction(payload);
              }}
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Upload Payment Proof"}
            </Button>
          )}
          <div className="flex flex-col gap-2 border-b-1 border-b-gray-300 pb-2">
            <div className="font-bold">Bank Detail</div>
            <div className="flex justify-between">
              <div>Bank Name</div>
              <div>BCA</div>
            </div>
            <div className="flex justify-between">
              <div>Account Name</div>
              <div>PT. Event Area ID</div>
            </div>
            <div className="flex justify-between">
              <div>Account Number</div>
              <div>123123123</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionBody;
