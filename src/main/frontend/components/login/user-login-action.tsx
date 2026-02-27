"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useUser } from "@/context/userContext";

export const UserLoginAction = () => {
  const { loading, setUser, user } = useUser();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        credentials: "include",
        method: "POST",
      });
      setUser(null);
      location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <Button className="flex gap-2 items-center" onPress={handleLogout}>
        <span className="text-medium font-bold text-zinc-50">Logout</span>
        <Image
          alt="user"
          height={25}
          preload={true}
          src={"/user.svg"}
          width={25}
        />
      </Button>
    );
  }

  return (
    <Button as={Link} className="flex gap-2 items-center" href="/login">
      <span className="text-medium font-bold text-zinc-50">Login</span>
      <Image
        alt="user"
        height={25}
        preload={true}
        src={"/user.svg"}
        width={25}
      />
    </Button>
  );
};
