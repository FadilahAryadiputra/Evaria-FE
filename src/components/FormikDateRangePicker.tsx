"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function FormikDateRangePicker({
  className,
  setFieldValue,
  startDateField = "startDate",
  endDateField = "endDate",
}: {
  className?: string;
  setFieldValue: (field: string, value: string | number | boolean | Date | null) => void;
  startDateField?: string;
  endDateField?: string;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  React.useEffect(() => {
    if (date?.from && date?.to) {
      setFieldValue(startDateField, date.from);
      setFieldValue(endDateField, date.to);
    }
  }, [date, setFieldValue, startDateField, endDateField]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Button
            type="button"
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <span className={cn(date?.from && "pr-5")}>
                {date?.from
                  ? date.to && date.from.getTime() !== date.to.getTime()
                    ? `${format(date.from, "MMM dd, yyyy")} - ${format(date.to, "MMM dd, yyyy")}`
                    : format(date.from, "MMM dd, yyyy")
                  : "Pick a date"}
              </span>
            </Button>
            {date?.from && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setDate(undefined);
                  setFieldValue(startDateField, "");
                  setFieldValue(endDateField, "");
                }}
                className="text-muted-foreground absolute right-[1px]"
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}