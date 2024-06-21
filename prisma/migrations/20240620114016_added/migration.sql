/*
  Warnings:

  - Added the required column `endtime` to the `Caption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starttime` to the `Caption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Caption" ADD COLUMN     "endtime" TEXT NOT NULL,
ADD COLUMN     "starttime" TEXT NOT NULL;
