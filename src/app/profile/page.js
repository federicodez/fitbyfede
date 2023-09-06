"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Profile() {
  // const { status, data: session } = useSession();
  const { data: session, status } = useSession();
  // console.log("profile: ", { session, status });
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
