/*
  Warnings:

  - A unique constraint covering the columns `[slot]` on the table `Tijdslots` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tijdslots_slot_key" ON "Tijdslots"("slot");
