"use client";

import { PatientList } from "@/components/Patient/PatientList/PatientList";
import ButtonCore from "@/components/core/ButtonCore/ButtonCore";
import { Flex } from "@radix-ui/themes";

const Index = () => {
  return (
    <>
      <div className="relative overflow-hidden max-h-screen w-full">
        <nav className="fixed right-0 top-0 left-60 bg-white shadow-sm py-3 px-4 h-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition"
              >
                <span className="text-sm">Usuário</span>
              </button>
            </div>
          </div>
        </nav>

        <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
          <div className="flex flex-col justify-start h-full">
            <div className="px-4 py-6 text-center border-b h-16">
              <h1 className="text-xl font-bold leading-none">
                <span className="text-[#c4004fe2]">MediCare</span>
              </h1>
            </div>
            <div className="p-4">
              <Flex justify="center" gap="3" direction="column">
                <ButtonCore
                  variant="outline"
                  onClick={() => console.log("user")}
                >
                  Usuários
                </ButtonCore>

                <ButtonCore
                  variant="outline"
                  onClick={() => console.log("patient")}
                >
                  Pacientes
                </ButtonCore>
              </Flex>
            </div>
          </div>
        </aside>

        <main className="ml-60 pt-16 max-h-screen overflow-auto">
          <PatientList />
        </main>
      </div>
    </>
  );
};

export default Index;
