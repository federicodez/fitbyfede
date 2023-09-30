/*
  Warnings:

  - You are about to drop the column `workoutSessionId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `workoutIds` on the `WorkoutSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "workoutSessionId";

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "workoutIds";
