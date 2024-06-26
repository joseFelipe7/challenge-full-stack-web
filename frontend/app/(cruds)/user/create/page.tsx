"use client";

import { UserForm } from "@/components/User/UserForm/UserForm";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

const Index = () => {
  return (
    <Card size="4" className="w-full">
      <Flex mb="5" justify="center" align="center" gap="2" direction="column">
        <Heading as="h3" size="6" trim="start">
          Usuário
        </Heading>
        <Text as="div" color="gray" size="2">
          Criação de Usuário
        </Text>
      </Flex>

      <Box mb="5" position="relative">
        <UserForm />
      </Box>
    </Card>
  );
};

export default Index;
