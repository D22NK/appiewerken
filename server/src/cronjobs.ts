import cron from "node-cron";
export default function cronjobs() {
  cron.schedule("0,30,15,45 * * * *", () => {
    console.log("CRONJOB");
  });
}
