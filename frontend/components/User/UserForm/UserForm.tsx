"use client";

import BtnSubmitForm from "@/components/core/BtnSubmitForm/BtnSubmitForm";
import Form from "@/components/core/Form/Form";
import { Input } from "@/components/core/Input/Input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormValues } from "../types";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function UserForm() {
  // 1. Define your form.
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     username: "",
  //   },
  // })

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-[260px]">
      <Input control={control} name="FirstName" />
      {/* rules={{ required: true }} */}

      <BtnSubmitForm label="Entrar" />
    </Form>
  );
}
