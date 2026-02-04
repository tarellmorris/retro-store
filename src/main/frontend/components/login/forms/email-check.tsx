"use client";

import { Button, Form, Input } from "@heroui/react";
import { FormEvent } from "react";

import { FormProps, StepState } from "@/app/login/page";

export const EmailCheckForm = ({ setFormData, setStep }: FormProps) => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    setFormData(data);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user/exists?email=${data.email}`,
        {
          method: "GET",
        },
      );
      const exists = await res.json();

      if (exists) {
        setStep(StepState.SIGN_IN);
      } else if (exists === false) {
        setStep(StepState.REGISTER);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2>
        Get expedited shipping and exclusive deals. Start by entering an email.
      </h2>
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 w-full">
          <Input
            errorMessage="Please enter a valid email"
            isRequired
            label="Email"
            name="email"
            type="email"
          />
          <Button className="text-zinc-50 mt-8" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
