"use client";

import BtnSubmitForm from "@/components/core/BtnSubmitForm/BtnSubmitForm";
import Form from "@/components/core/Form/Form";
import { Input } from "@/components/core/Input/Input";
import axiosInstance from "@/src/lib/axiosInstance";

import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ButtonCore from "@/components/core/ButtonCore/ButtonCore";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;

    try {
      const response = await axiosInstance.post("/auth", {
        email,
        password,
      });

      // sessionStorage.setItem("token", response?.data?.authorization?.token);
      setCookie("token", response?.data?.authorization?.token);
      console.log("Login successful", response.data);
      router.push("/user");
    } catch (error: any) {
      console.error("Error during login", error);
      alert(`E-mail ou senha incorretos. ${error.response.data.message}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-[260px]">
      <Input
        control={control}
        label="E-mail"
        name="email"
        placeholder="Insira seu e-mail"
      />
      <Input
        control={control}
        label="Senha"
        name="password"
        placeholder="Insira a senha"
      />

      <Flex mt="6" justify="center" gap="3">
        <ButtonCore variant="outline" onClick={() => router.push("/register")}>
          Não tenho conta
        </ButtonCore>
        <BtnSubmitForm label="Entrar" />
      </Flex>
    </Form>
  );
}
