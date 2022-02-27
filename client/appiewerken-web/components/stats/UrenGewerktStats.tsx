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
export default function UrenGewerktStats() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [urenStats, setUrenstats] = useState<any>();
  async function getUrenStats() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/urengewerktstats");
      setUrenstats(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUrenStats();
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
        label: "Gewerkte uren",
        data: [
          urenStats?.totaal2020._sum.urenGewerkt.toFixed(2),
          urenStats?.totaal2021._sum.urenGewerkt.toFixed(2),

          urenStats?.totaal2022._sum.urenGewerkt.toFixed(2),
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="w-[100%]  group-focus-visible:flex bg-slate-100 mt-4 rounded-md p-4  mr-2 row-span-1">
      <h1 className="text-xl font-semibold text-sky-500">Uren gewerkt:</h1>

      <Bar options={options} data={data} />
      <div className="grid grid-cols-2 mt-4">
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2020: {urenStats?.totaal2020._sum.urenGewerkt.toFixed(2)}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2021: {urenStats?.totaal2021._sum.urenGewerkt.toFixed(2)}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2022: {urenStats?.totaal2022._sum.urenGewerkt.toFixed(2)}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          Totaal: {urenStats?.totaal._sum.urenGewerkt.toFixed(2)}
        </p>
      </div>
      <p className="italic text-slate-400 text-xs">
        Hierin zijn alleen de uren van voltooide shifts meegenomen.
      </p>
    </div>
  );
}
