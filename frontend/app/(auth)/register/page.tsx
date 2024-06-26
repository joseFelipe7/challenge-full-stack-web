"use client";

import { Suspense } from "react";

import { UserForm } from "@/components/User/UserForm/UserForm";

type FormValues = {
  FirstName: string;
};

const Index = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Suspense>
        <h1>Register</h1>

        <UserForm />
      </Suspense>
    </main>
  );
};

export default Index;
