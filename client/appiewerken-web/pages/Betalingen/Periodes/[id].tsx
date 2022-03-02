import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dateformatter from "../../../functions/dateformatter";
import ShiftList from "../../../components/Shifts/ShiftList";
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
import useConfirm from "../../../components/ConfirmDialog/useConfirm";

export default function PeriodeDetails() {
  const router = useRouter();
  const [periode, setPeriode] = useState<any>([]);
  const { confirm } = useConfirm();
  const [bericht, setBericht] = useState<any>("");
  const [periodeStats, setPeriodeStats] = useState<any>([]);
  useEffect(() => {
    getPeriode();
    calculateStats();
  }, [router]);

  async function getPeriode() {
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`https://ahwapi.d22nk.nl/periode/${id}`);
        if (!res.data) {
          router.push("/Betalingen/Periodes");
        } else {
          setPeriode(res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function deletePeriode() {
    const isConfirmed = await confirm(
      "Periode verwijderen",
      "Weet je zeker dat je deze periode wil verwijderen? \n Als je deze periode verwijdert is hij voor altijd weg en niet meer terug te halen."
    );

    if (isConfirmed) {
      const { id } = await router.query;
      const res = await axios.delete(`https://ahwapi.d22nk.nl/periode/${id}`);
      if (res.status === 200) {
        setBericht("Periode verwijderd.");
        router.push("/Betalingen/Periodes");
      } else {
        setBericht("Er ging iets mis.");
      }
    } else {
      return;
    }
  }

  function calculateStats() {
    let ug = 0;
    let ub = 0;
    let ugv = 0;
    let ubv = 0;
    let bedrag = 0;
    let bedragv = 0;
    periode?.shifts?.forEach((shift: any) => {
      console.log("CALCCCCCCC", shift);
      ug += shift.urenGewerkt;
      ub += shift.urenBetaald;
      // bedrag = bedrag + shift.uurloon.loon * shift.urenBetaald;
      if (shift.voltooid) {
        ugv += shift.urenGewerkt;
        ubv += shift.urenBetaald;
        // bedragv = bedragv + shift.uurloon.loon * shift.urenBetaald;
      }
    });
    setPeriodeStats({ ug, ub, ugv, ubv });
  }

  return (
    <MainLayout parentPage="Betalingen">
      <BetalingHeader page="Periode Informatie" />
      <div className="flex flex-col lg:flex-row ">
        {bericht !== "" && (
          <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
            <p>{bericht}</p>
          </div>
        )}
        <div
          key={periode.id}
          className="flex flex-col  items-center my-2 md:m-2 p-4 bg-slate-100  w-[100%] lg:w-max rounded-md  h-min"
        >
          <div className="flex  flex-1 flex-row w-[100%] mb-2 border-b-2 border-b-slate-200 pb-2 ">
            <button
              onClick={() => deletePeriode()}
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
            <CalendarIcon className=" w-16 text-sky-700" />
          </div>
          <div className="flex flex-col items-center w-full ">
            <h2 className="text-sky-700 font-bold  flex-1">{periode.slug}</h2>
            <p className="text-slate-400">
              {periode.startDatum &&
                dateformatter(
                  periode.startDatum.replace("T00:00:00.000Z", "")
                )}{" "}
              tot{" "}
              {periode.eindDatum &&
                dateformatter(periode.eindDatum.replace("T00:00:00.000Z", ""))}
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
            {periode.betaling && (
              <p className="text-slate-400">
                Betaling: € {periode.betaling.bedrag}
              </p>
            )}

            <p className="text-slate-400">
              Uren gewerkt: {periodeStats?.ug} (voltooid: {periodeStats?.ugv})
            </p>
            <p className="text-slate-400">
              {/* Uren betaald: {periodeUren().urenbetaald} */}
            </p>
          </div>
        </div>

        <div className="flex-1 my-2 md:m-2 p-4 bg-slate-100 w-[100%] rounded-md ">
          <h1 className="text-xl font-bold text-sky-500">
            Shifts ({periode.shifts && periode.shifts.length}):
          </h1>
          <div className="flex flex-col p-2">
            <ShiftList shifts={periode.shifts} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
