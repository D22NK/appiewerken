/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Betaalperiodes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Betaalperiodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Betaalperiodes" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Betaalperiodes_slug_key" ON "Betaalperiodes"("slug");
