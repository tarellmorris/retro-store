"use client";

import { Button, Form, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import { FormProps } from "@/app/login/page";

export const SignInForm = ({ formData, setFormData }: FormProps) => {
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    setFormData(data);

    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`,
        {
          body: JSON.stringify(data),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        },
      );
      const res = await req.json();

      if (res.status === 200) {
        router.back();
      }
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
