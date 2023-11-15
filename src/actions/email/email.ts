"use server";
import prisma from "@/db";
import bcrypt from "bcrypt";

export const changePassword = async (id: string, newPassword: string) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await prisma.user.update({
      where: { id },
      data: {
        hashedPassword,
      },
    });
    if (!updated) {
      return null;
    }
    return updated;
  } catch (error) {
    console.log("Error updating password ", error);
  }
};
