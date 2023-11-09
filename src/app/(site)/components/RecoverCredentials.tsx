"use client";

import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import Input from "@/components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ForgotCredentials = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  };
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md wrapper">
      <div className="flex justify-center items-center">
        <AiFillLock className="flex items-center bg-white rounded-full text-7xl p-2 border-2 border-black" />
      </div>
      <h2
        className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
      >
        Trouble logging in?
      </h2>
      <span className="">
        Enter your email and we'll send you a link to get back into your
        account.
      </span>
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
      </form>
    </div>
  );
};

export default ForgotCredentials;
