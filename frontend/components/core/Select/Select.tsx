import * as FormRadix from "@radix-ui/react-form";
import { Select as SelectRadix } from "@radix-ui/themes";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

interface SelectProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export function Select<T extends FieldValues>({
  label,
  placeholder,
  options,
  ...props
}: SelectProps<T>) {
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
        <SelectRadix.Root
          onValueChange={field.onChange}
          value={field.value || ""}
        >
          <SelectRadix.Trigger variant="surface">
            {field.value ? (
              options.find((option) => option.value === field.value)?.label ||
              placeholder
            ) : (
              <span className="text-gray-500">
                {placeholder || "Select an option"}
              </span>
            )}
          </SelectRadix.Trigger>
          <SelectRadix.Content>
            {options.map((option) => (
              <SelectRadix.Item
                key={option.value}
                value={option.value}
                className="hover:cursor-pointer"
              >
                {option.label}
              </SelectRadix.Item>
            ))}
          </SelectRadix.Content>
        </SelectRadix.Root>
      </FormRadix.Control>

      {fieldState.error && (
        <FormRadix.Message className="text-[13px] opacity-[0.8] text-red-500">
          {fieldState.error.message}
        </FormRadix.Message>
      )}
    </FormRadix.Field>
  );
}
