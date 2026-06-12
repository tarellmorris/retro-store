"use client";

import { Button, Form, Input } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

import { FormProps } from "@/app/login/page";
import { useUser } from "@/context/user";

export const RegisterForm = ({ formData, setFormData }: FormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();
  const rawNextPath = searchParams.get("next") ?? "/";
  const nextPath =
    rawNextPath.startsWith("/") && !rawNextPath.startsWith("//")
      ? rawNextPath
      : "/";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    setFormData(data);

    try {
      const req = await fetch(`/api/auth/register`, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!req.ok) {
        const errorData = await req.json().catch(() => ({}));
        console.error("Registration failed:", errorData);
        return;
      }

      const loginReq = await fetch("/api/auth/login", {
        body: JSON.stringify(data),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!loginReq.ok) {
        console.error("Login after registration failed");
        return;
      }

      const userReq = await fetch("/api/auth/me", { credentials: "include" });
      const user = await userReq.json();

      if (!user.error) {
        setUser(user);
      }

      router.push(nextPath);
    } catch (e) {
      console.error("Network or other error:", e);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2>Almost done. Just choose a secure password and start browsing.</h2>
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
