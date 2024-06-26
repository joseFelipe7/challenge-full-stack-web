"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as FormRadix from "@radix-ui/react-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

interface DatePickerProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
}

export function DatePicker<T extends FieldValues>({
  label,
  placeholder,
  ...props
}: DatePickerProps<T>) {
  const { field, fieldState } = useController(props);

  return (
    <FormRadix.Field className="grid mb-[10px]" name={props.name}>
      <div className="flex items-baseline justify-between">
        {label && (
          <FormRadix.Label className="text-[15px] font-medium leading-[35px]">
            {label}
          </FormRadix.Label>
        )}
      </div>

      <FormRadix.Control asChild>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-[240px] pl-3 text-left font-normal ${
                !field.value ? "text-muted-foreground" : ""
              }`}
            >
              {field.value
                ? format(new Date(field.value), "dd/MM/yyyy", { locale: ptBR })
                : placeholder || "Pick a date"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => field.onChange(date)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </FormRadix.Control>

      {fieldState.error && (
        <FormRadix.Message className="text-[13px] opacity-[0.8] text-red-500">
          {fieldState.error.message}
        </FormRadix.Message>
      )}
    </FormRadix.Field>
  );
}
