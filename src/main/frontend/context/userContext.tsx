import React, { createContext, useContext, useEffect, useState } from "react";

import { User } from "@/@types/user";

interface UserContextValue {
  loading: boolean;
  setUser: (user: null | User) => void;
  user: null | User;
}

const UserContext = createContext<undefined | UserContextValue>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      setUser(!data.error ? data : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ loading, setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
};
