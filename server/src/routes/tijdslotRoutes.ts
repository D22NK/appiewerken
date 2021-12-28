import { Express, Request, Response } from "express";

export default function tijdslotRoutes(prisma: any, app: Express) {
  app.post("/tijdslots", async (req: Request, res: Response) => {
    try {
      console.log(req.body.uren);
      const tijdslot = await prisma.tijdslots.create({
        data: {
          slot: req.body.slot,
          begin: req.body.begin,
          eind: req.body.eind,
          uren: parseFloat(req.body.uren),
        },
      });
      console.log(tijdslot);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/tijdslots", async (req: Request, res: Response) => {
    try {
      const tijdslots = await prisma.tijdslots.findMany({
        include: {
          shifts: true,
        },
        orderBy: [
          {
            begin: "asc",
          },
        ],
      });
      console.log("periodes", tijdslots);
      res.json(tijdslots);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/tijdslot/:id", async (req: Request, res: Response) => {
    try {
      const tijdslot = await prisma.tijdslots.findUnique({
        where: {
          id: req.params.id,
        },
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
      });
      console.log("tijdslot", tijdslot);
      res.json(tijdslot);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
