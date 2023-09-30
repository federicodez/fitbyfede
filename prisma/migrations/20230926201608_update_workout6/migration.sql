/*
  Warnings:

  - You are about to drop the column `exercises` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "exercises";

-- DropTable
DROP TABLE "Session";
