import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import MainLayout from "../../components/layouts/Main";
import ShiftHeader from "../../components/ShiftHeader";
import {
  OfficeBuildingIcon,
  TrashIcon,
  PencilAltIcon,
  BriefcaseIcon,
  BadgeCheckIcon,
  ClockIcon,
  LocationMarkerIcon,
  CurrencyEuroIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import dateformatter from "../../functions/dateformatter";
import dagformatter from "../../functions/dagformatter";
export default function ShiftDetails() {
  const router = useRouter();
  const [shift, setShift] = useState<any>([]);
  const [bericht, setBericht] = useState<String>("");

  useEffect(() => {
    getShift();
  }, [router]);

  async function getShift() {
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`https://ahwapi.d22nk.nl/shift/${id}`);
        if (!res.data) {
          router.push("/Overig/Winkels");
        } else {
          setShift(res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function voltooiShift() {
    const { id } = await router.query;
    if (id) {
      axios
        .post("https://ahwapi.d22nk.nl/voltooi-shift", {
          id: id,
        })
        .then(function (response) {
          if (response.status === 200) {
            setBericht("Shift voltooid");

            setTimeout(() => {
              router.reload();
            }, 1000);
          } else if (response.status === 500) {
            setBericht("Er ging iets mis");
          }
        })
        .catch(function (error) {
          setBericht("Er ging iets mis");
          console.log(error);
        });
    }
  }

  async function onvoltooiShift() {
    const { id } = await router.query;
    if (id) {
      axios
        .post("https://ahwapi.d22nk.nl/onvoltooi-shift", {
          id: id,
        })
        .then(function (response) {
          if (response.status === 200) {
            setBericht("Shift onvoltooid");

            setTimeout(() => {
              router.reload();
            }, 1000);
          } else if (response.status === 500) {
            setBericht("Er ging iets mis");
          }
        })
        .catch(function (error) {
          setBericht("Er ging iets mis");
          console.log(error);
        });
    }
  }

  return (
    <MainLayout parentPage="Shifts">
      <ShiftHeader page="Shift Informatie" />
      {bericht !== "" && (
        <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
          <p>{bericht}</p>
        </div>
      )}
      <div className="w-[100%] flex flex-col items-center">
        <div className="flex flex-col  items-center justify-center my-2  p-4 bg-slate-300 w-[100%] md:w-[75%]  rounded-md  ">
          <div className="bg-sky-500 p-4  rounded-md bg-100 bg-opacity-25 w-min">
            <BriefcaseIcon className=" w-16 text-sky-700" />
          </div>
          <div className="flex flex-col items-center w-full ">
            <h2 className="text-sky-700 font-bold  flex-1 flex flex-row">
              {shift.dag && dagformatter(shift.dag)} &middot;{" "}
              {shift.datum && dateformatter(shift.datum)}
            </h2>
            <div className="flex flex-row">
              {shift.voltooid && (
                <button
                  onClick={() => {
                    onvoltooiShift();
                  }}
                >
                  <BadgeCheckIcon className="w-4 text-violet-400" />
                </button>
              )}
              {!shift.voltooid && (
                <button
                  onClick={() => {
                    voltooiShift();
                  }}
                >
                  <BadgeCheckIcon className="w-4 text-slate-100" />
                </button>
              )}
              {shift.feestdag && (
                <SparklesIcon className="ml-4 w-4 text-amber-400" />
              )}
            </div>
            <p className="text-slate-400">{shift.tijdslot?.slot}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-[100%] md:w-[75%]">
          <Link href={"/Overig/Winkels/" + shift.winkel?.id}>
            <div className="flex flex-col  items-center justify-center my-2 md:m-2 p-4 bg-slate-100   rounded-md  hover:border-sky-400 border-2 border-slate-100 cursor-pointer">
              <div className="bg-sky-500 p-4  rounded-md bg-100 bg-opacity-25 w-min">
                <OfficeBuildingIcon className=" w-16 text-sky-700" />
              </div>
              <div className="flex flex-col items-center w-full ">
                <h2 className="text-sky-700 font-bold  flex-1 flex flex-row">
                  {shift.winkel?.winkelNr}
                </h2>
                <p className="text-slate-400 flex flex-row">
                  <LocationMarkerIcon className=" w-4" />
                  {shift.winkel?.adres}
                </p>
              </div>
            </div>
          </Link>
          <Link href={"/Overig/Tijdslots/" + shift.tijdslot?.id}>
            <div className="flex flex-col  items-center justify-center my-2 md:m-2 p-4 bg-slate-100   rounded-md   hover:border-sky-400 border-2 border-slate-100 cursor-pointer">
              <div className="bg-sky-500 p-4  rounded-md bg-100 bg-opacity-25 w-min">
                <ClockIcon className=" w-16 text-sky-700" />
              </div>
              <div className="flex flex-col items-center w-full ">
                <h2 className="text-sky-700 font-bold  flex-1 flex flex-row">
                  {shift.tijdslot?.slot}
                </h2>
                <p className="text-slate-400">
                  Uren gewerkt: {shift.urenGewerkt}
                </p>
                <p className="text-slate-400">
                  Uren betaald: {shift.urenBetaald}
                </p>
              </div>
            </div>
          </Link>

          <Link href={"/Overig/Uurlonen/" + shift.uurloon?.id}>
            <div className="flex flex-col  items-center justify-center my-2 md:m-2 p-4 bg-slate-100   rounded-md   hover:border-sky-400 border-2 border-slate-100 cursor-pointer">
              <div className="bg-sky-500 p-4  rounded-md bg-100 bg-opacity-25 w-min">
                <CurrencyEuroIcon className=" w-16 text-sky-700" />
              </div>
              <div className="flex flex-col items-center w-full ">
                <h2 className="text-sky-700 font-bold  flex-1 flex flex-row">
                  € {shift.uurloon?.loon}
                </h2>
                <p className="text-slate-400">
                  Leeftijd: {shift.uurloon?.leeftijd}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
