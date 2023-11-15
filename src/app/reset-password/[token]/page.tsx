"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components";
import { verifyToken } from "@/actions/users/verifyToken";
import { changePassword } from "@/actions/email/email";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const { password } = data;
    if (user?.id) {
      await changePassword(user.id, password);
      setLoading(false);
      router.push("/");
    }
  };

  return isVerified ? (
    <div className="mx-5 my-10 px-5 py-5 sm:mx-auto sm:w-full sm:max-w-md rounded-md backdrop-blur-lg overflow-hidden border border-white">
      <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            placeholder="*********"
            type="password"
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
