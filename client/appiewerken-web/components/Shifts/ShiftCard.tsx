import Link from "next/link";
import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  ClockIcon,
  BadgeCheckIcon,
  SparklesIcon,
  MinusCircleIcon,
} from "@heroicons/react/outline";
import dateformatter from "../../functions/dateformatter";
import dagformatter from "../../functions/dagformatter";
import daysBetween from "../../functions/daysBetween";
export default function ShiftCard({ shift, className }: any) {
  return (
    <>
      <Link key={shift.id} href={"/Shifts/" + shift.id}>
        <div
          className={
            className +
            "cursor-pointer flex flex-row md:ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-slate-200 "
          }
        >
          <div className="flex justify-center bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
            <BriefcaseIcon className=" w-6 text-sky-700" />
          </div>
          <div className="flex flex-col md:flex-row w-full ml-4 md:mr-4 p-2 md:items-center md:ml-0">
            <div className="flex flex-col md:flex-row">
              <h2 className="text-sky-700 font-bold md:ml-6 flex flex-row flex-1">
                {dagformatter(shift.dag)} &middot; {dateformatter(shift.datum)}
                {shift.feestdag && (
                  <SparklesIcon className="ml-4 w-4 text-amber-400" />
                )}
              </h2>
              <div className="flex flex-row">
                {(shift.ziek || shift.bcd) && (
                  <MinusCircleIcon className="md:ml-4 w-4 text-red-500" />
                )}
                {shift.voltooid && (
                  <BadgeCheckIcon className="md:ml-4 w-4 text-violet-500" />
                )}
                {shift.voltooid && (
                  <p className="text-slate-400 ml-2">
                    {daysBetween(shift.datum)} dagen geleden
                  </p>
                )}
                {!shift.voltooid && (
                  <p className="text-slate-400  md:ml-2">
                    over {daysBetween(shift.datum)} dagen
                  </p>
                )}
              </div>
            </div>
            <p className="text-slate-400 flex-1 flex flex-row md:ml-2 md:items-center">
              <ClockIcon className="w-4" /> {shift.tijdslot.slot}
            </p>

            <p className="text-slate-400 flex flex-row items-center md:items-center">
              <OfficeBuildingIcon className="w-4" /> {shift.winkel.winkelNr}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}