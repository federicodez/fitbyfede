"use server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Data, Workout, WorkoutSession } from "@/types";
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
  notes?: string,
) => {
  try {
    const lastSet = sets[sets.length - 1];
    if (!!Number(lastSet)) {
      const set = Number(lastSet) + 1;
      sets.push(String(set));
    } else {
      sets.push("1");
    }

    lbs.push(0);
    reps.push(0);
    const updated = await prisma.workout.update({
      where: {
        id,
      },
      data: {
        sets,
        lbs,
        reps,
        notes,
      },
    });

    const session = await getSessionById(updated.workoutSessionId);

    if (!session) {
      return null;
    }
    return session;
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

export const updateWorkouts = async (
  session: WorkoutSession,
  dataLbs: number[],
  dataReps: number[],
) => {
  try {
    session.Workout.map(async ({ id, sets, lbs, reps }) => {
      lbs.map((_, idx) => {
        lbs.splice(idx, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(idx, 1, Number(dataReps[0]));
        dataReps.shift();
      });

      await prisma.workout.update({
        where: {
          id,
        },
        data: {
          sets,
          lbs,
          reps,
        },
      });

      const updated = await getSessionById(session.id);

      if (!updated) {
        return null;
      }
      return updated;
    });
  } catch (error) {
    console.log("Error updating workouts ", error);
  }
};

export const updateDate = async (session: WorkoutSession, date: string) => {
  try {
    session.Workout.map(async ({ id, sets, lbs, reps }) => {
      await updateWorkoutWithDate(id, sets, lbs, reps, date);
    });
    await prisma.workoutSession.update({
      where: { id: session.id },
      data: { createdAt: date },
    });
  } catch (error) {
    console.log("Error updating workout date: ", error);
  }
};

export const changeWorkoutSet = async (
  id: string,
  session: WorkoutSession,
  setIndex: number,
  set: string,
) => {
  const workout = session.Workout.filter((workout) => workout.id === id);
  const { sets } = workout[0];
  sets.splice(setIndex, 1, set);
  const newSet: string[] = [];
  let i = 1;
  sets.map((set) => {
    if (!!Number(set)) {
      newSet.push(String(i));
      i++;
    } else {
      newSet.push(set);
    }
  });
  try {
    const updated = await prisma.workout.update({
      where: { id },
      data: { sets: newSet },
    });

    if (!updated) {
      return null;
    }

    const session = await getSessionById(updated.workoutSessionId);

    if (!session) {
      return null;
    }
    return session;
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

export const createMany = async (
  exerciseQueue: string[],
  session?: WorkoutSession,
) => {
  try {
    const exercises: Data = [];
    data.filter((workout) => {
      exerciseQueue.map((exercise) => {
        if (exercise === workout.name) {
          exercises.push(workout);
        }
      });
    });

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    if (!session?.id) {
      const session = await createWorkoutSession();

      if (!session) {
        return null;
      }

      const workouts = await Promise.all(
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
                notes: "",
                userId: currentUser.id,
                workoutSessionId: session.id,
              },
            });
          },
        ),
      );

      if (!workouts) {
        return null;
      }

      const result = getSessionById(session.id);
      return result;
    } else {
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
                notes: "",
                userId: currentUser.id,
                workoutSessionId: session.id,
              },
            });
          },
        ),
      );
      return session;
    }
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
    const deleted = await prisma.workout.delete({ where: { id } });
    const session = await getSessionById(deleted.workoutSessionId);
    if (!session) {
      return null;
    }
    return session;
  } catch (error) {
    console.log("Error deleting workout: ", error);
  }
};

export const deleteSet = async (
  id: string,
  sets: string[],
  lbs: number[],
  reps: number[],
  setId: number,
) => {
  try {
    let i = 1;
    const newSet: string[] = [];

    sets.splice(setId, 1);
    lbs.splice(setId, 1);
    reps.splice(setId, 1);

    sets.map((set) => {
      if (!!Number(set)) {
        newSet.push(String(i));
        i++;
      } else {
        newSet.push(set);
      }
    });
    if (!sets.length) {
      newSet.push("1");
      lbs.push(0);
      reps.push(0);
    }

    const updated = await prisma.workout.update({
      where: { id },
      data: {
        sets: newSet,
        lbs,
        reps,
      },
    });

    if (!updated) {
      return null;
    }

    const session = await getSessionById(updated.workoutSessionId);
    if (!session) {
      return null;
    }
    return session;
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
  id: string,
  name: string,
  notes: string,
  time: number,
) => {
  try {
    if (notes) {
      await prisma.workoutSession.update({
        where: { id },
        data: { name: name, time: time, notes: notes },
      });
    } else {
      await prisma.workoutSession.update({
        where: { id },
        data: { name: name, time: time },
      });
    }
  } catch (error) {
    console.log("Error updating session ", error);
  }
};

export const getSessionById = async (sessionId: string) => {
  try {
    const session = await prisma.workoutSession.findUnique({
      where: { id: sessionId },
      include: { Workout: true },
    });
    return session;
  } catch (error) {
    console.log("Error loading session ", error);
  }
};

export const getSessions = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }
    const sessions = await prisma.workoutSession.findMany({
      where: { userId: currentUser.id },
      include: { Workout: true },
      orderBy: { createdAt: "desc" },
    });
    if (!sessions?.length) {
      throw new Error("Failed to fetch sessions");
    }
    return sessions;
  } catch (error) {
    console.log("Error fetching sessions ", error);
  }
};

export const getPreviousWorkout = async (workouts: Workout[]) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const result: any[] = [];
    for (let i = 0; i < workouts.length; i++) {
      const previous = await prisma.workout.findFirst({
        where: {
          userId: currentUser.id,
          name: workouts[i].name,
          NOT: { id: workouts[i].id },
        },
        orderBy: { createdAt: "desc" },
      });

      result.push(previous);
    }

    if (!result.length) {
      return null;
    }

    return result;
  } catch (error) {
    console.log("Error loading previous workouts ", error);
  }
};

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
    console.log("actions: ", exercise);
    return exercise;
  } catch (error) {
    console.log(error);
  }
};
