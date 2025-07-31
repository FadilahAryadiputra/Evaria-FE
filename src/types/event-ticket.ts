import { Event } from "./event";

export interface EventTicket {
  id: string;
  title: string;
  price: number;
  description: string;
  limit: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}