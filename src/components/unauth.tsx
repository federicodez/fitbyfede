"use client";
import { Login } from "./index";
import { useSession } from "next-auth/react";

export default function Unauth({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return session === null ? (
    <div>
      <Login />
    </div>
  ) : (
    <div>{children}</div>
  );
}
