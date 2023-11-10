"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/inputs/Input";
import ForgotCredentials from "./RecoverCredentials";
import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/workouts");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

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

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          }),
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/workouts");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/workouts");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/workouts");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return !forgot ? (
    <>
      <div className="flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
            mt-6 
            backdrop-blur-lg
            w-fit
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-white
          "
        >
          {variant === "LOGIN"
            ? "Sign in to your account"
            : "Create your account"}
        </h2>
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
          <form className="space-y-6  p-2" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="name"
                label="Name"
              />
            )}
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email"
              label="Email address"
              type="email"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="password"
              label="Password"
              type="password"
            />
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex flex-row gap-5 justify-center items-center rounded-full w-full text-white bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
              >
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="line-design px-2 text-white">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="my-6 flex">
              <button
                className="flex flex-row gap-5 justify-center items-center bg-white rounded-full w-full text-black"
                onClick={() => socialAction("google")}
              >
                <FcGoogle />
                SIGN IN WITH GOOGLE
              </button>
            </div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              onClick={() => setForgot(true)}
              className="px-2 text-white cursor-pointer"
            >
              Forgot password?
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
            text-white
          "
          >
            <div className="">
              {variant === "LOGIN"
                ? "New to FitbyFede?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <ForgotCredentials setForgot={setForgot} setVariant={setVariant} />
  );
};

export default AuthForm;
