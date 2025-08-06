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

import { FormikDateRangePicker } from "@/components/FormikDateRangePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateEventVoucherFormValues } from "@/types/event";
import { EventTicket } from "@/types/event-ticket";
import { Organizer } from "@/types/organizer";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useCreateEventVoucher from "./_hooks/useCreateVoucher";
import { toast } from "sonner";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .moreThan(0, "Discount must be greater than 0")
    .required("Discount is required"),
  quota: Yup.number()
    .typeError("Quota must be a number")
    .moreThan(0, "Quota must be greater than 0")
    .required("Quota is required"),
  startDate: Yup.date().required("Date is required"),
  endDate: Yup.date().required("End date is required"),
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

export default function CreateEventVoucher() {
  const { mutateAsync: createEventVoucher, isPending } =
    useCreateEventVoucher();

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

  const generateRandomCode = (length = 8) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  };

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
                <Formik<CreateEventVoucherFormValues>
                  initialValues={{
                    code: "",
                    discount: 0,
                    quota: 0,
                    startDate: null,
                    endDate: null,
                    eventId: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    if (!values.startDate || !values.endDate) {
                      toast.error("Start and end date are required");
                      return;
                    }
                    const payload = {
                      ...values,
                      discount: Number(values.discount),
                      quota: Number(values.quota),
                      startDate: values.startDate as Date,
                      endDate: values.endDate as Date,
                    };
                    await createEventVoucher(payload);
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="flex w-full flex-col gap-2 space-y-4 p-4">
                      <div className="text-2xl font-bold">
                        Create Voucher
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex w-full flex-col gap-4">
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
                            <Label htmlFor="code">Code</Label>
                            <div className="flex gap-2">
                              <div className="flex w-full flex-col gap-2">
                                <Field
                                  name="code"
                                  as={Input}
                                  type="text"
                                  placeholder="Code"
                                />
                                <ErrorMessage
                                  name="code"
                                  component="p"
                                  className="text-sm text-red-500"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  const newCode = generateRandomCode();
                                  setFieldValue("code", newCode);
                                }}
                              >
                                Generate
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="startDate">Select date range</Label>
                            <FormikDateRangePicker
                              setFieldValue={setFieldValue}
                              className="w-full"
                            />
                            <ErrorMessage
                              name="startDate"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="discount">Discont value</Label>
                            <Field
                              as={Input}
                              name="discount"
                              type="number"
                              inputMode="numeric"
                              maxLength={9}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                let value = e.target.value;
                                if (value === "") {
                                  setFieldValue("discount", value);
                                  return;
                                }
                                if (/^\d+$/.test(value)) {
                                  if (
                                    value.length > 1 &&
                                    value.startsWith("0")
                                  ) {
                                    value = value.replace(/^0+/, "");
                                  }
                                  setFieldValue("discount", value);
                                }
                              }}
                              value={values.discount}
                            />
                            <ErrorMessage
                              name="discount"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="quota">Limit</Label>
                            <Field
                              as={Input}
                              name="quota"
                              type="number"
                              inputMode="numeric"
                              maxLength={9}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                let value = e.target.value;
                                if (value === "") {
                                  setFieldValue("quota", value);
                                  return;
                                }
                                if (/^\d+$/.test(value)) {
                                  if (
                                    value.length > 1 &&
                                    value.startsWith("0")
                                  ) {
                                    value = value.replace(/^0+/, "");
                                  }
                                  setFieldValue("quota", value);
                                }
                              }}
                              value={values.quota}
                            />
                            <ErrorMessage
                              name="quota"
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
