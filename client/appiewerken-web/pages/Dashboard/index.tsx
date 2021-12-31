import { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import MainLayout from "../../components/layouts/Main";
import DashboardHeader from "../../components/DashboardHeader";
export default function Dashboard() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [betalingstats, setBetalingstats] = useState<any>();
  //   let winkels: any = [];
  async function getBetalingStats() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/betalingstats");
      setBetalingstats(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBetalingStats();
  }, []);

  const [dagstats, setDagstats] = useState<any>();
  const [dagencount, setDagencount] = useState<any>();

  async function getDagstats() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/dagstats");
      setDagstats(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDagstats();
  }, []);

  useEffect(() => {
    if (dagstats) {
      const maandag =
        dagstats[dagstats?.findIndex((d: any) => d.dag == "MAANDAG")]?._count
          .dag || 0;
      const dinsdag =
        dagstats[dagstats?.findIndex((d: any) => d.dag == "DINSDAG")]?._count
          .dag || 0;

      const woensdag =
        dagstats[dagstats?.findIndex((d: any) => d.dag == "WOENSDAG")]?._count
          .dag || 0;

      const donderdag =
        dagstats[dagstats?.findIndex((d: any) => d.dag == "DONDERDAG")]?._count
          .dag || 0;

      const vrijdag =
        dagstats[dagstats?.findIndex((d: any) => d.dag == "VRIJDAG")]?._count
          .dag || 0;

      const zaterdag =
        dagstats[dagstats?.findIndex((d: any) => d.dag == "ZATERDAG")]?._count
          .dag || 0;

      const zondag =
        dagstats[dagstats?.findIndex((d: any) => d.dag == "ZONDAG")]?._count
          .dag || 0;

      setDagencount({
        maandag,
        dinsdag,
        woensdag,
        donderdag,
        vrijdag,
        zaterdag,
        zondag,
      });
    }
  }, [dagstats]);

  const data = {
    labels: [
      "Maandag",
      "Dinsdag",
      "Woensdag",
      "Donderdag",
      "Vrijdag",
      "Zaterdag",
      "Zondag",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          dagencount?.maandag,
          dagencount?.dinsdag,
          dagencount?.woensdag,
          dagencount?.donderdag,
          dagencount?.vrijdag,
          dagencount?.zaterdag,
          dagencount?.zondag,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(12, 79, 84, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(12, 79, 84, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <MainLayout parentPage="Dashboard">
      <DashboardHeader page="Index" />
      <div className="flex w-[100%] flex-col md:flex-row">
        <div className="w-[100%] flex h-max flex-col bg-slate-100 my-4 rounded-md p-4 md:w-[40%] mr-2">
          <h1 className="text-xl font-semibold text-sky-500">Betalingen:</h1>
          <div className="flex flex-col">
            <p className="font-semibold">
              Alltime: € {betalingstats?.totaal._sum.bedrag}
            </p>

            <p>2020: € {betalingstats?.totaal2020._sum.bedrag}</p>

            <p>2021: € {betalingstats?.totaal2021._sum.bedrag}</p>

            <p>2022: € {betalingstats?.totaal2022._sum.bedrag}</p>
          </div>
        </div>

        <div className="w-[100%] h-max group-focus-visible:flex bg-slate-100 my-4 rounded-md p-4 md:w-[30%] mr-2">
          Statiestiek 2
        </div>

        <div className="w-[100%] flex h-max flex-col bg-slate-100 my-4 rounded-md p-4 md:w-[30%] mr-2">
          <Pie data={data} />
          <div className="grid grid-cols-2 mt-4">
            <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
              Maandag: {dagencount?.maandag}
            </p>
            <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
              Dinsdag: {dagencount?.dinsdag}
            </p>
            <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
              Woensdag: {dagencount?.woensdag}
            </p>
            <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
              Donderdag: {dagencount?.donderdag}
            </p>
            <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
              Vrijdag: {dagencount?.vrijdag}
            </p>
            <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
              Zaterdag: {dagencount?.zaterdag}
            </p>
            <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
              Zondag: {dagencount?.zondag}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
