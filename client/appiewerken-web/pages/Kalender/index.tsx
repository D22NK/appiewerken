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
  const [bericht, setBericht] = useState<String>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getWeekShifts(jaarweek.jaar + "-" + jaarweek.week);
  }, [router]);

  async function getWeekShifts(params: any) {
    try {
      setLoading(true);
      const res = await axios.get(`https://ahwapi.d22nk.nl/kalender/${params}`);
      if (res.data.length < 1) {
        setBericht("Er zijn voor deze week geen shifts gevonden");
        setWeekshifts([]);
      } else {
        setWeekshifts(res.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setBericht("Er ging iets mis met het ophalen van deze week...");
      console.error(error);
    }
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
        <div>
          {weekshifts.map((shift: any) => {
            return (
              <div key={shift.id}>
                <div className="flex flex-col md:flex-row">
                  <h2 className="text-sky-700 font-bold md:ml-6 flex flex-row flex-1">
                    {dagformatter(shift.dag)} &middot;{" "}
                    {dateformatter(shift.datum)}
                    {shift.feestdag && (
                      <SparklesIcon className="ml-4 w-4 text-amber-400" />
                    )}
                  </h2>
                  <div className="flex flex-row">
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
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
