"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Profile() {
  const { status, data: session } = useSession();
  console.log({ session });
  return (
    <>
      {status === "authenticated" ? (
        <button onClick={() => signOut()}></button>
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}
    </>
  );
}
