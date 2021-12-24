import { Express, Request, Response } from "express";

export default function winkelRoutes(prisma: any, app: Express) {
  app.get("/winkels", async (req: Request, res: Response) => {
    const winkels = await prisma.winkels.findMany({
      include: {
        shifts: true,
      },
    });
    console.log(winkels);
    res.json(winkels);
  });

  app.get("/winkel/:id", async (req: Request, res: Response) => {
    const winkel = await prisma.winkels.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        shifts: true,
      },
    });
    console.log("winkel", winkel);
    res.json(winkel);
  });

  app.post("/winkels", async (req: Request, res: Response) => {
    try {
      const winkel = await prisma.winkels.create({
        data: {
          winkelNr: req.body.winkelnummer,
          adres: req.body.adres,
        },
      });
      console.log(winkel);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete("/winkel/:id", async (req: Request, res: Response) => {
    try {
      const winkel = await prisma.winkels.delete({
        where: {
          id: req.params.id,
        },
      });
      console.log(winkel);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
