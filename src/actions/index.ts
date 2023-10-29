"use server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Data, Workout } from "@/types";
import data from "@/constants/exerciseData.json";

// export const getExerciseData = async () => {
//   try {
//     const res = await fetch(process.env.EXERCISE_DB_URL as string);
//
//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

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
    console.log("Error updating workout: ", error);
  }
};

export const updateWorkoutWithDate = async (
  id: string,
  sets: string[],
  lbs: number[],
  reps: number[],
  date: string,
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
        createdAt: new Date(date),
      },
    });
    return updated;
  } catch (error) {
    console.log("Error updating workout date: ", error);
  }
};

export const updateWorkouts = async (workouts: Workout[]) => {
  try {
    workouts.map(async ({ id, sets, lbs, reps }) => {
      await updateWorkout(id, sets, lbs, reps);
    });
  } catch (error) {
    console.log("Error updating workouts ", error);
  }
};

export const updateWorkoutsWithDate = async (
  workouts: Workout[],
  date: string,
) => {
  try {
    workouts.map(async ({ id, sets, lbs, reps }) => {
      await updateWorkoutWithDate(id, sets, lbs, reps, date);
    });
  } catch (error) {
    console.log("Error updating workout date: ", error);
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

export const getWorkoutsBySessionId = async (id: string) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        workoutSessionId: id,
      },
    });

    return workouts;
  } catch (err: any) {
    console.log("Error loading workouts by session id: ", err);
  }
};

export const createWorkoutSession = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }
    const date = new Date().getHours();
    let time;
    if (date < 12) {
      time = "Morning Workout";
    } else if (date < 15) {
      time = "Midday Workout";
    } else if (date < 18) {
      time = "Afternoon Workout";
    } else {
      time = "Evening Workout";
    }
    const session = await prisma.workoutSession.create({
      data: {
        userId: currentUser.id,
        name: time,
        time: 0,
        notes: "",
      },
    });
    return session;
  } catch (err: any) {
    console.log("Error creating workout session: ", err);
  }
};

export const createMany = async (
  exerciseQueue: string[],
  sessionId: string,
) => {
  const exercises: Data = [];
  data.filter((workout) => {
    exerciseQueue.map((exercise) => {
      if (exercise === workout.name) {
        exercises.push(workout);
      }
    });
  });
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    await Promise.all(
      exercises.map(
        async ({ name, bodyPart, id, target, equipment, instructions }) => {
          await prisma.workout.create({
            data: {
              name,
              bodyPart,
              gifId: id,
              target,
              equipment,
              instructions,
              sets: ["1"],
              lbs: [0],
              reps: [0],
              userId: currentUser.id,
              workoutSessionId: sessionId,
            },
          });
        },
      ),
    );
  } catch (err: any) {
    console.log("Error creating many workouts: ", err);
  }
};

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
    let time;
    if (date < 12) {
      time = "Morning Workout";
    } else if (date < 15) {
      time = "Midday Workout";
    } else if (date < 18) {
      time = "Afternoon Workout";
    } else {
      time = "Evening Workout";
    }

    const session = await prisma.workoutSession.create({
      data: {
        userId: currentUser.id,
        name: time,
        time: 0,
        notes: "",
      },
    });

    const workout = await prisma.workout.create({
      data: {
        name: name,
        bodyPart: bodyPartBtn,
        target: categoriesBtn,
        sets: sets,
        lbs: lbs,
        reps: reps,
        userId: currentUser.id,
        workoutSessionId: session.id,
      },
    });

    return workout;
  } catch (error) {
    console.log("Error creating workout: ", error);
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
    console.log("Error deleting session: ", err);
  }
};

export const deleteWorkout = async (id: string) => {
  try {
    await prisma.workout.delete({ where: { id } });
  } catch (error) {
    console.log("Error deleting workout: ", error);
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
    console.log("Error deleting set: ", err);
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
      distinct: ["name"],
      orderBy: {
        createdAt: "desc",
      },
    });

    return workouts;
  } catch (err: any) {
    console.log("Error loading most recent workouts: ", err);
  }
};

export const updateWorkoutSession = async (
  sessionId: string,
  notes: string,
  time: number,
) => {
  try {
    await prisma.workoutSession.update({
      where: { id: sessionId },
      data: { notes: notes, time: time },
    });
  } catch (error) {
    console.log("Error updating session ", error);
  }
};

export const getSessionById = async (sessionId: string) => {
  try {
    const session = await prisma.workoutSession.findUnique({
      where: { id: sessionId },
    });
    return session;
  } catch (error) {
    console.log("Error loading session ", error);
  }
};
