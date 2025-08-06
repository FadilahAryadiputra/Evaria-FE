"use client";

import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumbs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { EventTicket } from "@/types/event-ticket";
import { Organizer } from "@/types/organizer";
import { User } from "@/types/user";
import { AlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import useAcceptTransaction from "./_hooks/useAcceptTransaction";

type PendingTransactions = {
  id: string;
  quantity: number;
  pointused: number;
  totalPrice: number;
  paymentProof: string;
  expiredAt: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  user?: User;
  organizer?: Organizer;
  event?: Event;
  eventTicket?: EventTicket;
};

export default function Page() {
  const [transactions, setTransactions] = useState<PendingTransactions[]>([]);

  const getPendingTransactions = async () => {
    const raw = localStorage.getItem("Evaria");
    const token = raw ? JSON.parse(raw).state?.user?.accessToken : null;

    try {
      const response = await axiosInstance.get(
        "/transactions/get-pending-transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const transactionsData = response.data;

      if (Array.isArray(transactionsData)) {
        setTransactions(transactionsData);
      } else {
        console.warn("Unexpected transactions data:", transactionsData);
        setTransactions([]);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    getPendingTransactions();
  }, []);

  const { mutateAsync: acceptTransaction } = useAcceptTransaction();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <ScrollArea className="m-8 w-[160vh] rounded-md border whitespace-nowrap">
              <Table>
                <TableCaption className="mb-4">
                  A list of your recent orders.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Event</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Point Used</TableHead>
                    <TableHead>Final Price</TableHead>
                    <TableHead>Payment Proof</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions?.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.event?.title}
                      </TableCell>
                      <TableCell>{transaction.user?.email}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell>{transaction.pointused | 0}</TableCell>
                      <TableCell>{transaction.totalPrice}</TableCell>
                      <TableCell>View</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <AlignJustify />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={async () => {
                                const payload = { transactionId: transaction.id };
                                await acceptTransaction(payload);
                              }}
                            >
                              Accept Order
                            </DropdownMenuItem>
                            <DropdownMenuItem>Decline Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
