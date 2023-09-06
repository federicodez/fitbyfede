/*
  Warnings:

  - The `lbs` column on the `Workout` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `reps` column on the `Workout` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "lbs",
ADD COLUMN     "lbs" INTEGER[],
DROP COLUMN "reps",
ADD COLUMN     "reps" INTEGER[];
