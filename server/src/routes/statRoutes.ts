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
          where: {
            ontvangstdatum: {
              gt: "2020-01-01T00:00:00.000Z",
              lt: "2020-12-12T00:00:00.000Z",
            },
          },

          _sum: {
            bedrag: true,
          },
        }),

        prisma.betalingen.aggregate({
          where: {
            ontvangstdatum: {
              gt: "2021-01-01T00:00:00.000Z",
              lt: "2022-12-12T00:00:00.000Z",
            },
          },

          _sum: {
            bedrag: true,
          },
        }),

        prisma.betalingen.aggregate({
          where: {
            ontvangstdatum: {
              gt: "2022-01-01T00:00:00.000Z",
              lt: "2023-12-12T00:00:00.000Z",
            },
          },

          _sum: {
            bedrag: true,
          },
        }),
      ]);

      res.json({ totaal2020 });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
