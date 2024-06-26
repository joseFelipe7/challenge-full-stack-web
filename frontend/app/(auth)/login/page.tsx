"use client";

import { Suspense } from "react";

import { LoginForm } from "@/components/auth/LoginForm/LoginForm";

type FormValues = {
  FirstName: string;
};

const Index = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Suspense>
        <h1>Login</h1>

        <LoginForm />
      </Suspense>
    </main>
  );
};

export default Index;
