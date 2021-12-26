import { Express, Request, Response } from "express";

export default function shiftsRoutes(prisma: any, app: Express) {
  app.post("/shifts", async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const shift = await prisma.shifts.create({
        data: {
          datum: req.body.datum + "T00:00:00.000Z",
          jaarWeek: req.body.jaarWeek,
          dag: req.body.dag,
          tijdslotId: req.body.tijdslotId,
          urenGewerkt: parseFloat(req.body.urenGewerkt),
          urenBetaald: parseFloat(req.body.urenBetaald),
          voltooid: req.body.voltooid,
          winkelId: req.body.winkelId,
          uurloonId: req.body.uurloonId,
          feestdag: req.body.feestdag,
          betaalperiodeId: req.body.betaalperiodeId,
        },
      });
      console.log(shift);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/shifts", async (req: Request, res: Response) => {
    try {
      const shifts = await prisma.shifts.findMany({
        orderBy: [
          {
            datum: "desc",
          },
        ],
        include: {
          winkel: true,
          tijdslot: true,
          uurloon: true,
          betaalperiode: true,
        },
      });
      console.log("shifts", shifts);
      res.json(shifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/shifts/voltooid", async (req: Request, res: Response) => {
    try {
      const shifts = await prisma.shifts.findMany({
        orderBy: [
          {
            datum: "desc",
          },
        ],
        include: {
          winkel: true,
          tijdslot: true,
          uurloon: true,
          betaalperiode: true,
        },
        where: {
          voltooid: true,
        },
      });
      console.log("shifts", shifts);
      res.json(shifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/shifts/onvoltooid", async (req: Request, res: Response) => {
    try {
      const shifts = await prisma.shifts.findMany({
        orderBy: [
          {
            datum: "desc",
          },
        ],
        include: {
          winkel: true,
          tijdslot: true,
          uurloon: true,
          betaalperiode: true,
        },
        where: {
          voltooid: false,
        },
      });
      console.log("shifts", shifts);
      res.json(shifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
