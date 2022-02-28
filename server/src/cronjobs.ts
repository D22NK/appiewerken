import cron from "node-cron";
import notify from "./utils/notify";
import { PrismaClient } from "@prisma/client";

export default async function cronjobs() {
  const prisma = new PrismaClient();
  const jaar = new Date().getFullYear().toString();
  let maand = (new Date().getMonth() + 1).toString();
  const dag = new Date().getDate().toString();
  if (maand.length == 1) {
    maand = "0" + maand;
  }
  const today = jaar + "-" + maand + "-" + dag + "T00:00:00.000Z";

  cron.schedule("0 7 * * *", async () => {
    const subs = await prisma.notificationSubscribers.findMany();

    const shift = await prisma.shifts.findMany({
      where: {
        datum: today,
      },
      include: {
        tijdslot: true,
      },
    });

    if (shift.length == 1) {
      subs.forEach((sub: any) => {
        if (sub.daily) {
          notify(
            "Shifts",
            `Vandaag 1 shift voor ${shift[0].werknemer} van ${shift[0].tijdslot.begin} tot  ${shift[0].tijdslot.eind}`,
            JSON.parse(sub.sub)
          );
        }
      });
    }
  });
}
