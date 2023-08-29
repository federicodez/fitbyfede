"use server";
import clientPromise from ".";
import { redirect } from "next/dist/server/api-utils";

let client;
let db;
let workouts;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db("fitfede");
    workouts = await db.collection("workouts");
  } catch (error) {
    throw new Error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})();

export async function getWorkouts() {
  try {
    if (!workouts) await init();
    const result = await workouts
      .find({})
      .limit(5)
      .map((exercise) => ({ ...exercise, _id: exercise._id.toString() }))
      .toArray();

    return { workouts: result };
  } catch (error) {
    return { error: "Failed to fetch workouts!" };
  }
}

export async function createWorkout(data) {
  try {
    if (!workouts) await init();
    const exercise = data.get("exercise")?.valueOf();
    const sets = data.get("sets")?.valueOf();
    const lbs = data.get("lbs")?.valueOf();
    const reps = data.get("reps")?.valueOf();
    await workouts.insertMany([{ exercise, lbs, sets, reps }]);

    console.log("Successfully created");
  } catch (error) {
    console.log("Failed to create workout", error);
  }
}
