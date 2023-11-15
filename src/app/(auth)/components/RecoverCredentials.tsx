"use client";

import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import Input from "@/components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { resetPassword } from "@/actions/users/resetPassword";

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      setVariant("LOGIN");
      setForgot(false);
    } catch (error) {
      toast.error("Error, try again");
      console.log("recover error", error);
    }
  };
  return (
    <>
      <div className="mx-5 px-3 pt-5 sm:mx-auto sm:w-full sm:max-w-md rounded-md backdrop-blur-lg overflow-hidden border border-white">
        <div className="flex flex-col justify-center items-center">
          <AiFillLock className="flex items-center backdrop-blur-lg rounded-full text-7xl p-2 border-2 border-white text-white" />
          <div className="flex flex-col justify-center px-3 mt-6 items-center text-center overflow-hidden rounded-md">
            <h2
              className="
            w-fit
            text-center 
            text-2xl 
            font-bold 
            tracking-tight 
            text-white
          "
            >
              Trouble logging in?
            </h2>
            <p className="text-center text-base text-white">
              Enter your email and we&apos;ll send you a link to get back into
              your account.
            </p>
          </div>
        </div>
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
            <div>
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="email"
                label="Email"
                placeholder="Chandler@bing.com"
                type="email"
              />
            </div>
            <div>
              <div className="flex justify-center items-center flex-col">
                <button
                  className="py-2.5 w-full rounded-md bg-blue-400 text-white"
                  disabled={isLoading}
                  type="submit"
                >
                  {!isLoading ? "Send link" : "Sending..."}
                </button>
                <span className="text-center text-sm mt-6 text-white underline">
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
              className=" px-2 text-white cursor-pointer underline"
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
              className="text-center text-white border-2 rounded-md border-white w-full py-2.5 hover:bg-white hover:text-black"
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
