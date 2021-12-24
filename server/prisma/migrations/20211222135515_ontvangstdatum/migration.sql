/*
  Warnings:

  - Added the required column `ontvangstdatum` to the `Betalingen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Betalingen" ADD COLUMN     "ontvangstdatum" TIMESTAMP(3) NOT NULL;
