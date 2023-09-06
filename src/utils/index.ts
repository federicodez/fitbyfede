"use server";
import { prisma } from "@/db";
import { Workout } from "@/types";

export const getWorkouts = async () => {
  try {
    const workouts = await prisma.workout.findMany();

    if (!workouts.length) {
      throw new Error("Failed to fetch workouts");
    }

    return workouts;
  } catch (error) {
    console.log("Error loading workouts: ", error);
  }
};

export const updateWorkout = async (
  id: string,
  lbs: number[],
  reps: number[],
) => {
  try {
    await prisma.workout.update({
      where: {
        id,
      },
      data: {
        lbs,
        reps,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addSetToWorkout = async (workout: Workout, id: string) => {
  const { lbs, reps } = workout;
  try {
    const updated = await prisma.workout.update({
      where: {
        id,
      },
      data: {
        lbs,
        reps,
      },
    });
    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const getWorkoutById = async (id: string) => {
  try {
    const workout = await prisma.workout.findUnique({ where: { id } });
    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const getMostRecentWorkout = async (id: string) => {
  try {
    const workout = await prisma.workout.findFirst({
      where: {
        userId: id,
      },
      orderBy: { id: "desc" },
    });
    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const createWorkout = async (id: string, exercise: string) => {
  const lbs = [0];
  const reps = [0];
  try {
    const workout = await prisma.workout.create({
      data: { exercise, lbs, reps, userId: id },
    });
    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const findUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.log("Failed to get user.", error);
  }
};

export const deleteWorkout = async (id: string) => {
  try {
    await prisma.workout.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
