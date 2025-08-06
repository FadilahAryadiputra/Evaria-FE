"use client";

import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumbs from "@/components/DynamicBreadcrumbs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { axiosInstance } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateEventTicketFormValues } from "@/types/event";
import { EventTicket } from "@/types/event-ticket";
import { Organizer } from "@/types/organizer";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useCreateEventTicket from "./_hooks/useCreateTicket";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  description: Yup.string().required("Description is required"),
  limit: Yup.number()
    .typeError("Limit must be a number")
    .moreThan(0, "Limit must be greater than 0")
    .required("Limit is required"),
  eventId: Yup.string().required("Event is required"),
});

type OrganizerEvent = {
  id: string;
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
};

export default function CreateEventTicket() {
  const { mutateAsync: createEventTicket, isPending } = useCreateEventTicket();

  const [events, setEvents] = useState<OrganizerEvent[]>([]);

  const getOrganizerEvents = async () => {
    const raw = localStorage.getItem("Evaria");
    const token = raw ? JSON.parse(raw).state?.user?.accessToken : null;

    try {
      const response = await axiosInstance.get(
        "/event-tickets/get-organizer-events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const eventData = response.data;

      if (Array.isArray(eventData)) {
        setEvents(eventData);
      } else {
        console.warn("Unexpected event data:", eventData);
        setEvents([]);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    getOrganizerEvents();
  }, []);

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
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <Formik<CreateEventTicketFormValues>
                  initialValues={{
                    title: "",
                    price: 0,
                    description: "",
                    limit: 0,
                    eventId: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    const payload = {
                      ...values,
                      price: Number(values.price),
                      limit: Number(values.limit),
                    };
                    await createEventTicket(payload);
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="flex w-full flex-col gap-2 space-y-4 p-4">
                      <div className="text-2xl font-bold">
                        Create Event Ticket
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex w-full flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Field
                              name="title"
                              as={Input}
                              type="text"
                              placeholder="Title"
                            />
                            <ErrorMessage
                              name="title"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Field
                              as={Input}
                              name="price"
                              type="number"
                              inputMode="numeric"
                              maxLength={9}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                let value = e.target.value;
                                if (value === "") {
                                  setFieldValue("price", value);
                                  return;
                                }
                                if (/^\d+$/.test(value)) {
                                  if (
                                    value.length > 1 &&
                                    value.startsWith("0")
                                  ) {
                                    value = value.replace(/^0+/, "");
                                  }
                                  setFieldValue("price", value);
                                }
                              }}
                              value={values.price}
                            />
                            <ErrorMessage
                              name="price"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="limit">Limit</Label>
                            <Field
                              as={Input}
                              name="limit"
                              type="number"
                              inputMode="numeric"
                              maxLength={9}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                let value = e.target.value;
                                if (value === "") {
                                  setFieldValue("limit", value);
                                  return;
                                }
                                if (/^\d+$/.test(value)) {
                                  if (
                                    value.length > 1 &&
                                    value.startsWith("0")
                                  ) {
                                    value = value.replace(/^0+/, "");
                                  }
                                  setFieldValue("limit", value);
                                }
                              }}
                              value={values.limit}
                            />
                            <ErrorMessage
                              name="limit"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="eventId">Event</Label>
                            <Field name="eventId">
                              {({ field, form }: FieldProps) => (
                                <Select
                                  value={field.value}
                                  onValueChange={(value) =>
                                    form.setFieldValue("eventId", value)
                                  }
                                >
                                  <SelectTrigger
                                    id="eventId"
                                    className="w-full"
                                  >
                                    <SelectValue placeholder="Select a event" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {events?.map((event) => (
                                      <SelectItem
                                        key={event.id}
                                        value={event.id}
                                      >
                                        {event.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </Field>
                            <ErrorMessage
                              name="eventId"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Field
                              name="description"
                              as={Textarea}
                              type="text"
                              placeholder="Description"
                            />
                            <ErrorMessage
                              name="description"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button
                              type="submit"
                              variant={"outline"}
                              disabled={isPending}
                            >
                              {isPending ? "Loading" : "Submit"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
