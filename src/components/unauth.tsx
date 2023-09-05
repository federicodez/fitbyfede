"use client";
import { signIn } from "next-auth/react";

export default function Unauth() {
  return <button onClick={() => signIn("google")}>Sign In</button>;
}
