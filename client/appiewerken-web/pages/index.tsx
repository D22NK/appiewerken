import MainLayout from "../components/layouts/Main";
import DashboardHeader from "../components/DashboardHeader";
import {
  ClockIcon,
  OfficeBuildingIcon,
  CurrencyEuroIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChartBarIcon,
  RssIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

export default function Index() {
  return (
    <MainLayout parentPage="Index">
      {/* <DashboardHeader page="Index" /> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        <Link href="/Dashboard">
          <div className="flex flex-col col-span-2 border-2 border-slate-200  rounded-md p-4  items-center justify-center md:mr-2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <PresentationChartBarIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Dashboard</h2>
          </div>
        </Link>
        <Link href="/Shifts">
          <div className="flex flex-col border-2 border-slate-200  rounded-md p-4  items-center justify-center md:mr-2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <BriefcaseIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Shifts</h2>
          </div>
        </Link>

        <Link href="/Betalingen">
          <div className="flex flex-col border-2 border-slate-200  rounded-md p-4  items-center justify-center md:mr-2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <CurrencyEuroIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Betalingen</h2>
          </div>
        </Link>

        <Link href="/Kalender">
          <div className="flex flex-col border-2 border-slate-200 rounded-md p-4  items-center justify-center md:mr-2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <CalendarIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Kalender</h2>
          </div>
        </Link>

        <Link href="/Overig/Winkels">
          <div className="flex flex-col border-2 border-slate-200 rounded-md p-4  items-center justify-center md:mr-2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <OfficeBuildingIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Winkels</h2>
          </div>
        </Link>
        <Link href="/Overig/Uurlonen">
          <div className="flex flex-col border-2 border-slate-200  rounded-md p-4  items-center justify-center md:mr-2 cursor-pointer  hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <CurrencyEuroIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Uurlonen</h2>
          </div>
        </Link>
        <Link href="/Overig/Tijdslots">
          <div className="flex flex-col border-2 border-slate-200  rounded-md p-4  items-center justify-center2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <ClockIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Tijdslots</h2>
          </div>
        </Link>
        <Link href="/Shiftfollower">
          <div className="flex flex-col border-2 border-slate-200  rounded-md p-4  items-center justify-center2 cursor-pointer hover:border-sky-400">
            <div className="bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
              <RssIcon className=" w-10 text-sky-700" />
            </div>
            <h2 className="text-2xl font-bold text-sky-500">Shiftfollower</h2>
          </div>
        </Link>
      </div>
    </MainLayout>
  );
}
