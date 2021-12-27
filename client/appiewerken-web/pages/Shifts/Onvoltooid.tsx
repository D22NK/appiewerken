import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";
import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  ClockIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import ShiftHeader from "../../components/ShiftHeader";
import dateformatter from "../../functions/dateformatter";
import dagformatter from "../../functions/dagformatter";

export default function OnvoltooideShifts() {
  const [shifts, setShifts] = useState<any>([]);
  //   let winkels: any = [];
  async function getShifts() {
    try {
      const res = await axios.get(
        "http://192.168.68.100:1213/shifts/onvoltooid"
      );
      //   winkels = res.data;
      setShifts(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <MainLayout parentPage="Shifts">
      <ShiftHeader page="Onvoltooide Shifts" />
      {shifts.map((shift: any) => {
        return (
          <>
            <Link key={shift.id} href={"/Shifts/" + shift.id}>
              <div className="cursor-pointer flex flex-row md:ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-slate-200">
                <div className="flex justify-center bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                  <BriefcaseIcon className=" w-6 text-sky-700" />
                </div>
                <div className="flex flex-col md:flex-row w-full ml-4 md:mr-4 p-2 md:items-center md:ml-0">
                  <h2 className="text-sky-700 font-bold md:ml-6 flex flex-row">
                    {dagformatter(shift.dag)} &middot;{" "}
                    {dateformatter(shift.datum)}
                    {shift.voltooid && (
                      <BadgeCheckIcon className="ml-4 w-4 text-violet-500" />
                    )}
                  </h2>
                  <p className="text-slate-400 flex-1 flex flex-row md:ml-2 md:items-center">
                    <ClockIcon className="w-4" /> {shift.tijdslot.slot}
                  </p>

                  <p className="text-slate-400 flex flex-row items-center md:items-center">
                    <OfficeBuildingIcon className="w-4" />{" "}
                    {shift.winkel.winkelNr}
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