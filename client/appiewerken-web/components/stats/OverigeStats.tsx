import { useEffect, useState } from "react";
import axios from "axios";

export default function OverigeStats() {
  const [urenStats, setUrenstats] = useState<any>();
  async function getUrenStats() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/overigestats");
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
    },
  };

  return (
    <div className="w-[100%]  group-focus-visible:flex bg-slate-100 mt-4 rounded-md p-4  mr-2 row-span-1">
      <h1 className="text-xl font-semibold text-sky-500">
        Overige statistieken:
      </h1>

      <div className="grid grid-cols-1 mt-4">
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">{}</p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">2021:</p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">2022:</p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">Totaal:</p>
      </div>
      {/* <p className="italic text-slate-400 text-xs">
        Hierin zijn alleen de uren van voltooide shifts meegenomen.
      </p> */}
    </div>
  );
}
