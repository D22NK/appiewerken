import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
export default function ShiftStats() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [shiftStats, setShiftstats] = useState<any>();
  async function getShiftsStats() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shiftstats");
      setShiftstats(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getShiftsStats();
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Bar Chart",
      // },
    },
  };

  const labels = ["2020", "2021", "2022"];

  const data = {
    labels,
    datasets: [
      {
        label: "Gewerkte shifts",
        data: [
          shiftStats?.totaal2020.toFixed(2),
          shiftStats?.totaal2021.toFixed(2),

          shiftStats?.totaal2022.toFixed(2),
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="w-[100%]  group-focus-visible:flex bg-slate-100 mt-4 rounded-md p-4  mr-2 row-span-1">
      <h1 className="text-xl font-semibold text-sky-500">Shifts:</h1>
      <Bar options={options} data={data} />
      <div className="grid grid-cols-2 mt-4">
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2020: {shiftStats?.totaal2020}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2021: {shiftStats?.totaal2021}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2022: {shiftStats?.totaal2022}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          Totaal: {shiftStats?.totaal}
        </p>
      </div>
      <p>
        Gemiddeld{" "}
        <span className="text-sky-500 font-semibold">
          {(shiftStats?.totaal / shiftStats?.totaalperiodes).toFixed(0)}
        </span>{" "}
        shifts per periode
      </p>

      <p className="italic text-slate-400 text-xs">
        In deze statistiek zijn de shifts met alleen bcd of ziek niet mee
        gerekend. Shifts die onvoltooid zijn worden ook niet meegenomen in deze
        statistiek.
      </p>
    </div>
  );
}
