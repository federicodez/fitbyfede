/*
  Warnings:

  - You are about to drop the `_WorkoutToWorkoutSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workoutSessionId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_WorkoutToWorkoutSession" DROP CONSTRAINT "_WorkoutToWorkoutSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkoutToWorkoutSession" DROP CONSTRAINT "_WorkoutToWorkoutSession_B_fkey";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "workoutSessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutSession" ADD COLUMN     "exercises" TEXT[],
ADD COLUMN     "workoutIds" TEXT[];

-- DropTable
DROP TABLE "_WorkoutToWorkoutSession";

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
