"use server";
import prisma from "@/db";

export const updateSessionDate = async (id: string, date: string) => {
  try {
    const updated = await prisma.workoutSession.update({
      where: {
        id,
      },
      data: {
        createdAt: new Date(date),
      },
    });
    return updated;
  } catch (error) {
    console.log("Error updating session date: ", error);
  }
};
