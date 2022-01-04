import { Express, Request, Response } from "express";

export default function kalenderRoutes(prisma: any, app: Express) {
  app.get("/kalender/:jaarweek", async (req: Request, res: Response) => {
    try {
      const shifts = await prisma.shifts.findMany({
        where: {
          jaarWeek: req.params.jaarweek,
        },
        orderBy: [
          {
            datum: "asc",
          },
        ],
        include: {
          winkel: true,
          tijdslot: true,
          uurloon: true,
          betaalperiode: true,
        },
      });
      console.log(shifts);
      res.json(shifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
