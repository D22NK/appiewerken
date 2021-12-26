import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import {
  CurrencyEuroIcon,
  ChartPieIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import BetalingsHeader from "../../../components/BetalingHeader";
export default function Periodes() {
  const [periodes, setPeriodes] = useState<any>([]);
  //   let winkels: any = [];
  async function getPeriodes() {
    try {
      const res = await axios.get("http://localhost:1213/periodes");
      //   winkels = res.data;
      setPeriodes(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPeriodes();
  }, []);

  return (
    <MainLayout parentPage="Betalingen">
      <BetalingsHeader page="Periodes" />
      {periodes.length < 1 && (
        <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400 mt-4">
          <p>Geen periodes gevonden!</p>
        </div>
      )}
      {periodes.reverse().map((periode: any) => {
        return (
          <Link key={periode.id} href={"/Betalingen/Periodes/" + periode.id}>
            <div className="cursor-pointer flex flex-row ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-slate-200">
              <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                <CalendarIcon className=" w-6 text-sky-700" />
              </div>
              <div className="flex items-center w-full mr-4">
                <h2 className="text-sky-700 font-bold ml-6">
                  {periode.startDatum &&
                    periode.startDatum.replace("T00:00:00.000Z", "")}{" "}
                  tot{" "}
                  {periode.eindDatum &&
                    periode.eindDatum.replace("T00:00:00.000Z", "")}
                </h2>
                <p className="text-slate-400 flex-1 ml-2">
                  Shifts: {periode.shifts && periode.shifts.length}
                </p>
                <p className="text-slate-400">{periode.slug}</p>
                {periode.persoonlijkeBonus && (
                  <div className="bg-transparent p-4 rounded-md bg-100 bg-opacity-25">
                    <CurrencyEuroIcon className=" w-6 text-orange-500" />
                  </div>
                )}
                {periode.winstuitkering && (
                  <div className="bg-transparent p-4 rounded-md bg-100 bg-opacity-25">
                    <ChartPieIcon className=" w-6 text-orange-500" />
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </MainLayout>
  );
}
