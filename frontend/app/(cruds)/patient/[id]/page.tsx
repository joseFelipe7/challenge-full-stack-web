"use client";

import { PatientForm } from "@/components/Patient/PatientForm/PatientForm";
import axiosInstance from "@/src/lib/axiosInstance";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface IPatient {
  id: number;
  attributes: {
    name: string;
    email: string;
    document: string;
    phone: string;
    gender: "Female" | "Male";
    birthdate: Date;
  };
}

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [patientData, setPatientData] = useState<IPatient | null>(null);

  const fetchPatientById = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/patient/${id}`);
      console.log("edit", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching patient", error);
      return null;
    }
  };

  useMemo(async () => {
    if (params.id) {
      const patient = await fetchPatientById(params.id);
      setPatientData(patient?.data);
    }
  }, [params.id]);

  return (
    <main className="ml-60 mt-5 pt-16 max-h-screen overflow-auto p-12">
      <Card size="4" className="w-full">
        <Flex mb="5" justify="center" align="center" gap="2" direction="column">
          <Heading as="h3" size="6" trim="start">
            Paciente
          </Heading>
          <Text as="div" color="gray" size="2">
            Edição de Paciente
          </Text>
        </Flex>

        <Box mb="5" position="relative">
          {patientData && (
            <PatientForm
              id={params?.id}
              initialValues={{
                name: patientData.attributes.name,
                email: patientData.attributes.email,
                phone: patientData.attributes.phone,
                gender: patientData.attributes.gender,
                document: patientData.attributes.document,
                birthdate: patientData.attributes.birthdate,
              }}
            />
          )}
        </Box>
      </Card>
    </main>
  );
};

export default Index;
