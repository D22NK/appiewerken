import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import MainLayout from "../../../components/layouts/Main";
import {
  TrashIcon,
  PencilAltIcon,
  CalendarIcon,
  ChartPieIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import BetalingHeader from "../../../components/BetalingHeader";

export default function PeriodeDetails() {
  const router = useRouter();
  const [periode, setPeriode] = useState<any>([]);
  useEffect(() => {
    getPeriode();
  }, [router]);

  async function getPeriode() {
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`http://192.168.68.100:1213/periode/${id}`);
        setPeriode(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //   async function deleteWinkel() {
  //     try {
  //       const answer = await confirm(
  //         "Weet je zeker dat je deze winkel wilt verwijderen?"
  //       );
  //       console.log(answer);
  //       if (!answer) return;
  //       const { id } = await router.query;
  //       const res = await axios.delete(`http://192.168.68.100:1213/winkel/${id}`);
  //       if (res.status === 200) {
  //         alert("winkel verwijderd");

  //         router.push("/Overig/Winkels");
  //       } else {
  //         alert("er ging iets fout");
  //       }
  //     } catch (error) {}
  //   }

  return (
    <MainLayout parentPage="Betalingen">
      <BetalingHeader page="Periode Informatie" />
      <div className="flex flex-col lg:flex-row ">
        <div
          key={periode.id}
          className="flex flex-col  items-center m-2 p-4 bg-slate-100  w-[100%] lg:w-max rounded-md  h-min"
        >
          {/* <div className="flex  flex-1 flex-row w-[100%] mb-2 border-b-2 border-b-slate-200 pb-2 ">
            <button
              //   onClick={() => deleteWinkel()}
              className="mr-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-2 py-2  rounded-md "
            >
              <TrashIcon className=" w-4 text-white" />
            </button>

            <button
              disabled
              className="mr-2 bg-slate-200 hover:bg-slate-200 text-white font-bold text-xs px-2 py-2  rounded-md "
            >
              <PencilAltIcon className=" w-4 text-white" />
            </button>
          </div> */}
          <div className="bg-sky-500 p-4  rounded-md bg-100 bg-opacity-25 w-min">
            <CalendarIcon className=" w-16 text-sky-700" />
          </div>
          <div className="flex flex-col items-center w-full ">
            <h2 className="text-sky-700 font-bold  flex-1">{periode.slug}</h2>
            <p className="text-slate-400">
              {periode.startDatum &&
                periode.startDatum.replace("T00:00:00.000Z", "")}{" "}
              tot{" "}
              {periode.eindDatum &&
                periode.eindDatum.replace("T00:00:00.000Z", "")}
            </p>

            <div className="flex flex-row">
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
        </div>

        <div className="flex-1 m-2 p-4 bg-slate-100 w-[100%] rounded-md ">
          <h1 className="text-xl font-bold text-sky-500">
            Shifts ({periode.shifts && periode.shifts.length}):
          </h1>
          <div className="flex flex-col p-2">
            <Link href="/Shifts">
              <div className="w-[100%] bg-slate-300 rounded-md p-2 h-16 mb-2 hover:bg-slate-400">
                Shift
              </div>
            </Link>

            <Link href="/Shifts">
              <div className="w-[100%] bg-slate-300 rounded-md p-2 h-16 mb-2 hover:bg-slate-400">
                Shift
              </div>
            </Link>

            <Link href="/Shifts">
              <div className="w-[100%] bg-slate-300 rounded-md p-2 h-16 mb-2 hover:bg-slate-400">
                Shift
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
