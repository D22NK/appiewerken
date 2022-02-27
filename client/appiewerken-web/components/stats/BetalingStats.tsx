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
export default function BetalingStats() {
  const [betalingstats, setBetalingstats] = useState<any>();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
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
        label: "Verdiensten",
        data: [
          betalingstats?.totaal2020._sum.bedrag.toFixed(2),
          betalingstats?.totaal2021._sum.bedrag.toFixed(2),
          betalingstats?.totaal2022._sum.bedrag.toFixed(2),
        ],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
    ],
  };
  return (
    <div className="w-[100%] flex  flex-col bg-slate-100 mt-4 rounded-md p-4 mr-2 row-span-1 h-min">
      <h1 className="text-xl font-semibold text-sky-500">Betalingen:</h1>

      <Bar options={options} data={data} />
      <div className="grid grid-cols-2 mt-4">
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2020: €{betalingstats?.totaal2020._sum.bedrag.toFixed(2)}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2021: €{betalingstats?.totaal2021._sum.bedrag.toFixed(2)}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          2022: €{betalingstats?.totaal2022._sum.bedrag.toFixed(2)}
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          Totaal: €{betalingstats?.totaal._sum.bedrag.toFixed(2)}
        </p>
      </div>
      <p className="italic text-slate-400 text-xs">
        Het gaat hier om het jaar waarin de betaling is ontvangen, het kan dus
        voorkomen dat een betaling in jaar B verdiensten bevat van jaar A.
      </p>
    </div>
  );
}
