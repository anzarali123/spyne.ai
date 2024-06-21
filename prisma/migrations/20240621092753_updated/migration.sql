/*
  Warnings:

  - You are about to drop the column `endtime` on the `Caption` table. All the data in the column will be lost.
  - You are about to drop the column `starttime` on the `Caption` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Caption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Caption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Caption" DROP COLUMN "endtime",
DROP COLUMN "starttime",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;
