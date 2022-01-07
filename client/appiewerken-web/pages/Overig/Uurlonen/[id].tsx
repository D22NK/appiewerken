import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import MainLayout from "../../../components/layouts/Main";
import OverigHeader from "../../../components/OverigHeader";
import { CashIcon, TrashIcon, PencilAltIcon } from "@heroicons/react/outline";
import axios from "axios";
import ShiftList from "../../../components/shiftList";
export default function UurloonDetails() {
  const router = useRouter();
  const [uurloon, setUurloon] = useState<any>([]);
  useEffect(() => {
    getUurloon();
  }, [router]);

  async function getUurloon() {
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`https://ahwapi.d22nk.nl/uurloon/${id}`);
        if (!res.data) {
          router.push("/Overig/Winkels");
        } else {
          setUurloon(res.data);
        }
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
  //       const res = await axios.delete(`https://ahwapi.d22nk.nl/uurloon/${id}`);
  //       if (res.status === 200) {
  //         alert("winkel verwijderd");

  //         router.push("/Overig/Winkels");
  //       } else {
  //         alert("er ging iets fout");
  //       }
  //     } catch (error) {}
  //   }

  return (
    <MainLayout parentPage="Overig">
      <OverigHeader page="Uurloon Informatie" />
      <div className="flex flex-col lg:flex-row ">
        <div
          key={uurloon.id}
          className="flex flex-col  items-center my-2 md:m-2 p-4 bg-slate-100  w-[100%] lg:w-max rounded-md  h-min"
        >
          {/* <div className="flex  flex-1 flex-row w-[100%] mb-2 border-b-2 border-b-slate-200 pb-2 ">
            <button
              onClick={() => deleteWinkel()}
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
            <CashIcon className=" w-16 text-sky-700" />
          </div>
          <div className="flex flex-col items-center w-full ">
            <h2 className="text-sky-700 font-bold  flex-1">€ {uurloon.loon}</h2>
            <p className="text-slate-400">Leeftijd: {uurloon.leeftijd}</p>
          </div>
        </div>

        <div className="flex-1 my-2 md:m-2 p-4 bg-slate-100 w-[100%] rounded-md ">
          <h1 className="text-xl font-bold text-sky-500">
            Shifts ({uurloon.shifts && uurloon.shifts.length}):
          </h1>
          <div className="flex flex-col p-2">
            <ShiftList shifts={uurloon.shifts} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
