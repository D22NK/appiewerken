/*
  Warnings:

  - A unique constraint covering the columns `[winkelNr]` on the table `Winkels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Winkels_winkelNr_key" ON "Winkels"("winkelNr");
