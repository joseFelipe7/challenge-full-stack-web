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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  name: z
    .string()
    .min(6, { message: "Nome deve ter pelo menos 6 caracteres" })
    .regex(/^[a-zA-ZáÁéÉíÍóÓúÚâÂêÊîÎôÔûÛãÃõÕçÇ ]+$/, {
      message: "Nome não deve conter números ou símbolos",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function UserForm() {
  const router = useRouter();

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const { email, password, name } = data;

    try {
      const response = await axiosInstance.post("/user", {
        email,
        password,
        name,
      });

      console.log("create user successful", response.data);
      router.push("/user");
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data.message);
      console.error("Error during create user", error);
      alert(
        `Ocorreu um erro ao Criar o usuário. ${error.response.data.message}`
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-[260px]">
      <Input
        control={control}
        label="Nome"
        name="name"
        placeholder="Insira seu nome"
      />
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

      <Flex mt="6" justify="center" gap="3" direction="column">
        <BtnSubmitForm label="Salvar" />

        <ButtonCore variant="outline" onClick={() => router.back()}>
          Voltar
        </ButtonCore>
      </Flex>
    </Form>
  );
}
