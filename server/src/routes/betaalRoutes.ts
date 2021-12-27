import { Express, Request, Response } from "express";

export default function betaalRoutes(prisma: any, app: Express) {
  app.post("/periodes", async (req: Request, res: Response) => {
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
      console.log(periode);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/periodes", async (req: Request, res: Response) => {
    try {
      const periodes = await prisma.betaalperiodes.findMany({
        include: {
          shifts: true,
        },
        orderBy: [
          {
            startDatum: "desc",
          },
        ],
      });
      console.log("periodes", periodes);
      res.json(periodes);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/periode/:id", async (req: Request, res: Response) => {
    try {
      const periode = await prisma.betaalperiodes.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          shifts: true,
        },
      });
      console.log("periode", periode);
      res.json(periode);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post("/betalingen", async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const betaling = await prisma.betalingen.create({
        data: {
          betaalPeriodeId: req.body.periode,
          bedrag: parseFloat(req.body.bedrag),
          ontvangstdatum: req.body.datum + "T00:00:00.000Z",
        },
      });
      console.log(betaling);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/betalingen", async (req: Request, res: Response) => {
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
      console.log("betalingen", betalingen);
      res.json(betalingen);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/betaling/:id", async (req: Request, res: Response) => {
    try {
      const betaling = await prisma.betalingen.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          betaalPeriode: {
            include: {
              shifts: true,
            },
          },
        },
      });
      console.log("betaling", betaling);
      res.json(betaling);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
