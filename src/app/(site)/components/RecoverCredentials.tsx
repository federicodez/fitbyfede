"use client";

import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("data: ", data);
  };
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <AiFillLock className="flex items-center bg-white rounded-full text-7xl p-2 border-2 border-black" />
        </div>
        <h2
          className="
            mt-6 
            text-center 
            text-lg 
            font-bold 
            tracking-tight 
            text-gray-900
          "
        >
          Trouble logging in?
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-center text-base">
              Enter your email and we&apos;ll send you a link to get back into
              your account.
            </p>
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
                <span className="text-center text-sm mt-6">
                  Can&apos;t reset your password?
                </span>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div
                className="
                absolute 
                inset-0 
                flex 
                items-center
              "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">OR</span>
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
              className="bg-white px-2 text-gray-500 cursor-pointer"
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
              className="text-center border-2 border-black w-full py-1"
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
