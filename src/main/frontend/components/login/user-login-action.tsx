"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  email: string;
  id: number;
}

export const UserLoginAction = () => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/me`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();

        if (!data.error) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
      });
      setUser(null);
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
