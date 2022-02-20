import { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export default function DagenStats() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [dagstats, setDagstats] = useState<any>();
  const [dagencount, setDagencount] = useState<any>();
  const [statusFilter, setStatusFilter] = useState("alle");
  async function getDagstats() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/dagstats", {
        params: { status: statusFilter },
      });
      setDagstats(res.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDagstats();
    console.log(statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    if (dagstats) {
      // const dagen = ["MAANDAG", "DINSDAG", "WOENSDAG", "DONDERDAG", "VRIJDAG", "ZATERDAG", "ZONDAG"];
      // dagen.forEach((dag)=>{

      // })
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
    <div className="w-[100%] flex  flex-col bg-slate-100 mt-4 rounded-md p-4  mr-2 row-span-3">
      <h1 className="text-xl font-semibold text-sky-500">Gewerkte Dagen:</h1>
      <div className="flex flex-col md:flex-row">
        <h2
          onClick={() => {
            setStatusFilter("alle");
          }}
          className="text-sky-600 font-semibold m-2 cursor-pointer hover:bg-slate-200 p-2 rounded-md"
        >
          Alle
        </h2>
        <h2
          onClick={() => {
            setStatusFilter("voltooid");
          }}
          className="text-sky-600 font-semibold m-2 cursor-pointer hover:bg-slate-200 p-2 rounded-md"
        >
          Voltooid
        </h2>
        <h2
          onClick={() => {
            setStatusFilter("onvoltooid");
          }}
          className="text-sky-600 font-semibold m-2 cursor-pointer hover:bg-slate-200 p-2 rounded-md"
        >
          Onvoltooid
        </h2>
      </div>
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
  );
}
