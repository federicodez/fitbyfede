"use client";

import React, { createContext, useContext, useState } from "react";
import { useSession } from "next-auth/react";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  workouts: string[];
};

type UserContext = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const { status, data: session } = useSession();
  const value = { user, setUser, session, status };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
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
