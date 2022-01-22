import { Express, Request, Response } from "express";

export default function utilRoutes(prisma: any, app: Express) {
  app.get("/shiftfields", async (req: Request, res: Response) => {
    try {
      const [tijdslots, uurlonen, betaalperiodes, winkels] =
        await prisma.$transaction([
          prisma.tijdslots.findMany({
            orderBy: [
              {
                begin: "asc",
              },
              {
                eind: "asc",
              },
            ],
          }),
          prisma.uurlonen.findMany({
            orderBy: [
              {
                loon: "asc",
              },
            ],
          }),
          prisma.betaalperiodes.findMany({
            orderBy: [
              {
                startDatum: "desc",
              },
            ],
          }),
          prisma.winkels.findMany(),
        ]);
      res.json({
        tijdslots: tijdslots,
        uurlonen: uurlonen,
        betaalperiodes: betaalperiodes,
        winkels: winkels,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
