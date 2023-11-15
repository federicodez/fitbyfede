"use server";
import prisma from "@/db";
import crypto from "crypto";
import sendEmail from "@/libs/email";

export const resetPassword = async (email: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw new Error("Email doesn't exist.");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = Date.now() + 360000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  const msg = "Reset Password by clicking on following url: " + resetUrl;

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      resetToken: existingUser.resetToken,
      resetTokenExpiry: existingUser.resetTokenExpiry,
    },
  });

  await sendEmail({
    to: email,
    subject: "Reset Password",
    text: msg,
  });

  return "Password reset email sent";
};
