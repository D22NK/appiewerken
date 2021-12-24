import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import { CashIcon } from "@heroicons/react/outline";
import OverigHeader from "../../../components/OverigHeader";
export default function Winkels() {
  const [uurlonen, setUurlonen] = useState<any>([]);
  //   let winkels: any = [];
  async function getUurlonen() {
    try {
      const res = await axios.get("http://192.168.68.100:1213/uurlonen");
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
          <Link key={uurloon.id} href={"/Overig/Uurlonen/" + uurloon.id}>
            <div className="cursor-pointer flex flex-row ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-slate-200">
              <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                <CashIcon className=" w-6 text-sky-700" />
              </div>
              <div className="flex items-center w-full mr-4">
                <h2 className="text-sky-700 font-bold ml-6 flex-1">
                  € {uurloon.loon}
                </h2>
                <p className="text-slate-400">Leeftijd: {uurloon.leeftijd}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </MainLayout>
  );
}
