import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import { CashIcon, BriefcaseIcon } from "@heroicons/react/outline";
import OverigHeader from "../../../components/OverigHeader";
export default function Uurlonen() {
  const [uurlonen, setUurlonen] = useState<any>([]);
  //   let winkels: any = [];
  async function getUurlonen() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/uurlonen");
      //   winkels = res.data;
      setUurlonen(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUurlonen();
  }, []);

  return (
    <MainLayout parentPage="Overig">
      <OverigHeader page="Uurlonen" />
      {uurlonen.map((uurloon: any) => {
        return (
          <>
            <Link key={uurloon.id} href={"/Overig/Uurlonen/" + uurloon.id}>
              <div className="cursor-pointer flex flex-row md:ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-sky-400">
                <div className="flex justify-center bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                  <CashIcon className=" w-6 text-sky-700" />
                </div>
                <div className="flex flex-col md:flex-row w-full ml-4 md:mr-4 p-2 md:items-center md:ml-0">
                  <h2 className="text-sky-700 font-bold md:ml-6">
                    € {uurloon.loon}
                  </h2>
                  <p className="text-slate-400 flex-1 flex flex-row md:ml-2 md:items-center">
                    <BriefcaseIcon className="w-4 mr-2 md:mr-0" /> Shifts:{" "}
                    {uurloon.shifts && uurloon.shifts.length}
                  </p>

                  <p className="text-slate-400 flex flex-row md:items-center">
                    {/* <BriefcaseIcon className="h-5 mr-2 md:mr-0 md:h-4" /> */}
                    Leeftijd: {uurloon.leeftijd}
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
