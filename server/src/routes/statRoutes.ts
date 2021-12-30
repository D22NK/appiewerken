import { Express, Request, Response } from "express";

export default function statRoutes(prisma: any, app: Express) {
  app.get("/totaal", async (req: Request, res: Response) => {
    try {
      const totaal = await prisma.betalingen.aggregate({
        _sum: {
          bedrag: true,
        },
      });
      console.log("totaal", totaal);
      res.json(totaal);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/betalingstats", async (req: Request, res: Response) => {
    try {
      const [totaal2020, totaal2021, totaal2022] = await prisma.$transaction([
        prisma.betalingen.aggregate({
          _sum: {
            bedrag: true,
          },
          where: {
            jaarWeek: {
              contains: "2020",
            },
          },
        }),

        prisma.betalingen.aggregate({
          _sum: {
            bedrag: true,
          },
          where: {
            jaarWeek: {
              contains: "2021",
            },
          },
        }),
        prisma.betalingen.aggregate({
          _sum: {
            bedrag: true,
          },
          where: {
            jaarWeek: {
              contains: "2022",
            },
          },
        }),
      ]);

      res.json({ totaal2020, totaal2021, totaal2022 });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
