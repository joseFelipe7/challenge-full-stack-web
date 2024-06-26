"use client";

import { PatientList } from "@/components/Patient/PatientList/PatientList";
import { NavbarCore } from "@/components/core/NavbarCore/NavbarCore";

const Index = () => {
  return (
    <>
      <NavbarCore />

      <main className="ml-60 pt-16 max-h-screen overflow-auto">
        <PatientList />
      </main>
    </>
  );
};

export default Index;
