"use client";

import { UserList } from "@/components/User/UserList/UserList";
import { NavbarCore } from "@/components/core/NavbarCore/NavbarCore";

const Index = () => {
  return (
    <>
      <NavbarCore />

      <main className="ml-60 pt-16 max-h-screen overflow-auto">
        <UserList />
      </main>
    </>
  );
};

export default Index;
