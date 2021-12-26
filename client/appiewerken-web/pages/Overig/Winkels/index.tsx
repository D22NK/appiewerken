import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import { OfficeBuildingIcon } from "@heroicons/react/outline";
import OverigHeader from "../../../components/OverigHeader";
export default function Winkels() {
  const [winkels, setWinkels] = useState<any>([]);
  //   let winkels: any = [];
  async function getWinkels() {
    try {
      const res = await axios.get("http://192.168.68.100:1213/Winkels");
      //   winkels = res.data;
      setWinkels(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWinkels();
  }, []);

  return (
    <MainLayout parentPage="Overig">
      <OverigHeader page="Winkels" />
      {winkels.reverse().map((winkel: any) => {
        return (
          <Link key={winkel.id} href={"/Overig/Winkels/" + winkel.id}>
            <div className="cursor-pointer flex flex-row ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-slate-200">
              <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                <OfficeBuildingIcon className=" w-6 text-sky-700" />
              </div>
              <div className="flex items-center w-full mr-4">
                <h2 className="text-sky-700 font-bold ml-6">
                  {winkel.winkelNr}
                </h2>
                <p className="text-slate-400 flex-1 ml-2">
                  Shifts: {winkel.shifts && winkel.shifts.length}
                </p>

                <p className="text-slate-400"> {winkel.adres}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </MainLayout>
  );
}
