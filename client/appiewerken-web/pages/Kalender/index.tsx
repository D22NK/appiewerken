import { useState, useEffect } from "react";
import MainLayout from "../../components/layouts/Main";
import jaarWeekGen from "../../functions/jaarWeekGen";
import axios from "axios";
import { useRouter } from "next/router";
import dateformatter from "../../functions/dateformatter";
import dagformatter from "../../functions/dagformatter";
import daysBetween from "../../functions/daysBetween";

import { BadgeCheckIcon, SparklesIcon } from "@heroicons/react/outline";
export default function Kalender() {
  const router = useRouter();

  const [offset, setOffset] = useState(0);
  const [jaarweek, setJaarweek] = useState(jaarWeekGen(offset));
  const [weekshifts, setWeekshifts] = useState<any>([]);
  const [formattedWeek, setFormattedWeek] = useState<any>();

  const [bericht, setBericht] = useState<String>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getWeekShifts(jaarweek.jaar + "-" + jaarweek.week);
  }, [router]);

  useEffect(() => {
    formatWeek();
  }, [weekshifts]);

  async function getWeekShifts(params: any) {
    try {
      setLoading(true);
      setBericht("");
      const res = await axios.get(`https://ahwapi.d22nk.nl/kalender/${params}`);
      if (res.data.length < 1) {
        setBericht("Er zijn voor deze week geen shifts gevonden");
        setWeekshifts([]);
      } else {
        setWeekshifts(res.data);
        // formatWeek();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setBericht("Er ging iets mis met het ophalen van deze week...");
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

  function nextWeek() {
    if (loading) {
      return;
    }
    const newOffset = offset + 1;
    setOffset(newOffset);
    const newJaarWeek = jaarWeekGen(newOffset);
    setJaarweek(newJaarWeek);
    getWeekShifts(newJaarWeek.jaar + "-" + newJaarWeek.week);
  }

  function previousWeek() {
    if (loading) {
      return;
    }
    const newOffset = offset - 1;
    setOffset(newOffset);
    const newJaarWeek = jaarWeekGen(newOffset);
    setJaarweek(newJaarWeek);
    getWeekShifts(newJaarWeek.jaar + "-" + newJaarWeek.week);
  }

  function resetWeek() {
    if (loading) {
      return;
    }
    const newOffset = 0;
    setOffset(newOffset);
    const newJaarWeek = jaarWeekGen(newOffset);
    setJaarweek(newJaarWeek);
    getWeekShifts(newJaarWeek.jaar + "-" + newJaarWeek.week);
  }

  return (
    <MainLayout parentPage="Kalender">
      <div className="flex flex-col">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Kalender &middot; {jaarweek.jaar + "-" + jaarweek.week}
        </h1>
        {loading && <p>Laden.......</p>}
        {bericht !== "" && (
          <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
            <p>{bericht}</p>
          </div>
        )}
        <div>
          <button
            className="bg-sky-500 hover:border-sky-600 border-2 border-sky-500 hover:bg-transparent hover:text-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md"
            onClick={() => previousWeek()}
          >
            Vorige week
          </button>

          <button
            className="ml-4 bg-sky-500 hover:border-sky-600 border-2 border-sky-500 hover:bg-transparent hover:text-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md"
            onClick={() => nextWeek()}
          >
            Volgende week
          </button>

          {jaarWeekGen(0).jaar + "-" + jaarWeekGen(0).week !==
            jaarweek.jaar + "-" + jaarweek.week && (
            <button className="ml-4 font-semibold" onClick={() => resetWeek()}>
              Reset week
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
          {formattedWeek &&
            Object.keys(formattedWeek).map((key: any) => {
              return (
                <>
                  {!formattedWeek[key].string ? (
                    <div
                      className={
                        "flex flex-col m-2 items-center justify-center rounded-xl p-2 " +
                        (formattedWeek[key]?.voltooid
                          ? " bg-green-400 text-green-900"
                          : " bg-yellow-300 text-yellow-600")
                      }
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
                  ) : (
                    <div className="flex flex-col m-2 items-center justify-center rounded-xl p-2 bg-sky-200 font-mono text-sky-500">
                      {formattedWeek[key].string}
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </MainLayout>
  );
}
