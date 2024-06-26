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
  attributes: {
    id: number;
    name: string;
    email: string;
  };
}
// interface IUser {
//   data: Array<{
//     id: number;
//     name: string;
//     email: string;
//   }>;
//   meta: {
//     total: number;
//     page: number;
//     per_page: number;
//     first_page: number;
//     last_page: number;
//   };
// }

export function UserList() {
  const router = useRouter();

  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement>();

  const [users, setUsers] = useState<IUser[]>([]);

  useMemo(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        console.log(response.data);
        console.log(response.data.data);
        setUsers(response.data.data);
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
        {users.map((user, i) => (
          <Box key={i}>
            <Flex gap="4" align="center">
              <Flex gap="3" align="center" width="200px">
                <Link
                  href="#"
                  size="2"
                  wrap="nowrap"
                  onClick={(e) => e.preventDefault()}
                >
                  {user.attributes.name}
                </Link>
              </Flex>

              <Text size="2" color="gray">
                {user.attributes.email}
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
