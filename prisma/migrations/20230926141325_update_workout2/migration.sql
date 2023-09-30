/*
  Warnings:

  - Made the column `workoutSessionId` on table `Workout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "workoutSessionId" SET NOT NULL;
