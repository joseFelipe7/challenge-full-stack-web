"use client";

import { Suspense } from "react";

import { UserForm } from "@/components/User/UserForm/UserForm";

type FormValues = {
  FirstName: string;
};

const Index = () => {
  return (
    <Suspense>
      <h1>Login</h1>

      <UserForm />
    </Suspense>
  );
};

export default Index;
