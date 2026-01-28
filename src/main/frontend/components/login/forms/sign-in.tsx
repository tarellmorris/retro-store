"use client";

import { Button, Form, Input } from "@heroui/react";
import { FormEvent } from "react";

import { FormProps } from "@/app/login/page";

export const SignInForm = ({ formData, setFormData, setStep }: FormProps) => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    setFormData(data);

    try {
      // const res = await fetch(`/api/auth/user/exists?email=${data.email}`);
      // const exists = await res.json();
      //
      // if (exists) {
      //   setStep(StepState.SIGN_IN);
      // } else if (exists === false) {
      //   setStep(StepState.REGISTER);
      // }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2>Welcome back!</h2>
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 w-full">
          <Input
            defaultValue={String(formData.email)}
            errorMessage="Please enter a valid email"
            isRequired
            label="Email"
            name="email"
            type="email"
          />
          <Input
            errorMessage="Please enter a valid password"
            isRequired
            label="Password"
            name="password"
            type="password"
          />
          <Button className="text-zinc-50 mt-8" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
