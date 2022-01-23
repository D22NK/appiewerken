import {
  BriefcaseIcon,
  OfficeBuildingIcon,
  ClockIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import dagformatter from "../../functions/dagformatter";
import dateformatter from "../../functions/dateformatter";
import ShiftCard from "./ShiftCard";
export default function ShiftList({ shifts }: any) {
  return (
    <div>
      {shifts?.map((shift: any) => {
        return <ShiftCard shift={shift} className="bg-slate-200 " />;
      })}
    </div>
  );
}
