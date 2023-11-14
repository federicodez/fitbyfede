"use server";
import prisma from "@/db";
import crypto from "crypto";

export const verifyToken = async (token: string) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.user.findUnique({
    where: { resetToken: hashedToken },
  });

  console.log("server user ", user);

  if (!user) {
    return null;
  }

  return user;
};
