/*
  Warnings:

  - You are about to drop the column `exercises` on the `WorkoutSession` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_workoutSessionId_fkey";

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "exercises";

-- CreateTable
CREATE TABLE "_WorkoutToWorkoutSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutToWorkoutSession_AB_unique" ON "_WorkoutToWorkoutSession"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutToWorkoutSession_B_index" ON "_WorkoutToWorkoutSession"("B");

-- AddForeignKey
ALTER TABLE "_WorkoutToWorkoutSession" ADD CONSTRAINT "_WorkoutToWorkoutSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutToWorkoutSession" ADD CONSTRAINT "_WorkoutToWorkoutSession_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
