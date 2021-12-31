import { Prisma } from "@prisma/client";
import { Express, Request, Response } from "express";
import notify from "../utils/notify";
export default function notificationRoutes(prisma: any, app: Express) {
  app.post("/subscribe", async (req: Request, res: Response) => {
    try {
      console.log(req.body, req.get("User-Agent"));
      const notification = await prisma.notificationSubscribers.create({
        data: {
          sub: req.body.sub as Prisma.JsonArray,
          device: req.get("User-Agent"),
        },
      });

      console.log(notification);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/subs", async (req: Request, res: Response) => {
    const subs = await prisma.notificationSubscribers.findMany();
    res.json(JSON.parse(subs[0].sub));
  });

  app.get("/test-all", async (req: Request, res: Response) => {
    const subs = await prisma.notificationSubscribers.findMany();

    subs.forEach((sub: any) => {
      notify("Test", "Dit is een test melding", JSON.parse(sub.sub));
    });

    res.json(subs);
  });
}
