import { Express, Request, Response } from "express";

export default function uurloonRoutes(prisma: any, app: Express) {
  app.post("/uurlonen", async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const uurloon = await prisma.uurlonen.create({
        data: {
          leeftijd: req.body.leeftijd,
          loon: req.body.uurloon,
        },
      });
      console.log(uurloon);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/uurlonen", async (req: Request, res: Response) => {
    try {
      const uurlonen = await prisma.uurlonen.findMany({
        include: {
          shifts: true,
        },
      });
      console.log("betalingen", uurlonen);
      res.json(uurlonen);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/uurloon/:id", async (req: Request, res: Response) => {
    try {
      const uurloon = await prisma.uurlonen.findUnique({
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
      console.log("uurloon", uurloon);
      res.json(uurloon);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete("/uurloon/:id", async (req: Request, res: Response) => {
    try {
      const uurloon = await prisma.uurlonen.delete({
        where: {
          id: req.params.id,
        },
      });
      console.log(uurloon);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.put("/uurloon/:id", async (req: Request, res: Response) => {
    try {
      const uurloon = await prisma.uurlonen.update({
        where: {
          id: req.params.id,
        },
        data: {
          loon: req.body.loon,
          leeftijd: req.body.loon,
        },
      });
      console.log(uurloon);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
