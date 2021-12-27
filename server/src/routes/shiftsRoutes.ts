import { Express, Request, Response } from "express";
import notify from "../utils/notify";
export default function shiftsRoutes(prisma: any, app: Express) {
  app.post("/shifts", async (req: Request, res: Response) => {
    try {
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
        include: {
          tijdslot: true,
        },
      });
      console.log(shift);
      notify(
        `1 nieuwe shift voor Daan op ${req.body.datum} van ${
          shift.tijdslot.slot.split("-")[0]
        } tot ${shift.tijdslot.slot.split("-")[1]} `
      );
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

  app.get("/shift/:id", async (req: Request, res: Response) => {
    try {
      const shift = await prisma.shifts.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          winkel: true,
          tijdslot: true,
          betaalperiode: true,
          uurloon: true,
        },
      });
      console.log("shift", shift);
      res.json(shift);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
