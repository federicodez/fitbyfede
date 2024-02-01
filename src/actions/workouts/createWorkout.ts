"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const createWorkout = async (
  name: string,
  bodyPartBtn: string,
  categoriesBtn: string,
  sets: string[],
  lbs: number[],
  reps: number[],
) => {
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
      },
    });

    const workout = await prisma.workout.create({
      data: {
        orderId: 1,
        name: name,
        bodyPart: bodyPartBtn,
        target: categoriesBtn,
        sets: sets,
        lbs: lbs,
        reps: reps,
        notes: "",
        userId: currentUser.id,
        workoutSessionId: session.id,
      },
    });

    return workout;
  } catch (error) {
    console.log("Error creating workout: ", error);
  }
};
