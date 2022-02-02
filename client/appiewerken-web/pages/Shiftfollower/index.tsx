import { useEffect, useState } from "react";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";
import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  ClockIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import dateformatter from "../../functions/dateformatter";
import dagformatter from "../../functions/dagformatter";
import daysUntil from "../../functions/daysBetween";
import Loader from "../../components/Loader";
export default function OnvoltooideShifts() {
  const [shifts, setShifts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  async function getShifts() {
    setLoading(true);
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shifts/onvoltooid");
      setShifts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <MainLayout parentPage="Shiftfollower">
      <h1 className="flex-1 text-2xl font-bold text-sky-500">Shiftfollower</h1>
      {loading && <Loader />}

      {shifts.map((shift: any) => {
        return (
          <>
            <div className="cursor-pointer flex flex-row md:ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-slate-200">
              <div className="flex justify-center bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                <BriefcaseIcon className=" w-6 text-sky-700" />
              </div>
              <div className="flex flex-col md:flex-row w-full ml-4 md:mr-4 p-2 md:items-center md:ml-0">
                <div className="flex flex-row">
                  <h2 className="text-sky-700 font-bold md:ml-6 flex flex-row flex-1">
                    {dagformatter(shift.dag)} &middot;{" "}
                    {dateformatter(shift.datum)}
                    {shift.voltooid && (
                      <BadgeCheckIcon className="ml-4 w-4 text-violet-500" />
                    )}
                  </h2>
                  <p className="text-slate-400 md:ml-2">
                    over {daysUntil(shift.datum)} dagen
                  </p>
                </div>
                <p className="text-slate-400 flex-1 flex flex-row md:ml-2 md:items-center">
                  <ClockIcon className="w-4" /> {shift.tijdslot.slot}
                </p>

                <p className="text-slate-400 flex flex-row items-center md:items-center">
                  <OfficeBuildingIcon className="w-4" /> {shift.winkel.winkelNr}
                </p>
              </div>
            </div>
          </>
        );
      })}
    </MainLayout>
  );
}
