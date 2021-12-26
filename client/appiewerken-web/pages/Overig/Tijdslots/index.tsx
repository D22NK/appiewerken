import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import { ClockIcon } from "@heroicons/react/outline";
import OverigHeader from "../../../components/OverigHeader";
export default function Tijdslots() {
  const [tijdslots, setTijdslots] = useState<any>([]);
  //   let winkels: any = [];
  async function getTijdslots() {
    try {
      const res = await axios.get("http://192.168.68.100:1213/tijdslots");
      //   winkels = res.data;
      setTijdslots(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTijdslots();
  }, []);

  return (
    <MainLayout parentPage="Overig">
      <OverigHeader page="Tijdslots" />
      {tijdslots.map((tijdslot: any) => {
        return (
          <Link key={tijdslots.id} href={"/Overig/Tijdslots/" + tijdslot.id}>
            <div className="cursor-pointer flex flex-row ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-slate-200">
              <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                <ClockIcon className=" w-6 text-sky-700" />
              </div>
              <div className="flex items-center w-full mr-4">
                <h2 className="text-sky-700 font-bold ml-6">{tijdslot.slot}</h2>

                <p className="text-slate-400 flex-1 ml-2">
                  Shifts: {tijdslot.shifts?.length}
                </p>

                <p className="text-slate-400  ml-2">Uren: {tijdslot.uren}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </MainLayout>
  );
}
