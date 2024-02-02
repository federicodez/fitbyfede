"use server";
import prisma from "@/db";

export const deleteSession = async (sessionId: string) => {
  try {
    const deleted = await prisma.workoutSession.delete({
      where: { id: sessionId },
    });

    if (!deleted) return null;

    return deleted;
  } catch (err: any) {
    console.log("Error deleting session: ", err);
  }
};
