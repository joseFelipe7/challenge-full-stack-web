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
import { Select } from "@/components/core/Select/Select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  name: z
    .string()
    .min(6, { message: "Nome deve ter pelo menos 6 caracteres" })
    .regex(/^[a-zA-ZáÁéÉíÍóÓúÚâÂêÊîÎôÔûÛãÃõÕçÇ ]+$/, {
      message: "Nome não deve conter números ou símbolos",
    }),
  phone: z
    .string()
    .min(10, { message: "Telefone deve ter pelo menos 10 caracteres" })
    .max(11, { message: "Telefone não deve ter mais de 11 caracteres" }),
  birthdate: z.string(),
  // birthdate: z.date().max(new Date(), {
  //   message: "A data de nascimento não pode ser maior que a data de hoje.",
  // }),
  document: z.string().length(11, { message: "CPF deve conter 11 dígitos." }),
  gender: z.enum(["Female", "Male"], {
    required_error: "O gênero é obrigatório.",
    invalid_type_error: 'O gênero deve ser "Feminino" ou "Masculino".',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function PatientForm() {
  const router = useRouter();

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      birthdate: "",
      phone: "",
      document: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const { email, name, birthdate, phone, document, gender } = data;

    try {
      const response = await axiosInstance.post("/patient", {
        email,
        name,
        birthdate,
        phone,
        document,
        gender,
      });
      router.push("/patient");
      console.log("create patient successful", response.data);
    } catch (error: any) {
      console.error("Error during create patient", error);
      alert(
        `Ocorreu um erro ao Criar o paciente. ${error.response.data.message}`
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
      />
      <Input
        control={control}
        label="Telefone"
        name="phone"
        placeholder="Insira seu telefone"
      />
      <Input
        control={control}
        label="Documento"
        name="document"
        placeholder="Insira seu documento"
      />
      <Input
        control={control}
        label="Data de nascimento"
        name="birthdate"
        placeholder="Insira sea data de nascimento"
      />
      <Select
        name="gender"
        control={control}
        label="Gênero"
        placeholder="Insira seu generot"
        options={[
          { value: "Female", label: "Feminino" },
          { value: "Male", label: "Masculino" },
        ]}
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
