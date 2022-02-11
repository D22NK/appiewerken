import MainLayout from "../../components/layouts/Main";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import dateformatter from "../../functions/dateformatter";
import dagformatter from "../../functions/dagformatter";
import daysBetween from "../../functions/daysBetween";
import Link from "next/link";
import {
  BadgeCheckIcon,
  SparklesIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/outline";
export default function Dag() {
  const router = useRouter();
  const [weekshifts, setWeekshifts] = useState<any>([]);
  const [formattedWeek, setFormattedWeek] = useState<any>();
  const [weekStats, setWeekStats] = useState<any>();

  useEffect(() => {
    getWeekShifts();
  }, [router]);

  useEffect(() => {
    formatWeek();
    calculateStats();
  }, [weekshifts]);
  async function getWeekShifts() {
    try {
      const { week } = router.query;

      const res = await axios.get(`https://ahwapi.d22nk.nl/kalender/${week}`);

      setWeekshifts(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  function formatWeek() {
    const maandag = weekshifts[
      weekshifts?.findIndex((d: any) => d.dag == "MAANDAG")
    ] || { string: "-Maandag-" };
    const dinsdag = weekshifts[
      weekshifts?.findIndex((d: any) => d.dag == "DINSDAG")
    ] || { string: "-Dinsdag-" };

    const woensdag = weekshifts[
      weekshifts?.findIndex((d: any) => d.dag == "WOENSDAG")
    ] || { string: "-Woensdag-" };

    const donderdag = weekshifts[
      weekshifts?.findIndex((d: any) => d.dag == "DONDERDAG")
    ] || { string: "-Donderdag-" };

    const vrijdag = weekshifts[
      weekshifts?.findIndex((d: any) => d.dag == "VRIJDAG")
    ] || { string: "-Vrijdag-" };

    const zaterdag = weekshifts[
      weekshifts?.findIndex((d: any) => d.dag == "ZATERDAG")
    ] || { string: "-Zaterdag-" };

    const zondag = weekshifts[
      weekshifts?.findIndex((d: any) => d.dag == "ZONDAG")
    ] || { string: "-Zondag-" };

    setFormattedWeek({
      maandag,
      dinsdag,
      woensdag,
      donderdag,
      vrijdag,
      zaterdag,
      zondag,
    });
  }

  function kalenderStyle(voltooid: Boolean, bcd: Boolean, ziek: Boolean) {
    let res;
    if (bcd) {
      if (!ziek) {
        res = "bg-orange-400 text-orange-900 hover:bg-orange-300";
      } else if (ziek) {
        res = "bg-red-400 text-red-900 hover:bg-red-300";
      }
    } else if (voltooid && !bcd) {
      res = "bg-green-400 text-green-900 hover:bg-green-300";
    } else if (!voltooid) {
      res = "bg-yellow-300 text-yellow-600 hover:bg-yellow-200";
    }
    return res;
  }

  function calculateStats() {
    let ug = 0;
    let ub = 0;
    let ugv = 0;
    let ubv = 0;
    let bedrag = 0;
    let bedragv = 0;
    weekshifts.forEach((shift: any) => {
      ug += shift.urenGewerkt;
      ub += shift.urenBetaald;
      bedrag = bedrag + shift.uurloon.loon * shift.urenBetaald;
      if (shift.voltooid) {
        ugv += shift.urenGewerkt;
        ubv += shift.urenBetaald;
        bedragv = bedragv + shift.uurloon.loon * shift.urenBetaald;
      }
    });
    setWeekStats({ ug, ub, bedrag, ugv, ubv, bedragv });
  }
  return (
    <MainLayout parentPage="Kalender">
      <div className="flex flex-col">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Kalender &middot; WEEK
        </h1>
        <div className="flex flex-col md:flex-row ">
          <div className="flex flex-1 flex-col bg-slate-200 m-2 p-2 rounded-md">
            <h2 className="font-semibold">
              Uren gewerkt: {weekStats?.ug} (voltooid: {weekStats?.ugv})
            </h2>
          </div>

          <div className="flex flex-1 flex-col bg-slate-200 m-2 p-2 rounded-md">
            <h2 className="font-semibold">
              Uren betaald: {weekStats?.ub} (voltooid: {weekStats?.ubv})
            </h2>
          </div>

          <div className="flex flex-1 flex-col bg-slate-200 m-2 p-2 rounded-md">
            <h2 className="font-semibold">
              Verdiensten: {weekStats?.bedrag.toFixed(2)} (voltooid:{" "}
              {weekStats?.bedragv.toFixed(2)})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
          {formattedWeek &&
            Object.keys(formattedWeek).map((key: any) => {
              if (formattedWeek[key].string) {
                return (
                  <Link href="/Shifts/Nieuw">
                    <div className="flex flex-col m-2 items-center justify-center rounded-xl p-2 bg-sky-200 font-mono text-sky-500 hover:bg-sky-300">
                      {formattedWeek[key].string}
                    </div>
                  </Link>
                );
              }
              if (!formattedWeek[key].string) {
                const boxStyle = kalenderStyle(
                  formattedWeek[key].voltooid,
                  formattedWeek[key].bcd,
                  formattedWeek[key].ziek
                );
                return (
                  <Link
                    key={formattedWeek[key]?.id}
                    href={"/Shifts/" + formattedWeek[key]?.id}
                  >
                    <div
                      className={`flex flex-col m-2 items-center justify-center rounded-xl p-2 cursor-pointer ${boxStyle} `}
                    >
                      <h2 className="text-sky-700 font-bold flex flex-row">
                        {formattedWeek[key]?.dag &&
                          dagformatter(formattedWeek[key]?.dag)}
                      </h2>
                      {formattedWeek[key]?.voltooid && (
                        <p className="text-sky-800">
                          {daysBetween(formattedWeek[key]?.datum)} dagen geleden
                        </p>
                      )}
                      {!formattedWeek[key]?.voltooid && (
                        <p className="text-sky-800 ">
                          over{" "}
                          {formattedWeek[key]?.datum &&
                            daysBetween(formattedWeek[key]?.datum)}{" "}
                          dagen
                        </p>
                      )}
                      <h3>
                        {formattedWeek[key]?.datum &&
                          dateformatter(formattedWeek[key]?.datum)}
                      </h3>
                      <h3>AH{formattedWeek[key]?.winkel?.winkelNr}</h3>
                      <h3>{formattedWeek[key]?.tijdslot?.slot}</h3>
                      <div className="flex flex-row">
                        {formattedWeek[key]?.feestdag && (
                          <SparklesIcon className="ml-4 w-4 text-amber-400" />
                        )}

                        {formattedWeek[key]?.voltooid && (
                          <BadgeCheckIcon className="md:ml-4 w-4 text-violet-500" />
                        )}
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
        </div>
      </div>
    </MainLayout>
  );
}
