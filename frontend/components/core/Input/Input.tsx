import * as FormRadix from "@radix-ui/react-form";
import { TextField } from "@radix-ui/themes";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
}

export function Input<T extends FieldValues>({
  label,
  placeholder,
  readOnly = false,
  ...props
}: InputProps<T>) {
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
        <TextField.Root
          size="3"
          placeholder={placeholder || label}
          readOnly={readOnly}
          {...field}
        />
      </FormRadix.Control>

      {fieldState.error && (
        <FormRadix.Message className="text-[13px] opacity-[0.8] text-red-500">
          {fieldState.error.message}
        </FormRadix.Message>
      )}
    </FormRadix.Field>
  );
}
