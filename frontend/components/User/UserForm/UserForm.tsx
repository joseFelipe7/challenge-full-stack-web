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

interface UserFormData {
  name: string;
  password: string;
  email?: string;
}

interface UserFormProps {
  initialValues?: UserFormData;
  id?: string;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número."
    ),
  name: z
    .string()
    .min(6, { message: "Nome deve ter pelo menos 6 caracteres" })
    .regex(/^[a-zA-ZáÁéÉíÍóÓúÚâÂêÊîÎôÔûÛãÃõÕçÇ ]+$/, {
      message: "Nome não deve conter números ou símbolos",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function UserForm({ initialValues, id }: UserFormProps) {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const { name, email, password } = data;

    try {
      if (id) {
        const response = await axiosInstance.put(`/user/${id}`, {
          password,
          name,
        });
        return router.push("/user");
      }

      const response = await axiosInstance.post("/user", {
        email,
        password,
        name,
      });

      console.log("create user successful", response.data);
      router.push("/user");
    } catch (error: any) {
      console.error("Error during user operation", error);
      alert(
        `Ocorreu um erro ao ${id ? "atualizar" : "criar"} o usuário. ${
          error?.response?.data?.message || "Erro desconhecido."
        }`
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
        readOnly={id ? true : false}
      />

      <Input
        control={control}
        label="Senha"
        name="password"
        placeholder="Insira a senha"
      />

      <Flex mt="6" justify="center" gap="3" direction="column">
        <BtnSubmitForm label={initialValues ? "Atualizar" : "Salvar"} />

        <ButtonCore variant="outline" onClick={() => router.back()}>
          Voltar
        </ButtonCore>
      </Flex>
    </Form>
  );
}
