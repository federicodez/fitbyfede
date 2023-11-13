"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { SuccessModal } from "@/components/models/SuccessModal";
import { ErrModal } from "@/components/models/ErrModal";
import { useRouter } from "next/router";
import { AiFillLock } from "react-icons/ai";
import Input from "@/components/inputs/Input";
import { Button } from "@/components";
import { authEndpoints } from "../libs/endpoints";
import { ResetPassword } from "../components/ResetPassword";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    string | null
  >(null);
  const [resetPasswordError, setResetPasswordError] = useState("");

  const {
    query: { token, email },
    ...router
  } = useRouter();

  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: authEndpoints.resetPassword,
        data: {
          token,
          email,
          password: newPassword,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResetPasswordSuccess(response.data.msg);
      setLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 4000);
      setResetPasswordError("");
    } catch (error: any) {
      setLoading(false);
      setResetPasswordError(error.response.data.msg);
      setResetPasswordSuccess(null);
    }
  };

  return (
    <div>
      {email && token ? (
        <div className="auth-wrapper">
          {resetPasswordSuccess ? (
            <SuccessModal message={resetPasswordSuccess} />
          ) : null}
          {resetPasswordError ? (
            <ErrModal message={resetPasswordError} />
          ) : null}
          <form onSubmit={resetPassword} className="reset-password">
            <h1>Reset Password</h1>
            <p>Please enter your new password</p>
            <div>
              <label htmlFor="password">Password*</label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="enter new pasword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button name="reset-pwd-button" className="reset-pwd">
              {!isLoading ? "Reset" : "Processing..."}
            </button>
          </form>
        </div>
      ) : (
        <ResetPassword />
      )}
    </div>
  );
};

export default ForgotPassword;
