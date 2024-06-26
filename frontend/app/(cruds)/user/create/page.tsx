"use client";

import { UserForm } from "@/components/User/UserForm/UserForm";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

const Index = () => {
  return (
    <main className="ml-60 mt-5 pt-16 max-h-screen overflow-auto p-12">
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
    </main>
  );
};

export default Index;
