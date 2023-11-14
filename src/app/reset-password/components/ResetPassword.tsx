import React, { useState, FormEvent } from "react";
import axios from "axios";
import { ErrModal } from "@/components/models/ErrModal";
import { SuccessModal } from "@/components/models/SuccessModal";
import { authEndpoints } from "../libs/endpoints";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResestSuccess] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  const handleForgot = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: authEndpoints.recover,
        data: {
          email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResestSuccess(response.data.msg);
      setLoading(false);
      setResetError("");
    } catch (error: any) {
      setLoading(false);
      const { data } = error.response;
      setResetError(data.msg);
      setResestSuccess(null);
    }
  };

  return (
    <div>
      {resetError ? <ErrModal message={resetError} /> : null}
      {resetSuccess ? <SuccessModal message={resetSuccess} /> : null}
      <form onSubmit={handleForgot} className="reset-password">
        <h1>Forgot Password</h1>
        <p>You are not alone. We’ve all been here at some point.</p>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button name="reset-pwd-button" className="reset-pwd">
          {!loading ? "Get secure link" : "Sending..."}
        </button>
      </form>
    </div>
  );
};
