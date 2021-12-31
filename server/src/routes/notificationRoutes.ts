import { Prisma } from "@prisma/client";
import { Express, Request, Response } from "express";
import notify from "../utils/notify";
export default function notificationRoutes(prisma: any, app: Express) {
  app.post("/subscribe", async (req: Request, res: Response) => {
    try {
      const notification = await prisma.NotificationSubscribers.create({
        sub: req.body.sub as Prisma.JsonArray,
        device: req.get("User-Agent"),
      });

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
