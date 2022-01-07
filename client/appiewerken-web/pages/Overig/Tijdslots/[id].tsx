import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useConfirm from "../../../components/ConfirmDialog/useConfirm";

import MainLayout from "../../../components/layouts/Main";
import OverigHeader from "../../../components/OverigHeader";
import {
  CashIcon,
  TrashIcon,
  PencilAltIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import ShiftList from "../../../components/shiftList";
export default function TijdslotDetails() {
  const { confirm } = useConfirm();
  const [bericht, setBericht] = useState<any>("");
  const router = useRouter();
  const [tijdslot, setTijdslot] = useState<any>([]);
  useEffect(() => {
    getTijdslot();
  }, [router]);

  async function getTijdslot() {
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`https://ahwapi.d22nk.nl/tijdslot/${id}`);
        if (!res.data) {
          router.push("/Overig/Tijdslots");
        } else {
          setTijdslot(res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTijdslot() {
    const isConfirmed = await confirm(
      "Tijdslot verwijderen",
      "Weet je zeker dat je dit tijdslot wil verwijderen? \n Als je dit tijdslot verwijdert is hij voor altijd weg en niet meer terug te halen."
    );

    if (isConfirmed) {
      const { id } = await router.query;
      const res = await axios.delete(`https://ahwapi.d22nk.nl/tijdslot/${id}`);
      if (res.status === 200) {
        setBericht("Tijdslot verwijderd.");
        router.push("/Overig/Tijdslots");
      } else {
        setBericht("Er ging iets mis.");
      }
    } else {
      return;
    }
  }

  return (
    <MainLayout parentPage="Overig">
      <OverigHeader page="Tijdslot Informatie" />
      <div className="flex flex-col lg:flex-row ">
        {bericht !== "" && (
          <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
            <p>{bericht}</p>
          </div>
        )}
        <div
          key={tijdslot.id}
          className="flex flex-col  items-center my-2 md:m-2 p-4 bg-slate-100  w-[100%] lg:w-max rounded-md  h-min"
        >
          <div className="flex  flex-1 flex-row w-[100%] mb-2 border-b-2 border-b-slate-200 pb-2 ">
            <button
              onClick={() => deleteTijdslot()}
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
            <ClockIcon className=" w-16 text-sky-700" />
          </div>
          <div className="flex flex-col items-center w-full ">
            <h2 className="text-sky-700 font-bold  flex-1">{tijdslot.slot}</h2>
            <p className="text-slate-400">uren: {tijdslot.uren}</p>
          </div>
        </div>

        <div className="flex-1 my-2 md:m-2 p-4 bg-slate-100 w-[100%] rounded-md ">
          <h1 className="text-xl font-bold text-sky-500">
            Shifts ({tijdslot.shifts?.length}):
          </h1>
          <div className="flex flex-col p-2">
            <ShiftList shifts={tijdslot.shifts} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
