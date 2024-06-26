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

import axiosInstance from "@/src/lib/axiosInstance";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

interface IUser {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  const router = useRouter();

  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement>();

  const [users, setUsers] = useState<IUser[]>([]);

  useMemo(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
        alert("Ocorreu um erro ao listar os usuários.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <Card size="4" className="w-full">
      <Heading as="h3" size="6" trim="start" mb="2">
        Usuários
      </Heading>

      <Flex direction="column">
        {/* users.map... */}
        {[4, 2, 12, 20, 16].map((number, i) => (
          <Box key={number}>
            <Flex gap="4" align="center">
              <Flex gap="3" align="center" width="200px">
                <Link
                  href="#"
                  size="2"
                  wrap="nowrap"
                  onClick={(e) => e.preventDefault()}
                >
                  feh
                </Link>
              </Flex>

              <Text size="2" color="gray">
                email
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
                  >
                    <DropdownMenu.Item>View profile</DropdownMenu.Item>
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
