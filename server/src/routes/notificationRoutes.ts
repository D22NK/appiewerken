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

    res.json(subs);
  });
}
