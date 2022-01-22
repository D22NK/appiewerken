import { useEffect, useState } from "react";
import axios from "axios";

export default function ShiftStats() {
  const [shiftStats, setShiftstats] = useState<any>();
  async function setShiftsStats() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shiftstats");
      setShiftstats(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setShiftsStats();
  }, []);

  return (
    <div className="w-[100%]  group-focus-visible:flex bg-slate-100 mt-4 rounded-md p-4  mr-2 row-span-1">
      <h1 className="text-xl font-semibold text-sky-500">Shifts:</h1>

      <div className="flex flex-col">
        <p className="font-semibold">Alltime: {shiftStats?.totaal}</p>

        <p>2020: {shiftStats?.totaal2020}</p>

        <p>2021: {shiftStats?.totaal2021}</p>

        <p>2022: {shiftStats?.totaal2022}</p>
      </div>
    </div>
  );
}
