"use server";
import prisma from "@/db";

export const updateSessionDate = async (id: string, date: string) => {
  try {
    await prisma.workoutSession.update({
      where: {
        id,
      },
      data: {
        createdAt: new Date(date),
      },
    });
  } catch (error) {
    console.log("Error updating session date: ", error);
  }
};
