"use client";

import { UserList } from "@/components/User/UserList/UserList";
import ButtonCore from "@/components/core/ButtonCore/ButtonCore";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  return (
    <>
      <main className="ml-60 pt-16 max-h-screen overflow-auto p-12">
        <Flex mt="6" mb="6" justify="end" gap="3" className="w-full">
          <ButtonCore
            variant="outline"
            onClick={() => router.push("/user/create")}
          >
            Criar
          </ButtonCore>
        </Flex>

        <UserList />
      </main>
    </>
  );
};

export default Index;
