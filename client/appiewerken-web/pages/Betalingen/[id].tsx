import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dateformatter from "../../functions/dateformatter";
import MainLayout from "../../components/layouts/Main";
import useConfirm from "../../components/ConfirmDialog/useConfirm";

import {
  OfficeBuildingIcon,
  TrashIcon,
  PencilAltIcon,
  CurrencyEuroIcon,
  ChartPieIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import BetalingHeader from "../../components/BetalingHeader";
import ShiftList from "../../components/Shifts/ShiftList";

export default function WinkelDetails() {
  const router = useRouter();
  const [betaling, setBetaling] = useState<any>([]);
  const { confirm } = useConfirm();
  const [bericht, setBericht] = useState<any>("");
  useEffect(() => {
    getBetaling();
  }, [router]);

  async function getBetaling() {
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`https://ahwapi.d22nk.nl/betaling/${id}`);
        if (!res.data) {
          router.push("/Betalingen");
        } else {
          setBetaling(res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteBetaling() {
    const isConfirmed = await confirm(
      "Betaling verwijderen",
      "Weet je zeker dat je deze betaling wil verwijderen? \n Als je deze betaling verwijdert is hij voor altijd weg en niet meer terug te halen."
    );

    if (isConfirmed) {
      const { id } = await router.query;
      const res = await axios.delete(`https://ahwapi.d22nk.nl/betaling/${id}`);
      if (res.status === 200) {
        setBericht("Betaling verwijderd.");
        router.push("/Betalingen");
      } else {
        setBericht("Er ging iets mis.");
      }
    } else {
      return;
    }
  }

  return (
    <MainLayout parentPage="Betalingen">
      <BetalingHeader page="Betaling Informatie" />
      <div className="flex flex-col lg:flex-row ">
        {bericht !== "" && (
          <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
            <p>{bericht}</p>
          </div>
        )}
        <div
          key={betaling.id}
          className="flex flex-col  items-center mt-2 p-4 bg-slate-100  w-[100%] lg:w-max rounded-md  h-min"
        >
          <div className="flex  flex-1 flex-row w-[100%] mb-2 border-b-2 border-b-slate-200 pb-2 ">
            <button
              onClick={() => deleteBetaling()}
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
          </div>
          <div className="bg-sky-500 p-4  rounded-md bg-100 bg-opacity-25 w-min">
            <CurrencyEuroIcon className=" w-16 text-sky-700" />
          </div>
          <div className="flex flex-col items-center w-full ">
            <h2 className="text-sky-700 font-bold  flex-1">
              € {betaling.bedrag}
            </h2>
            <p className="text-slate-400">
              {betaling.ontvangstdatum &&
                dateformatter(betaling.ontvangstdatum)}
            </p>
            {betaling.betaalPeriode && (
              <>
                <p className="font-bold text-sky-500">Betaalperiode: </p>
                <p className="text-slate-400">{betaling.betaalPeriode.slug}</p>
                <p className="text-slate-400">
                  {dateformatter(betaling.betaalPeriode.startDatum)} tot{" "}
                  {dateformatter(betaling.betaalPeriode.eindDatum)}
                </p>

                <div className="flex flex-row">
                  {betaling.betaalPeriode.persoonlijkeBonus && (
                    <div className="bg-transparent p-4 rounded-md bg-100 bg-opacity-25">
                      <CurrencyEuroIcon className=" w-6 text-orange-500" />
                    </div>
                  )}
                  {betaling.betaalPeriode.winstuitkering && (
                    <div className="bg-transparent p-4 rounded-md bg-100 bg-opacity-25">
                      <ChartPieIcon className=" w-6 text-orange-500" />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 mt-2 p-4 bg-slate-100 w-[100%] rounded-md lg:ml-2">
          <h1 className="text-xl font-bold text-sky-500">
            Shifts (
            {betaling.betaalPeriode &&
              betaling.betaalPeriode.shifts &&
              betaling.betaalPeriode.shifts.length}
            ):
          </h1>
          <div className="flex flex-col p-2">
            <ShiftList shifts={betaling.betaalPeriode?.shifts} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
