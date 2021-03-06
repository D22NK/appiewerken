import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";
import {
  CurrencyEuroIcon,
  ChartPieIcon,
  BriefcaseIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import BetalingsHeader from "../../components/BetalingHeader";
import dateformatter from "../../functions/dateformatter";
import Loader from "../../components/Loader";
export default function Betalingen() {
  const [betalingen, setBetalingen] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getBetalingen() {
    setLoading(true);
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/betalingen");
      setBetalingen(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBetalingen();
  }, []);

  return (
    <MainLayout parentPage="Betalingen">
      <BetalingsHeader page="Betalingen" />
      {betalingen.length < 1 && (
        <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400 mt-4">
          <p>Geen betalingen gevonden!</p>
        </div>
      )}
      {loading && <Loader />}
      {betalingen.map((betaling: any) => {
        return (
          <>
            <Link key={betaling.id} href={"/Betalingen/" + betaling.id}>
              <div className="cursor-pointer flex flex-row md:ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-sky-400">
                <div className="flex justify-center bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                  <CurrencyEuroIcon className=" w-6 text-sky-700" />
                </div>
                <div className="flex flex-col md:flex-row w-full ml-4 md:mr-4 p-2 md:items-center md:ml-0">
                  <h2 className="text-sky-700 font-bold md:ml-6">
                    € {betaling.bedrag}
                  </h2>
                  <p className="text-slate-400 flex-1 flex flex-row md:ml-2 md:items-center">
                    <BriefcaseIcon className="w-4 mr-2 md:mr-0" /> Shifts:{" "}
                    {betaling.betaalPeriode.shifts &&
                      betaling.betaalPeriode.shifts.length}
                  </p>

                  <p className="text-slate-400 flex flex-row items-center md:items-center">
                    <CalendarIcon className="h-4 mr-2 md:mr-0 md:h-4" />
                    {dateformatter(betaling.ontvangstdatum)}
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
