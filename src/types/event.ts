import { EventTicket } from "./event-ticket";
import { Organizer } from "./organizer";

export interface Event {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  content: string;
  description: string;
  thumbnail: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  organizerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  organizer?: Organizer;
  eventTickets?: EventTicket[];
}

export interface CreateEventFormValues {
  title: string;
  category: string;
  location: string;
  description: string;
  content: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  thumbnail: File | null;
}