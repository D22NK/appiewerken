import { useEffect, useState } from "react";
import axios from "axios";

export default function BetalingStats() {
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

  return (
    <div className="w-[100%] flex  flex-col bg-slate-100 mt-4 rounded-md p-4 mr-2 row-span-1">
      <h1 className="text-xl font-semibold text-sky-500">Betalingen:</h1>
      <div className="flex flex-col">
        <p className="font-semibold">
          Alltime: € {betalingstats?.totaal._sum.bedrag.toFixed(2)}
        </p>

        <p>2020: € {betalingstats?.totaal2020._sum.bedrag.toFixed(2)}</p>

        <p>2021: € {betalingstats?.totaal2021._sum.bedrag.toFixed(2)}</p>

        <p>2022: € {betalingstats?.totaal2022._sum.bedrag.toFixed(2)}</p>
      </div>
    </div>
  );
}
