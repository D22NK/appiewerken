import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import winkelRoutes from "./winkelRoutes";
import betaalRoutes from "./betaalRoutes";
import uurloonRoutes from "./uurloonRoutes";
import tijdslotRoutes from "./tijdslotRoutes";
import shiftsRoutes from "./shiftsRoutes";
import utilRoutes from "./utilRoutes";
import statRoutes from "./statRoutes";
import notificationRoutes from "./notificationRoutes";

const prisma = new PrismaClient();
function routes(app: Express) {
  app.options("*", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.get("/", (req: Request, res: Response) => {
    res.json({ info: "AppieWerken Server" });
  });

  winkelRoutes(prisma, app);
  betaalRoutes(prisma, app);
  uurloonRoutes(prisma, app);
  tijdslotRoutes(prisma, app);
  shiftsRoutes(prisma, app);
  utilRoutes(prisma, app);
  statRoutes(prisma, app);
  notificationRoutes(prisma, app);
  app.use("*", (req: Request, res: Response) => {
    res.sendStatus(404);
  });
}

export default routes;
