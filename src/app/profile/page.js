"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Login } from "@/components";

export default function Profile() {
  const { data: session, status } = useSession();
  console.log("profile: ", { session, status });
  return (
    <>
      <h1>Profile</h1>
      <p>Hello {session?.user?.name}</p>
      {status === "authenticated" ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <Login />
      )}
    </>
  );
}
