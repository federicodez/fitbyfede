"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Profile() {
  const { status, data: session } = useSession();
  console.log({ session, status });
  return (
    <>
      <h1>Profile</h1>
      {status === "authenticated" ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}
    </>
  );
}
