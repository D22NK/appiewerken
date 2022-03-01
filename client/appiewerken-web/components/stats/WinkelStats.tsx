import { useEffect, useState } from "react";
import axios from "axios";

export default function WinkelStats({ winkelid }: any) {
  const [stats, setStats] = useState<any>();
  async function getUrenStats() {
    try {
      const res = await axios.get(
        `https://ahwapi.d22nk.nl/winkelstats/${winkelid}`
      );
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUrenStats();
  }, []);

  return (
    <div className="w-[100%]  group-focus-visible:flex bg-slate-100 mt-4 rounded-md p-4  mr-2 row-span-1">
      <h1 className="text-xl font-semibold text-sky-500">
        Winkel statistieken:
      </h1>

      <div className="grid grid-cols-1 mt-4">
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          <span className="text-sky-500 font-semibold">6000</span> gewerkte uren
        </p>
      </div>
    </div>
  );
}
