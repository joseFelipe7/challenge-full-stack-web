
"use client";

import Form from "@/components/core/Form/Form";
import { Input } from "@/components/core/Input/Input";
import { Suspense, useContext, useEffect } from "react";

import * as React from "react";
import { useForm } from "react-hook-form";


type FormValues = {
  FirstName: string;
};

const Login = () =>  {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: ""
    },
    mode: "onChange"
  });
  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}></Form>
    </>
  )
} 

export default Login