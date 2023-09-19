"use server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getWorkouts = async (userId: string) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
      orderBy: { createdAt: "desc" },
    });

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
    const workout = await prisma.workout.findUnique({ where: { id: id } });
    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const createExercise = async (id: string, exercise: string) => {
  const lbs = [0];
  const reps = [0];
  try {
    const workout = await prisma.workout.create({
      data: {
        exercise: exercise,
        lbs,
        reps,
        userId: id,
      },
    });
    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const createWorkout = async (
  id: string,
  exercise: string,
  lbs: number[],
  reps: number[],
) => {
  try {
    const workout = await prisma.workout.create({
      data: {
        exercise: exercise,
        lbs: lbs,
        reps: reps,
        userId: id,
      },
    });
    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    console.log("Failed to get user.", error);
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
