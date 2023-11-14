"use server";
import prisma from "@/db";

export const changePassword = async (id: string, newPassword: string) => {
  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        hashedPassword: newPassword,
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
