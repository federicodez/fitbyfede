"use server";
import { prisma } from "@/db";

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

export const updateWorkout = async (id, lbs, reps) => {
  console.log({ lbs, reps });
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

export const addSetToWorkout = async (workout, id) => {
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

export const getWorkoutById = async (id) => {
  try {
    const workout = await prisma.workout.findUnique({ where: { id } });
    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const getMostRecentWorkout = async (id) => {
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

export const createWorkout = async (id, exercise) => {
  try {
    const workout = await prisma.workout.create({
      data: { exercise, userId: id },
    });
    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const findUser = async (email) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.log("Failed to get user.", error);
  }
};

export const deleteWorkout = async (id) => {
  try {
    const deleteWorkout = await prisma.workout.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
