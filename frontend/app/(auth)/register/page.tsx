"use client";

import { RegisterForm } from "@/components/auth/RegisterForm/RegisterForm";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

type FormValues = {
  FirstName: string;
};

const Index = () => {
  return (
    <Card size="4">
      <Flex mb="5" justify="center" align="center" gap="2" direction="column">
        <Heading as="h3" size="6" trim="start">
          MediCare
        </Heading>
        <Text as="div" color="gray" size="2">
          Gerenciador de Pacientes
        </Text>
      </Flex>

      <Box mb="5" position="relative">
        <RegisterForm />
      </Box>
    </Card>
  );
};

export default Index;
