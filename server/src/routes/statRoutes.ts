import { Express, Request, Response } from "express";
import { P } from "pino";

export default function statRoutes(prisma: any, app: Express) {
  app.get("/totaal", async (req: Request, res: Response) => {
    try {
      const totaal = await prisma.betalingen.aggregate({
        where: {
          ziek: false,
          bcd: false,
        },
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
      const [totaal, totaal2020, totaal2021, totaal2022] =
        await prisma.$transaction([
          prisma.betalingen.aggregate({
            ziek: false,
            bcd: false,
            _sum: {
              bedrag: true,
            },
          }),

          prisma.betalingen.aggregate({
            where: {
              ziek: false,
              bcd: false,
              ontvangstdatum: {
                gt: "2020-01-01T00:00:00.000Z",
                lt: "2020-12-31T00:00:00.000Z",
              },
            },

            _sum: {
              bedrag: true,
            },
          }),

          prisma.betalingen.aggregate({
            where: {
              ziek: false,
              bcd: false,
              ontvangstdatum: {
                gt: "2021-01-01T00:00:00.000Z",
                lt: "2021-12-31T00:00:00.000Z",
              },
            },

            _sum: {
              bedrag: true,
            },
          }),

          prisma.betalingen.aggregate({
            where: {
              ziek: false,
              bcd: false,
              ontvangstdatum: {
                gt: "2022-01-01T00:00:00.000Z",
                lt: "2022-12-31T00:00:00.000Z",
              },
            },

            _sum: {
              bedrag: true,
            },
          }),
        ]);

      res.json({ totaal, totaal2020, totaal2021, totaal2022 });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/dagstats", async (req: Request, res: Response) => {
    try {
      const dagen = await prisma.shifts.groupBy({
        where: {
          ziek: false,
          bcd: false,
        },
        by: ["dag"],
        _count: {
          dag: true,
        },
      });
      console.log("dagen", dagen);
      res.json(dagen);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/shiftstats", async (req: Request, res: Response) => {
    try {
      const [totaal, totaal2020, totaal2021, totaal2022] =
        await prisma.$transaction([
          prisma.shifts.count(),
          prisma.shifts.count({
            where: {
              ziek: false,
              bcd: false,
              datum: {
                gt: "2020-01-01T00:00:00.000Z",
                lt: "2020-12-31T00:00:00.000Z",
              },
            },
          }),
          prisma.shifts.count({
            where: {
              ziek: false,
              bcd: false,
              datum: {
                gt: "2021-01-01T00:00:00.000Z",
                lt: "2021-12-31T00:00:00.000Z",
              },
            },
          }),

          prisma.shifts.count({
            where: {
              ziek: false,
              bcd: false,
              datum: {
                gt: "2022-01-01T00:00:00.000Z",
                lt: "2022-12-31T00:00:00.000Z",
              },
            },
          }),
        ]);

      res.json({ totaal, totaal2020, totaal2021, totaal2022 });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
