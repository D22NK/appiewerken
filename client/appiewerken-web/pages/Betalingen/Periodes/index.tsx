import { useEffect, useState } from "react";
import Link from "next/link";
import dateformatter from "../../../functions/dateformatter";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import {
  CurrencyEuroIcon,
  ChartPieIcon,
  CalendarIcon,
  BriefcaseIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import BetalingsHeader from "../../../components/BetalingHeader";
export default function Periodes() {
  const [periodes, setPeriodes] = useState<any>([]);
  //   let winkels: any = [];
  async function getPeriodes() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/periodes");
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
      {periodes.map((periode: any) => {
        return (
          <>
            <Link key={periode.id} href={"/Betalingen/Periodes/" + periode.id}>
              <div className="cursor-pointer flex flex-row md:ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-sky-400">
                <div className="flex justify-center bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                  <CurrencyEuroIcon className=" w-6 text-sky-700" />
                </div>
                <div className="flex flex-col md:flex-row w-full ml-4 md:mr-4 p-2 md:items-center md:ml-0">
                  <h2 className="text-sky-700 font-bold md:ml-6 flex flex-row">
                    {dateformatter(periode.startDatum)} tot{" "}
                    {dateformatter(periode.eindDatum)}
                    {periode.persoonlijkeBonus && (
                      <CurrencyEuroIcon className=" w-4 text-orange-500" />
                    )}
                    {periode.winstuitkering && (
                      <ChartPieIcon className=" w-4 text-orange-500" />
                    )}
                    {periode.betaling && (
                      <span className="flex items-center justify-center px-2 py-1 mr-2 md:mx-2 text-xs font-bold leading-none  bg-green-700 bg-opacity-25 rounded-full">
                        <BadgeCheckIcon className=" w-4 text-green-500" />
                      </span>
                    )}
                  </h2>
                  <p className="text-slate-400 flex-1 flex flex-row md:ml-2 md:items-center">
                    <BriefcaseIcon className="w-4 mr-2 md:mr-0" /> Shifts:{" "}
                    {periode.shifts && periode.shifts.length}
                  </p>

                  <p className="text-slate-400 flex flex-row items-center md:items-center">
                    {periode.slug}
                  </p>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </MainLayout>
  );
}
