"use client";

import { PatientForm } from "@/components/Patient/PatientForm/PatientForm";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

const Index = () => {
  return (
    <Card size="4" className="w-full">
      <Flex mb="5" justify="center" align="center" gap="2" direction="column">
        <Heading as="h3" size="6" trim="start">
          Paciente
        </Heading>
        <Text as="div" color="gray" size="2">
          Criação de Paciente
        </Text>
      </Flex>

      <Box mb="5" position="relative">
        <PatientForm />
      </Box>
    </Card>
  );
};

export default Index;
