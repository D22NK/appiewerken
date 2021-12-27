import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  ClockIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import dagformatter from "../functions/dagformatter";
import dateformatter from "../functions/dateformatter";
export default function ShiftList({ shifts }: any) {
  return (
    <div>
      {shifts?.map((shift: any) => {
        return (
          <>
            <Link key={shift.id} href={"/Shifts/" + shift.id}>
              <div className="cursor-pointer flex flex-row ml-2 mt-4 bg-slate-200  rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-sky-400">
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
                    <ClockIcon className="w-4" /> {shift.tijdslot?.slot}
                  </p>

                  <p className="text-slate-400 flex flex-row items-center md:items-center">
                    <OfficeBuildingIcon className="w-4" />{" "}
                    {shift.winkel?.winkelNr}
                  </p>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
}
