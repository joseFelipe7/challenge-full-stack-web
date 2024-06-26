"use client";

import { UserForm } from "@/components/User/UserForm/UserForm";
import axiosInstance from "@/src/lib/axiosInstance";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface IUser {
  id: string;
  attributes: {
    name: string;
    password: string;
    email: string;
  };
}

const Index = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUser | null>(null);

  const fetchPatientById = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/user/${id}`);
      console.log("edit", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user", error);
      return null;
    }
  };

  useMemo(async () => {
    if (params.id) {
      const user = await fetchPatientById(params.id);
      setUserData(user?.data);
    }
  }, [params.id]);

  return (
    <main className="ml-60 mt-5 pt-16 max-h-screen overflow-auto p-12">
      <Card size="4" className="w-full">
        <Flex mb="5" justify="center" align="center" gap="2" direction="column">
          <Heading as="h3" size="6" trim="start">
            Usuário
          </Heading>
          <Text as="div" color="gray" size="2">
            Edição de Usuário
          </Text>
        </Flex>

        <Box mb="5" position="relative">
          {userData && (
            <UserForm
              id={params?.id}
              initialValues={{
                name: userData.attributes.name,
                password: userData.attributes.password,
                email: userData.attributes.email,
              }}
            />
          )}
        </Box>
      </Card>
    </main>
  );
};

export default Index;
