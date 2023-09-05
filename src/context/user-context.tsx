"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContext = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const { status, data: session } = useSession();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const value = { status, session, user, setUser };

  return (
    <UserContext.Provider value={{ value }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within an UserContextProvider",
    );
  }
  return context;
}
