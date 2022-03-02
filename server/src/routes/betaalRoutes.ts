import { Express, Request, Response } from "express";
import logger from "../utils/logger";

export default function betaalRoutes(prisma: any, app: Express) {
  app.post("/periodes", async (req: Request, res: Response) => {
    logger.info(`[POST] /periodes`);
    try {
      const periode = await prisma.betaalperiodes.create({
        data: {
          startDatum: req.body.start + "T00:00:00.000Z",
          eindDatum: req.body.eind + "T00:00:00.000Z",
          persoonlijkeBonus: req.body.persoonlijkebonus,
          winstuitkering: req.body.winstuitkering,
          slug: req.body.slug,
        },
      });
      logger.info(`{Created} Periode: ${periode.id}`);
      res.sendStatus(200);
    } catch (error) {
      logger.error(error);
      res.sendStatus(500);
    }
  });

  app.get("/periodes", async (req: Request, res: Response) => {
    logger.info(`[GET] /periodes`);

    try {
      const periodes = await prisma.betaalperiodes.findMany({
        include: {
          shifts: true,
          betaling: true,
        },
        orderBy: [
          {
            startDatum: "desc",
          },
        ],
      });
      logger.info(`{Found} ${periodes.length} Periodes`);

      res.json(periodes);
    } catch (error) {
      logger.error(error);

      res.sendStatus(500);
    }
  });

  app.get("/periode/:id", async (req: Request, res: Response) => {
    logger.info(`[GET] /periodes/${req.params.id}`);

    try {
      const periode = await prisma.betaalperiodes.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          betaling: true,
          shifts: {
            include: {
              winkel: true,
              tijdslot: true,
              uurloon: true,
            },
            orderBy: [
              {
                datum: "desc",
              },
            ],
          },
        },
      });
      logger.info(`{Found} Periode: ${periode.id}`);
      res.json(periode);
    } catch (error) {
      logger.error(error);

      res.sendStatus(500);
    }
  });

  app.post("/betalingen", async (req: Request, res: Response) => {
    logger.info(`[POST] /betalingen`);

    try {
      console.log(req.body);
      const betaling = await prisma.betalingen.create({
        data: {
          betaalPeriodeId: req.body.periode,
          bedrag: parseFloat(req.body.bedrag),
          ontvangstdatum: req.body.datum + "T00:00:00.000Z",
        },
      });
      logger.info(`{Created} Betaling: ${betaling.id}`);
      res.sendStatus(200);
    } catch (error) {
      logger.error(error);

      res.sendStatus(500);
    }
  });

  app.get("/betalingen", async (req: Request, res: Response) => {
    logger.info(`[GET] /betalingen`);

    try {
      const betalingen = await prisma.betalingen.findMany({
        orderBy: [
          {
            ontvangstdatum: "desc",
          },
        ],
        include: {
          betaalPeriode: {
            include: {
              shifts: true,
            },
          },
        },
      });
      logger.info(`{Found} ${betalingen.length} Betalingen`);

      res.json(betalingen);
    } catch (error) {
      logger.error(error);

      res.sendStatus(500);
    }
  });

  app.get("/betaling/:id", async (req: Request, res: Response) => {
    logger.info(`[GET] /betaling/${req.params.id}`);

    try {
      const betaling = await prisma.betalingen.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          betaalPeriode: {
            include: {
              shifts: {
                include: {
                  winkel: true,
                  tijdslot: true,
                },
                orderBy: [
                  {
                    datum: "desc",
                  },
                ],
              },
            },
          },
        },
      });
      logger.info(`{Found} Betaling: ${betaling.id}`);

      res.json(betaling);
    } catch (error) {
      logger.error(error);

      res.sendStatus(500);
    }
  });

  app.delete("/betaling/:id", async (req: Request, res: Response) => {
    logger.info(`[DELETE] /betaling/${req.params.id}`);

    try {
      const betaling = await prisma.betalingen.delete({
        where: {
          id: req.params.id,
        },
      });
      logger.info(`{Deleted} Betaling: ${req.params.id}`);

      res.sendStatus(200);
    } catch (error) {
      logger.error(error);

      res.sendStatus(500);
    }
  });

  app.delete("/periode/:id", async (req: Request, res: Response) => {
    logger.info(`[DELETE] /periode/${req.params.id}`);

    try {
      const periode = await prisma.betaalperiodes.delete({
        where: {
          id: req.params.id,
        },
      });
      logger.info(`{Deleted} Periode: ${req.params.id}`);

      res.sendStatus(200);
    } catch (error) {
      logger.error(error);
      res.sendStatus(500);
    }
  });
}
