import { Express, Request, Response } from "express";

export default function statRoutes(prisma: any, app: Express) {
  app.get("/stats", async (req: Request, res: Response) => {
    try {
      const [
        ziek,
        totaalverdiensten,
        urengewerkt,
        urenbetaald,
        totaalperiodes,
        totaalshifts,
      ] = await prisma.$transaction([
        prisma.shifts.count({
          where: {
            ziek: true,
          },
        }),
        prisma.betalingen.aggregate({
          _sum: {
            bedrag: true,
          },
        }),

        prisma.shifts.aggregate({
          where: {
            voltooid: true,
          },
          _sum: {
            urenGewerkt: true,
          },
        }),

        prisma.shifts.aggregate({
          where: {
            voltooid: true,
          },
          _sum: {
            urenBetaald: true,
          },
        }),
        prisma.betaalperiodes.count({}),
        prisma.shifts.count({
          where: {
            ziek: false,
            bcd: false,
            voltooid: true,
          },
        }),
      ]);

      res.json({
        ziek,
        totaalverdiensten,
        urengewerkt,
        urenbetaald,
        totaalperiodes,
        totaalshifts,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
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
      const [totaal, totaal2020, totaal2021, totaal2022, volgendeperiode] =
        await prisma.$transaction([
          prisma.betalingen.aggregate({
            _sum: {
              bedrag: true,
            },
          }),

          prisma.betalingen.aggregate({
            where: {
              ontvangstdatum: {
                gt: "2020-01-01T00:00:00.000Z",
                lt: "2020-12-31T00:01:00.000Z",
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
                lt: "2021-12-31T00:01:00.000Z",
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
                lt: "2022-12-31T00:01:00.000Z",
              },
            },

            _sum: {
              bedrag: true,
            },
          }),
          prisma.betaalperiodes.findMany({
            take: 1,
            include: {
              shifts: true,
            },
            where: {
              betaling: null,
            },
          }),
        ]);

      res.json({ totaal, totaal2020, totaal2021, totaal2022, volgendeperiode });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/dagstats/:status", async (req: Request, res: Response) => {
    try {
      let status;
      if (req.params.status === "alle") {
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
        return res.json(dagen);
      } else if (req.params.status === "voltooid") {
        status = true;
      } else if (req.params.status === "onvoltooid") {
        status = false;
      }
      const dagen = await prisma.shifts.groupBy({
        where: {
          ziek: false,
          bcd: false,
          voltooid: status,
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
      const [totaal, totaal2020, totaal2021, totaal2022, totaalperiodes] =
        await prisma.$transaction([
          prisma.shifts.count({
            where: {
              ziek: false,
              bcd: false,
            },
          }),
          prisma.shifts.count({
            where: {
              ziek: false,
              bcd: false,
              datum: {
                gt: "2020-01-01T00:00:00.000Z",
                lt: "2020-12-31T00:01:00.000Z",
              },
            },
          }),
          prisma.shifts.count({
            where: {
              ziek: false,
              bcd: false,
              datum: {
                gt: "2021-01-01T00:00:00.000Z",
                lt: "2021-12-31T00:01:00.000Z",
              },
            },
          }),

          prisma.shifts.count({
            where: {
              ziek: false,
              bcd: false,
              datum: {
                gt: "2022-01-01T00:00:00.000Z",
                lt: "2022-12-31T00:01:00.000Z",
              },
            },
          }),
          prisma.betaalperiodes.count({}),
        ]);

      res.json({ totaal, totaal2020, totaal2021, totaal2022, totaalperiodes });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/urengewerktstats", async (req: Request, res: Response) => {
    try {
      const [totaal, totaal2020, totaal2021, totaal2022] =
        await prisma.$transaction([
          prisma.shifts.aggregate({
            where: {
              voltooid: true,
            },
            _sum: {
              urenGewerkt: true,
            },
          }),
          prisma.shifts.aggregate({
            where: {
              ziek: false,
              bcd: false,
              voltooid: true,
              datum: {
                gt: "2020-01-01T00:00:00.000Z",
                lt: "2020-12-31T00:01:00.000Z",
              },
            },
            _sum: {
              urenGewerkt: true,
            },
          }),
          prisma.shifts.aggregate({
            where: {
              ziek: false,
              bcd: false,
              voltooid: true,
              datum: {
                gt: "2021-01-01T00:00:00.000Z",
                lt: "2021-12-31T00:01:00.000Z",
              },
            },
            _sum: {
              urenGewerkt: true,
            },
          }),
          prisma.shifts.aggregate({
            where: {
              ziek: false,
              bcd: false,
              voltooid: true,
              datum: {
                gt: "2022-01-01T00:00:00.000Z",
                lt: "2022-12-31T00:01:00.000Z",
              },
            },
            _sum: {
              urenGewerkt: true,
            },
          }),
        ]);

      res.json({ totaal, totaal2020, totaal2021, totaal2022 });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/urenbetaaldstats", async (req: Request, res: Response) => {
    try {
      const [totaal, totaal2020, totaal2021, totaal2022] =
        await prisma.$transaction([
          prisma.shifts.aggregate({
            where: {
              voltooid: true,
            },
            _sum: {
              urenBetaald: true,
            },
          }),
          prisma.shifts.aggregate({
            where: {
              datum: {
                gt: "2020-01-01T00:00:00.000Z",
                lt: "2020-12-31T00:01:00.000Z",
              },
              voltooid: true,
            },
            _sum: {
              urenBetaald: true,
            },
          }),
          prisma.shifts.aggregate({
            where: {
              datum: {
                gt: "2021-01-01T00:00:00.000Z",
                lt: "2021-12-31T00:01:00.000Z",
              },
              voltooid: true,
            },
            _sum: {
              urenBetaald: true,
            },
          }),
          prisma.shifts.aggregate({
            where: {
              datum: {
                gt: "2022-01-01T00:00:00.000Z",
                lt: "2022-12-31T00:01:00.000Z",
              },
              voltooid: true,
            },
            _sum: {
              urenBetaald: true,
            },
          }),
        ]);

      res.json({ totaal, totaal2020, totaal2021, totaal2022 });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/winkelstats/:winkel", async (req: Request, res: Response) => {
    try {
      const [ziek, urengewerkt, urenbetaald, totaalshifts] =
        await prisma.$transaction([
          prisma.shifts.count({
            where: {
              ziek: true,
              winkel: {
                id: req.params.winkel,
              },
            },
          }),

          prisma.shifts.aggregate({
            where: {
              voltooid: true,
              winkel: {
                id: req.params.winkel,
              },
            },
            _sum: {
              urenGewerkt: true,
            },
          }),

          prisma.shifts.aggregate({
            where: {
              voltooid: true,
              winkel: {
                id: req.params.winkel,
              },
            },
            _sum: {
              urenBetaald: true,
            },
          }),

          prisma.shifts.count({
            where: {
              voltooid: true,

              ziek: false,
              bcd: false,
              winkel: {
                id: req.params.winkel,
              },
            },
          }),
        ]);

      res.json({
        ziek,
        urengewerkt,
        urenbetaald,
        totaalshifts,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
