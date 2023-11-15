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
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = await verifyToken(token);
      if (user) {
        setUser(user);
        setIsVerified(true);
      }
    })();
  }, [token]);

  const handleSubmit = async () => {
    setLoading(true);
    if (user?.id) {
      await changePassword(user.id, newPassword);
      setLoading(false);
      router.push("/");
    }
  };

  return isVerified ? (
    <div className="mx-5 my-10 px-5 pt-5 sm:mx-auto sm:w-full sm:max-w-md rounded-md backdrop-blur-lg overflow-hidden border border-white">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-blue-400 font-bold">
            Password
          </label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-white rounded-md pl-2 text-black"
            placeholder="*********"
          />
        </div>
        <div>
          <div className="flex justify-center items-center flex-col">
            <Button disabled={isLoading} fullWidth type="submit">
              {!isLoading ? "Reset Password" : "Resetting..."}
            </Button>
          </div>
        </div>
      </form>
    </div>
  ) : null;
};

export default ResetPassword;
