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
        .catch((error) => {
          console.log("authform error", error);
          toast.error("Something went wrong!");
        })
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
      <div className="mx-5 px-5 pt-5 sm:mx-auto sm:w-full sm:max-w-md rounded-md backdrop-blur-lg overflow-hidden border border-white">
        <h2
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-white
          "
        >
          {variant === "LOGIN" ? (
            <div className="flex flex-col text-center">
              <p className="text-3xl">Welcome Back!</p>
              <p className="text-lg font-normal">Sign in to your account</p>
            </div>
          ) : (
            "Create your account"
          )}
        </h2>
        <div
          className="
          py-8
          shadow
          sm:rounded-lg
        "
        >
          <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="chandler@bing.com"
              type="email"
            />
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
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex flex-row py-2.5 gap-5 justify-center items-center rounded-md w-full text-white bg-blue-400 hover:bg-sky-600 focus-visible:outline-sky-600"
              >
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="line-design px-2 text-white">OR</span>
              </div>
            </div>

            <div className="my-6 flex">
              <button
                className="flex flex-row gap-5 py-2.5 justify-center items-center bg-white rounded-md w-full text-black text-base"
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
            <div>
              {variant === "LOGIN" ? (
                <p className="text-blue-400">New to FitbyFede?</p>
              ) : (
                <p>Already have an account?</p>
              )}
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
