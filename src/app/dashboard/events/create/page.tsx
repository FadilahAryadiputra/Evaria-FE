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

import { FormikDateRangePicker } from "@/components/FormikDateRangePicker";
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categoryItems, locationItems } from "@/lib/items";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { Trash } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import useCreateEvent from "./_hooks/useCreateEvent";
import { CreateEventFormValues } from "@/types/event";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  content: Yup.string().required("Content is required"),
  startDate: Yup.date().required("Date is required"),
  endDate: Yup.date().required("End date is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
});

export default function Page() {
  const combineDateAndTime = (date: Date, time: string): Date => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, seconds || 0);
    return result;
  };

  const [selectedImage, setSelectedImage] = useState<string>("");

  const onChangeThumbnail = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<CreateEventFormValues>["setFieldValue"]
  ) => {
    const files = e.target.files;

    if (files && files.length) {
      setSelectedImage(URL.createObjectURL(files[0]));
      setFieldValue("thumbnail", files[0]);
    }
  };

  const removeThumbnail = (
    setFieldValue: FormikHelpers<CreateEventFormValues>["setFieldValue"]
  ) => {
    setSelectedImage("");
    setFieldValue("thumbnail", null);
  };

  const { mutateAsync: createEvent, isPending } = useCreateEvent();

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
                <Formik<CreateEventFormValues>
                  initialValues={{
                    title: "",
                    category: "",
                    location: "",
                    description: "",
                    content: "",
                    startDate: null,
                    endDate: null,
                    startTime: "",
                    endTime: "",
                    thumbnail: null,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    if (!values.startDate || !values.endDate) {
                      toast.error("Start and End Date are required");
                      return;
                    }
                    const payload = {
                      ...values,
                      startDate: values.startDate as Date,
                      endDate: values.endDate as Date,
                      startTime: combineDateAndTime(values.startDate, values.startTime),
                      endTime: combineDateAndTime(values.endDate, values.endTime),
                    };
                    await createEvent(payload);
                  }}
                >
                  {({ setFieldValue }) => (
                    <Form className="flex w-full flex-col gap-2 space-y-4 p-4">
                      <div className="text-2xl font-bold">Create Event</div>
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
                            <Label htmlFor="category">Category</Label>
                            <Field name="category">
                              {({ field, form }: FieldProps) => (
                                <Select
                                  value={field.value}
                                  onValueChange={(value) =>
                                    form.setFieldValue("category", value)
                                  }
                                >
                                  <SelectTrigger
                                    id="category"
                                    className="w-full"
                                  >
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categoryItems.map((category, index) => (
                                      <SelectItem key={index} value={category.value}>
                                        {category.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </Field>
                            <ErrorMessage
                              name="category"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Field name="location">
                              {({ field, form }: FieldProps) => (
                                <Select
                                  value={field.value}
                                  onValueChange={(value) =>
                                    form.setFieldValue("location", value)
                                  }
                                >
                                  <SelectTrigger
                                    id="location"
                                    className="w-full"
                                  >
                                    <SelectValue placeholder="Select a location" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {locationItems.map((location, index) => (
                                      <SelectItem key={index} value={location.value}>
                                        {location.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </Field>
                            <ErrorMessage
                              name="location"
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
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="startDate">
                              Select date range
                            </Label>
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
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-4">
                              <div className="flex w-full flex-col gap-2">
                                <Label htmlFor="startTime">Start time</Label>
                                <Field
                                  name="startTime"
                                  as={Input}
                                  type="time"
                                  id="time-picker"
                                  step="1"
                                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                              </div>
                              <div className="flex w-full flex-col gap-2">
                                <Label htmlFor="endTime">End time</Label>
                                <Field
                                  name="endTime"
                                  as={Input}
                                  type="time"
                                  id="time-picker"
                                  step="1"
                                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                              </div>
                            </div>
                            <ErrorMessage
                              name="startTime"
                              component="p"
                              className="text-sm text-red-500"
                            />
                            <ErrorMessage
                              name="endTime"
                              component="p"
                              className="text-sm text-red-500"
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          {/* THUMBNAIL */}
                          {selectedImage ? (
                            <div className="relative w-fit">
                              <Image
                                src={selectedImage}
                                alt="thumbnail"
                                width={300}
                                height={250}
                                className="object-cover"
                              />
                              <Button
                                size="icon"
                                className="absolute -top-2 -right-2 rounded-full bg-red-500"
                                onClick={() => removeThumbnail(setFieldValue)}
                              >
                                <Trash />
                              </Button>
                            </div>
                          ) : (
                            <div className="grid gap-2">
                              <Label htmlFor="thumbnail">Thumbnail</Label>
                              <Input
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  onChangeThumbnail(e, setFieldValue)
                                }
                              />
                              <ErrorMessage
                                name="thumbnail"
                                component="p"
                                className="text-sm text-red-500"
                              />
                            </div>
                          )}
                          {/* Content */}
                          <TiptapRichtextEditor
                            label="Content"
                            name="content"
                          />
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
