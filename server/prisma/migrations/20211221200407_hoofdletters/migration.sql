/*
  Warnings:

  - You are about to drop the column `Feestdag` on the `Shifts` table. All the data in the column will be lost.
  - You are about to drop the column `Uren` on the `Tijdslots` table. All the data in the column will be lost.
  - You are about to drop the column `Adres` on the `Winkels` table. All the data in the column will be lost.
  - Added the required column `feestdag` to the `Shifts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uren` to the `Tijdslots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adres` to the `Winkels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shifts" DROP COLUMN "Feestdag",
ADD COLUMN     "feestdag" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Tijdslots" DROP COLUMN "Uren",
ADD COLUMN     "uren" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Winkels" DROP COLUMN "Adres",
ADD COLUMN     "adres" TEXT NOT NULL;
