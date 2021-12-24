import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";
import { CurrencyEuroIcon, ChartPieIcon } from "@heroicons/react/outline";
import BetalingsHeader from "../../components/BetalingHeader";
export default function Betalingen() {
  const [betalingen, setBetalingen] = useState<any>([]);
  //   let winkels: any = [];
  async function getPeriodes() {
    try {
      const res = await axios.get("http://192.168.68.100:1213/betalingen");
      //   winkels = res.data;
      setBetalingen(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPeriodes();
  }, []);

  return (
    <MainLayout parentPage="Betalingen">
      <BetalingsHeader page="Betalingen" />
      {betalingen.length < 1 && (
        <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400 mt-4">
          <p>Geen betalingen gevonden!</p>
        </div>
      )}
      {betalingen.map((betaling: any) => {
        return (
          <Link key={betaling.id} href={"/Betalingen/" + betaling.id}>
            <div className="cursor-pointer flex flex-row ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-slate-200">
              <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                <CurrencyEuroIcon className=" w-6 text-sky-700" />
              </div>
              <div className="flex items-center w-full mr-4">
                <h2 className="text-sky-700 font-bold ml-6 flex-1">
                  {betaling.bedrag}
                </h2>
                <p className="text-slate-400">
                  {betaling.ontvangstdatum.replace("T00:00:00.000Z", "")}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </MainLayout>
  );
}
