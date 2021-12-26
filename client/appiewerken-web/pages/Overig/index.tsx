import Link from "next/link";

import MainLayout from "../../components/layouts/Main";
import OverigHeader from "../../components/OverigHeader";
import {
  ClockIcon,
  OfficeBuildingIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/outline";

export default function Overig() {
  return (
    <MainLayout parentPage="Overig">
      <OverigHeader page="index" />

      <div className="flex flex-col md:flex-row h-48 mb-2 ">
        <Link href="/Overig/Winkels">
          <div className="flex flex-col border-2 border-slate-200 my-4 rounded-md p-4 w-[100%] md:w-[33.333%] items-center justify-center md:mr-2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <OfficeBuildingIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Winkels</h2>
          </div>
        </Link>
        <Link href="/Overig/Uurlonen">
          <div className="flex flex-col border-2 border-slate-200 my-4 rounded-md p-4 w-[100%] md:w-[33.333%] items-center justify-center md:mr-2 cursor-pointer  hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <CurrencyEuroIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Uurlonen</h2>
          </div>
        </Link>
        <Link href="/Overig/Tijdslots">
          <div className="flex flex-col border-2 border-slate-200 my-4 rounded-md p-4 w-[100%] md:w-[33.333%] items-center justify-center2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <ClockIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Tijdslots</h2>
          </div>
        </Link>
      </div>
    </MainLayout>
  );
}
