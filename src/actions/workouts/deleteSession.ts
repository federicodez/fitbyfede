"use server";
import prisma from "@/db";

export const deleteSession = async (sessionId: string) => {
  try {
    await prisma.workoutSession.delete({
      where: { id: sessionId },
    });
  } catch (err: any) {
    console.log("Error deleting session: ", err);
  }
};
