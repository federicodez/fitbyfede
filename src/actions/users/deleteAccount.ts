"use server";
import prisma from "@/db";

export const deleteAccount = async (email: string) => {
  try {
    await prisma.user.delete({
      where: { email },
    });
  } catch (error: any) {
    console.log("Error deleting account ", error);
  }
};
