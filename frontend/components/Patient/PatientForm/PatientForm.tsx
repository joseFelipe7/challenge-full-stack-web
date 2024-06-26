import BtnSubmitForm from "@/components/core/BtnSubmitForm/BtnSubmitForm";
import ButtonCore from "@/components/core/ButtonCore/ButtonCore";
import { DatePicker } from "@/components/core/DatePicker/DatePicker";
import Form from "@/components/core/Form/Form";
import { Input } from "@/components/core/Input/Input";
import { Select } from "@/components/core/Select/Select";
import axiosInstance from "@/src/lib/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PatientFormData {
  name: string;
  email: string;
  birthdate: Date | null;
  phone: string;
  document: string;
  gender: "Female" | "Male";
}

interface PatientFormProps {
  initialValues?: PatientFormData;
  id?: string;
}

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
  birthdate: z
    .union([z.date(), z.null()])
    .refine((val) => val !== null, {
      message: "A data de nascimento é obrigatória.",
    })
    .refine((val) => val === null || val <= new Date(), {
      message: "A data de nascimento não pode ser maior que a data de hoje.",
    }),
  document: z.string().length(11, { message: "CPF deve conter 11 dígitos." }),
  gender: z.enum(["Female", "Male"], {
    required_error: "O gênero é obrigatório.",
    invalid_type_error: 'O gênero deve ser "Feminino" ou "Masculino".',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function PatientForm({ initialValues, id }: PatientFormProps) {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      birthdate: null,
      phone: "",
      document: "",
      gender: "Female",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const { name, email, birthdate, phone, document, gender } = data;

    try {
      if (id) {
        const response = await axiosInstance.put(`/patient/${id}`, {
          email,
          name,
          birthdate,
          phone,
          gender,
        });
        return router.push("/patient");
      }

      const response = await axiosInstance.post("/patient", {
        email,
        name,
        birthdate,
        phone,
        document,
        gender,
      });
      router.push("/patient");
    } catch (error: any) {
      console.error("Error during patient operation", error);
      alert(
        `Ocorreu um erro ao ${id ? "atualizar" : "criar"} o paciente. ${
          error?.response?.data?.message
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
      <DatePicker
        control={control}
        label="Data de nascimento"
        name="birthdate"
        placeholder="Insira sua data de nascimento"
      />
      <Select
        name="gender"
        control={control}
        label="Gênero"
        placeholder="Selecione o gênero"
        options={[
          { value: "Female", label: "Feminino" },
          { value: "Male", label: "Masculino" },
        ]}
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
