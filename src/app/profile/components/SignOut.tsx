"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const { data: session } = useSession();

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
