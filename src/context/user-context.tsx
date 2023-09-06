"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { prisma } from "@/db";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContext = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

type User = {
  id: string;
  name: string;
  email: string;
  workouts: string[];
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
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
