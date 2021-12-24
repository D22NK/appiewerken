/*
  Warnings:

  - Added the required column `bedrag` to the `Betalingen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Betalingen" ADD COLUMN     "bedrag" INTEGER NOT NULL;
