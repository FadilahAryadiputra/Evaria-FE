import { Event } from "./event";
import { EventTicket } from "./event-ticket";
import { User } from "./user";

enum TransactionStatus {
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  WAITING_FOR_CONFIRMATION = "WAITING_FOR_CONFIRMATION",
  DONE = "FAILED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED"
}

export interface Transaction {
  id: string;
  quantity: number;
  pointUsed: number;
  totalPrice: number;
  paymenProof: string;
  expiredAt: Date;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  userId: string;
  eventId: string;
  eventTicketId: string;

  user: User;
  event: Event;
  eventTicket: EventTicket;
}