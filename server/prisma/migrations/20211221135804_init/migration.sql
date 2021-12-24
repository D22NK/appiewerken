-- CreateEnum
CREATE TYPE "Dag" AS ENUM ('MAANDAG', 'DINSDAG', 'WOENSDAG', 'DONDERDAG', 'VRIJDAG', 'ZATERDAG', 'ZONDAG');

-- CreateTable
CREATE TABLE "Shifts" (
    "id" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "jaarWeek" TEXT NOT NULL,
    "dag" "Dag" NOT NULL,
    "tijdslotId" TEXT NOT NULL,
    "urenGewerkt" INTEGER NOT NULL,
    "urenBetaald" INTEGER NOT NULL,
    "voltooid" BOOLEAN NOT NULL,
    "winkelId" TEXT NOT NULL,
    "uurloonId" TEXT NOT NULL,
    "Feestdag" BOOLEAN NOT NULL,
    "betaalperiodeId" TEXT NOT NULL,

    CONSTRAINT "Shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Betalingen" (
    "id" TEXT NOT NULL,
    "betaalPeriodeId" TEXT NOT NULL,

    CONSTRAINT "Betalingen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Betaalperiodes" (
    "id" TEXT NOT NULL,
    "startDatum" TIMESTAMP(3) NOT NULL,
    "eindDatum" TIMESTAMP(3) NOT NULL,
    "persoonlijkeBonus" BOOLEAN NOT NULL,
    "winstuitkering" BOOLEAN NOT NULL,

    CONSTRAINT "Betaalperiodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uurlonen" (
    "id" TEXT NOT NULL,
    "loon" INTEGER NOT NULL,
    "leeftijd" INTEGER NOT NULL,

    CONSTRAINT "Uurlonen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winkels" (
    "id" TEXT NOT NULL,
    "winkelNr" TEXT NOT NULL,
    "Adres" TEXT NOT NULL,

    CONSTRAINT "Winkels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tijdslots" (
    "id" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "begin" TEXT NOT NULL,
    "eind" TEXT NOT NULL,
    "Uren" INTEGER NOT NULL,

    CONSTRAINT "Tijdslots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shifts_id_key" ON "Shifts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Betalingen_id_key" ON "Betalingen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Betalingen_betaalPeriodeId_key" ON "Betalingen"("betaalPeriodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Betaalperiodes_id_key" ON "Betaalperiodes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Uurlonen_id_key" ON "Uurlonen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Winkels_id_key" ON "Winkels"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tijdslots_id_key" ON "Tijdslots"("id");

-- AddForeignKey
ALTER TABLE "Shifts" ADD CONSTRAINT "Shifts_tijdslotId_fkey" FOREIGN KEY ("tijdslotId") REFERENCES "Tijdslots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shifts" ADD CONSTRAINT "Shifts_winkelId_fkey" FOREIGN KEY ("winkelId") REFERENCES "Winkels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shifts" ADD CONSTRAINT "Shifts_uurloonId_fkey" FOREIGN KEY ("uurloonId") REFERENCES "Uurlonen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shifts" ADD CONSTRAINT "Shifts_betaalperiodeId_fkey" FOREIGN KEY ("betaalperiodeId") REFERENCES "Betaalperiodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Betalingen" ADD CONSTRAINT "Betalingen_betaalPeriodeId_fkey" FOREIGN KEY ("betaalPeriodeId") REFERENCES "Betaalperiodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
