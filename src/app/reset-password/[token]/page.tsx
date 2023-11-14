"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components";
import { useSession } from "next-auth/react";

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const { token } = params;
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const { data: session, status: sessionStatus } = useSession();

  console.log("token: ", token);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        });
        if (res.status === 400) {
          setError("Invalid token or has expired");
          setVerified(true);
        }
        if (res.status === 200) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error: any) {
        setError("Error, try again");
        console.log(error);
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = () => {};

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input required id="password" type="password" name="password" />
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
