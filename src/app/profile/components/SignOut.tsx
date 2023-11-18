"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  return (
    <button
      className="sign-out-btn"
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOut;
