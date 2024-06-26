"use client";

import { Flex } from "@radix-ui/themes";

import { useRouter } from "next/navigation";
import ButtonCore from "../ButtonCore/ButtonCore";

export function NavbarCore() {
  const router = useRouter();

  return (
    <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
      <div className="flex flex-col justify-start h-full">
        <div className="px-4 py-6 text-center border-b h-16">
          <h1 className="text-xl font-bold leading-none">
            <span className="text-[#c4004fe2]">MediCare</span>
          </h1>
        </div>
        <div className="p-4">
          <Flex justify="center" gap="3" direction="column">
            <ButtonCore variant="outline" onClick={() => router.push("/user")}>
              Usuários
            </ButtonCore>

            <ButtonCore
              variant="outline"
              onClick={() => router.push("/patient")}
            >
              Pacientes
            </ButtonCore>
          </Flex>
        </div>
      </div>
    </aside>
  );
}
