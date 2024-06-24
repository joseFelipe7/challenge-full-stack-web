import * as FormRadix from "@radix-ui/react-form";
import { TextField } from "@radix-ui/themes";
import { UseControllerProps, useController } from "react-hook-form";

type FormValues = {
  FirstName: string;
};

export function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);

  return (
    <FormRadix.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <FormRadix.Label className="text-[15px] font-medium leading-[35px]">
          Email
        </FormRadix.Label>

        <FormRadix.Message
          className="text-[13px] opacity-[0.8]"
          match="valueMissing"
        >
          Please enter your email
        </FormRadix.Message>

        <FormRadix.Message
          className="text-[13px] opacity-[0.8]"
          match="typeMismatch"
        >
          {fieldState.invalid ? "OK" : "Please provide a valid email"}
        </FormRadix.Message>
      </div>

      <FormRadix.Control asChild>
        {/* <input
          className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
          {...field}
          placeholder={props.name}
        /> */}
        <TextField.Root size="3" placeholder={props.name} {...field} />
      </FormRadix.Control>
    </FormRadix.Field>
  );
}
