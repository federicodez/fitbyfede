"use server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { WorkoutSession } from "@prisma/client";

export const getWorkouts = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }
    const workouts = await prisma.workout.findMany({
      where: {
        userId: currentUser.id,
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
  sets: string[],
  lbs: number[],
  reps: number[],
) => {
  try {
    const updated = await prisma.workout.update({
      where: {
        id,
      },
      data: {
        sets,
        lbs,
        reps,
      },
    });
    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const updateWorkoutReps = async (id: string, reps: number[]) => {
  try {
    await prisma.workout.update({
      where: { id },
      data: { reps },
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const updateWorkoutWeight = async (id: string, lbs: number[]) => {
  try {
    await prisma.workout.update({
      where: { id },
      data: { lbs },
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const updateWorkoutSets = async (id: string, sets: string[]) => {
  try {
    await prisma.workout.update({
      where: { id },
      data: { sets },
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const changeWorkoutSet = async (id: string, sets: string[]) => {
  try {
    await prisma.workout.update({
      where: { id },
      data: { sets },
    });
  } catch (err: any) {
    console.log(err);
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

export const getWorkoutsBySessionId = async (id: string) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        workoutSessionId: id,
      },
    });

    return workouts;
  } catch (err: any) {
    console.log(err);
  }
};

export const createWorkoutSession = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const session = await prisma.workoutSession.create({
      data: {
        userId: currentUser.id,
      },
    });
    return session;
  } catch (err: any) {
    console.log(err);
  }
};

export const createMany = async (
  exerciseQueue: string[],
  session: WorkoutSession,
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }
    await Promise.all(
      exerciseQueue.map(async (exercise: string) => {
        await prisma.workout.create({
          data: {
            exercise,
            sets: ["1"],
            lbs: [0],
            reps: [0],
            userId: currentUser.id,
            workoutSessionId: session.id,
          },
        });
      }),
    );
  } catch (err: any) {
    console.log(err);
  }
};

export const createExercise = async (
  exercise: string,
  session: WorkoutSession,
) => {
  const lbs = [0];
  const reps = [0];
  const sets = ["1"];
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const workout = await prisma.workout.create({
      data: {
        exercise: exercise,
        sets,
        lbs,
        reps,
        userId: currentUser.id,
        workoutSessionId: session.id,
      },
    });

    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const createWorkout = async (
  exercise: string,
  sets: string[],
  lbs: number[],
  reps: number[],
  session: WorkoutSession,
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const workout = await prisma.workout.create({
      data: {
        exercise: exercise,
        sets: sets,
        lbs: lbs,
        reps: reps,
        userId: currentUser.id,
        workoutSessionId: session.id,
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

export const deleteSession = async (sessionId: string) => {
  try {
    await prisma.workoutSession.delete({
      where: { id: sessionId },
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const deleteWorkout = async (id: string) => {
  try {
    await prisma.workout.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSet = async (
  id: string,
  sets: string[],
  lbs: number[],
  reps: number[],
) => {
  try {
    await prisma.workout.update({
      where: { id },
      data: {
        sets,
        lbs,
        reps,
      },
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const getMostRecentWorkouts = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const workouts = await prisma.workout.findMany({
      take: 4,
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return workouts;
  } catch (err: any) {
    console.log(err);
  }
};

export const getWorkoutByExercise = async (exercise: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const exercises = await prisma.workout.findMany({
      where: {
        userId: currentUser.id,
        exercise,
      },
    });

    return exercises;
  } catch (err: any) {
    console.log(err);
  }
};
