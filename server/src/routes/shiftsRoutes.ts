import { Express, Request, Response } from "express";
import notify from "../utils/notify";

let cachedShifts: any = {
  all: null,
  voltooid: null,
  onvoltooid: null,
};
let cacheTime: any = {
  all: null,
  voltooid: null,
  onvoltooid: null,
};
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
          ziek: req.body.ziek,
          bcd: req.body.bcd,
        },
        include: {
          tijdslot: true,
        },
      });
      console.log(shift);
      cachedShifts.all = null;
      cachedShifts.voltooid = null;
      cachedShifts.onvoltooid = null;

      res.sendStatus(200);

      if (!req.body.voltooid) {
        const subs = await prisma.notificationSubscribers.findMany();
        subs.forEach((sub: any) => {
          if (sub.newShift) {
            notify(
              "Shifts",
              `1 nieuwe shift voor Daan op ${req.body.datum} van ${
                shift.tijdslot.slot.split("-")[0]
              } tot ${shift.tijdslot.slot.split("-")[1]} `,
              JSON.parse(sub.sub)
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/shifts", async (req: Request, res: Response) => {
    if (cacheTime.all && cacheTime.all > Date.now() - 60 * 1000) {
      return res.json(cachedShifts.all);
    }
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
      cachedShifts.all = shifts;
      cacheTime.all = Date.now();
      res.json(shifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/shifts/voltooid", async (req: Request, res: Response) => {
    if (cacheTime.voltooid && cacheTime.voltooid > Date.now() - 60 * 1000) {
      return res.json(cachedShifts.voltooid);
    }
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
      cachedShifts.voltooid = shifts;
      cacheTime.voltooid = Date.now();
      res.json(shifts);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/shifts/onvoltooid", async (req: Request, res: Response) => {
    if (cacheTime.onvoltooid && cacheTime.onvoltooid > Date.now() - 60 * 1000) {
      return res.json(cachedShifts.onvoltooid);
    }
    try {
      const shifts = await prisma.shifts.findMany({
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
        where: {
          voltooid: false,
        },
      });
      console.log("shifts", shifts);
      cachedShifts.onvoltooid = shifts;
      cacheTime.onvoltooid = Date.now();
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

  app.post("/voltooi-shift", async (req: Request, res: Response) => {
    try {
      const shift = await prisma.shifts.update({
        where: {
          id: req.body.id,
        },
        data: {
          voltooid: true,
        },
      });

      if (shift) {
        res.sendStatus(200);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post("/onvoltooi-shift", async (req: Request, res: Response) => {
    try {
      const shift = await prisma.shifts.update({
        where: {
          id: req.body.id,
        },
        data: {
          voltooid: false,
        },
      });

      if (shift) {
        res.sendStatus(200);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete("/shift/:id", async (req: Request, res: Response) => {
    try {
      const shift = await prisma.shifts.delete({
        where: {
          id: req.params.id,
        },
      });
      console.log(shift);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get(
    "/filteredshifts/:dag/:tijdslot/:winkel",
    async (req: Request, res: Response) => {
      try {
        const dagFilter =
          req.params.dag != "Alle"
            ? [{ dag: req.params.dag }]
            : [
                { dag: "MAANDAG" },
                { dag: "DINSDAG" },
                { dag: "WOENSDAG" },
                { dag: "DONDERDAG" },
                { dag: "VRIJDAG" },
                { dag: "ZATERDAG" },
                { dag: "ZONDAG" },
              ];

        let tijdslotfilter, winkelfilter;

        if (req.params.tijdslot !== "Alle") {
          tijdslotfilter = req.params.tijdslot;
        }
        if (req.params.winkel !== "Alle") {
          winkelfilter = req.params.winkel;
        }
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
            OR: dagFilter,
            tijdslot: {
              id: tijdslotfilter,
            },
            winkel: {
              winkelNr: winkelfilter,
            },
          },
        });

        res.json(shifts);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  );
}
