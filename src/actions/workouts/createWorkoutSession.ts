"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const createWorkoutSession = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }
    const date = new Date().getHours();
    let timer;
    if (date < 12) {
      timer = "Morning Workout";
    } else if (date < 15) {
      timer = "Midday Workout";
    } else if (date < 18) {
      timer = "Afternoon Workout";
    } else {
      timer = "Evening Workout";
    }
    const session = await prisma.workoutSession.create({
      data: {
        userId: currentUser.id,
        name: timer,
        time: 0,
        notes: "",
      },
    });
    return session;
  } catch (err: any) {
    console.log("Error creating workout session: ", err);
  }
};
