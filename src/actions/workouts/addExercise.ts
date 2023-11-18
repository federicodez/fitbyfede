"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const addExercise = async (
  name: string,
  bodyPart: string,
  category: string,
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const exercise = await prisma.exercise.create({
      data: {
        name,
        bodyPart,
        category,
        userId: currentUser.id,
      },
    });
    return exercise;
  } catch (error) {
    console.log("Error adding exercise ", error);
  }
};
