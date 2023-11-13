"use client";

import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

type ForgotCredentialsProps = {
  setForgot: React.Dispatch<React.SetStateAction<boolean>>;
  setVariant: React.Dispatch<React.SetStateAction<Variant>>;
};

const ForgotCredentials = ({
  setForgot,
  setVariant,
}: ForgotCredentialsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const { email } = data;
    try {
      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.status === 400) {
        toast.error("This email is already registered");
      }
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      toast.error("Error, try again");
      console.log(error);
    }
  };
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col justify-center items-center">
          <AiFillLock className="flex items-center backdrop-blur-lg rounded-full text-7xl p-2 border-2 border-white text-white" />
          <h2
            className="
            backdrop-blur-lg
            rounded-md
            w-fit
            mt-6 
            text-center 
            text-lg 
            font-bold 
            tracking-tight 
            text-white
          "
          >
            Trouble logging in?
          </h2>
          <p className="backdrop-blur-lg text-center text-base text-white">
            Enter your email and we&apos;ll send you a link to get back into
            your account.
          </p>
        </div>
      </div>
      <div className="backdrop-blur-lg mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email"
              label="Email address"
              type="email"
            />
            <div>
              <div className="flex justify-center items-center flex-col">
                <Button disabled={isLoading} fullWidth type="submit">
                  {!isLoading ? "Send login link" : "Sending..."}
                </Button>
                <span className="text-center text-sm mt-6 text-white">
                  Can&apos;t reset your password?
                </span>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="line-design px-2 text-white">OR</span>
              </div>
            </div>

            <div className="mt-6 flex"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              onClick={() => {
                setVariant("REGISTER");
                setForgot(false);
              }}
              className=" px-2 text-white cursor-pointer"
            >
              Create new account
            </span>
          </div>
          <div
            className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
          >
            <button
              className="text-center text-white border-2 border-white w-full py-1"
              onClick={() => {
                setVariant("LOGIN");
                setForgot(false);
              }}
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotCredentials;
