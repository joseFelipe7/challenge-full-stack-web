"use client";

import BtnSubmitForm from "@/components/core/BtnSubmitForm/BtnSubmitForm";
import Form from "@/components/core/Form/Form";
import { Input } from "@/components/core/Input/Input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Defina o esquema de validação com zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-[260px]">
      <Input<FormValues>
        control={control}
        label="E-mail"
        name="email"
        placeholder="Insira seu e-mail"
      />
      <Input<FormValues>
        control={control}
        label="Senha"
        name="password"
        placeholder="Insira a senha"
      />

      <BtnSubmitForm label="Entrar" />
    </Form>
  );
}
