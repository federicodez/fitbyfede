"use server";
import prisma from "@/db";
import { WorkoutSession } from "@/types";
import { getSessionById } from ".";

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
