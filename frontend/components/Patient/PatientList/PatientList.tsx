"use client";

import {
  Box,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";

import { formatCPF } from "@/src/helpers/cpfHandler";
import axiosInstance from "@/src/lib/axiosInstance";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

interface IPatient {
  id: string;
  attributes: {
    name: string;
    document: string;
  };
}

export function PatientList() {
  const router = useRouter();

  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement>();

  const [patients, setPaients] = useState<IPatient[]>([]);

  useMemo(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/patient");
        setPaients(response.data.data);
      } catch (error) {
        console.error("Error fetching users", error);
        alert("Ocorreu um erro ao listar os pacientes.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <Card size="4" className="w-full">
      <Heading as="h3" size="6" trim="start" mb="2">
        Pacientes
      </Heading>

      <Flex direction="column">
        <Box className="mb-5">
          <Flex gap="4" align="center" className="font-bold">
            <Box width="200px">
              <Text size="2">Nome</Text>
            </Box>
            <Box>
              <Text size="2">CPF</Text>
            </Box>
          </Flex>
        </Box>

        {patients.map((patient, i) => (
          <Box key={i}>
            <Flex gap="4" align="center">
              <Flex gap="3" align="center" width="200px">
                <Link
                  href="#"
                  size="2"
                  wrap="nowrap"
                  onClick={(e) => e.preventDefault()}
                >
                  {patient.attributes.name}
                </Link>
              </Flex>

              <Text size="2" color="gray">
                {formatCPF(patient.attributes.document)}
              </Text>

              <Flex flexGrow="1" justify="end">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton color="gray" variant="ghost">
                      <DotsHorizontalIcon />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    container={portalContainer}
                    variant="soft"
                    onClick={() => router.push(`/patient/${patient?.id}`)}
                  >
                    <DropdownMenu.Item>Editar</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>

            {i !== 4 && (
              <Box>
                <Separator size="4" my="3" />
              </Box>
            )}
          </Box>
        ))}
      </Flex>
    </Card>
  );
}
