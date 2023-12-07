"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";
import { revalidatePath } from "next/cache";

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
        equipment: category,
        userId: currentUser.id,
      },
    });
    revalidatePath("/search-workout");
    return exercise;
  } catch (error) {
    console.log("Error adding exercise ", error);
  }
};
