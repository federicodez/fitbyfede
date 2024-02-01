"use server";
import prisma from "@/db";
import { Data, WorkoutSession } from "@/types";
import data from "@/constants/exerciseData.json";
import { getCurrentUser } from "../users/getCurrentUser";
import { createWorkoutSession, getSessionById } from ".";

export const createManyWorkouts = async (
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
          async (
            { name, bodyPart, id, target, equipment, instructions },
            idx,
          ) => {
            await prisma.workout.create({
              data: {
                orderId: idx++,
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
