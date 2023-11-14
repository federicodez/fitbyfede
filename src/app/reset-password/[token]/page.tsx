"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components";
import { useSession } from "next-auth/react";
import { verifyToken } from "@/actions/users/verifyToken";
import { changePassword } from "@/actions/email/email";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const { token } = params;
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  console.log("user: ", user);

  useEffect(() => {
    (async () => {
      const user = await verifyToken(token);
      if (user) {
        setUser(user);
      }
    })();
  }, [token]);

  const handleSubmit = async () => {
    if (user?.id) {
      await changePassword(user.id, newPassword);
      router.push("/");
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div>
          <div className="flex justify-center items-center flex-col">
            <Button disabled={isLoading} fullWidth type="submit">
              {!isLoading ? "Reset Password" : "Resetting..."}
            </Button>
            <span className="text-center text-sm mt-6 text-white">
              Can&apos;t reset your password?
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
