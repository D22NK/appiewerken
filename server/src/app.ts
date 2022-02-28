import express from "express";
import cors from "cors";
import helemt from "helmet";
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./utils/logger";
import cronjobs from "./cronjobs";
const app = express();
app.use(helemt());
const port = 1213;

app.use(
  cors({
    credentials: true,
    origin: [
      "http://192.168.68.100:3000",
      "http://192.168.68.110:3000",
      "http://localhost:3000",
      "https://ahw.d22nk.nl",
      "http://ahw.d22nk.nl",
    ],
    preflightContinue: true,
  })
);

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.listen(port, async () => {
  logger.info(`Server running - Port: ${port}`);
  routes(app);
  cronjobs();
});
