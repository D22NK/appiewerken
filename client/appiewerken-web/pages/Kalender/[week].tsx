import { useState, useEffect } from "react";
import MainLayout from "../../components/layouts/Main";
import jaarWeekGen from "../../functions/jaarWeekGen";
import axios from "axios";
import { useRouter } from "next/router";
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

  const [jaarweek, setJaarweek] = useState<any>("");
  const [weekshifts, setWeekshifts] = useState<any>([]);
  const [formattedWeek, setFormattedWeek] = useState<any>();
  const [weekStats, setWeekStats] = useState<any>();

  const [bericht, setBericht] = useState<String>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { week } = await router.query;
      setJaarweek(week);
      getWeekShifts(week);
    }

    load();
  }, [router]);

  useEffect(() => {
    formatWeek();
    calculateStats();
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
        setBericht("");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setBericht("Er ging iets mis met het ophalen van deze week...");
      console.error(error);
    }
  }

  function formatWeek() {
    const maandag = {
      weekshift:
        weekshifts[weekshifts?.findIndex((d: any) => d.dag == "MAANDAG")],
      dag: 0,
      string: "-Maandag-",
    };
    const dinsdag = {
      weekshift:
        weekshifts[weekshifts?.findIndex((d: any) => d.dag == "DINSDAG")],
      dag: 1,
      string: "-Dinsdag-",
    };

    const woensdag = {
      weekshift:
        weekshifts[weekshifts?.findIndex((d: any) => d.dag == "WOENSDAG")],
      dag: 2,
      string: "-Woensdag-",
    };

    const donderdag = {
      weekshift:
        weekshifts[weekshifts?.findIndex((d: any) => d.dag == "DONDERDAG")],
      dag: 3,
      string: "-Donderdag-",
    };

    const vrijdag = {
      weekshift:
        weekshifts[weekshifts?.findIndex((d: any) => d.dag == "VRIJDAG")],
      dag: 4,
      string: "-Vrijdag-",
    };

    const zaterdag = {
      weekshift:
        weekshifts[weekshifts?.findIndex((d: any) => d.dag == "ZATERDAG")],
      dag: 5,
      string: "-Zaterdag-",
    };

    const zondag = {
      weekshift:
        weekshifts[weekshifts?.findIndex((d: any) => d.dag == "ZONDAG")],
      dag: 6,
      string: "-Zondag-",
    };

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

  function nextWeek() {
    if (loading) {
      return;
    }

    let newJaarWeek;

    if (jaarweek.split("-")[1] == "53") {
      const jaar = (parseInt(jaarweek.split("-")[0]) + 1).toString();
      const week = "1";
      newJaarWeek = jaar + "-" + week;
    } else {
      const jaar = jaarweek.split("-")[0];
      const week = (parseInt(jaarweek.split("-")[1]) + 1).toString();
      newJaarWeek = jaar + "-" + week;
    }

    setJaarweek(newJaarWeek);
    router.push(
      {
        pathname: `/Kalender/${newJaarWeek}`,
      },
      undefined,
      { shallow: true }
    );
    getWeekShifts(newJaarWeek);
  }

  function previousWeek() {
    if (loading) {
      return;
    }
    let newJaarWeek;

    if (jaarweek.split("-")[1] == "1") {
      const jaar = (parseInt(jaarweek.split("-")[0]) - 1).toString();
      const week = "53";
      newJaarWeek = jaar + "-" + week;
    } else {
      const jaar = jaarweek.split("-")[0];
      const week = (parseInt(jaarweek.split("-")[1]) - 1).toString();
      newJaarWeek = jaar + "-" + week;
    }

    setJaarweek(newJaarWeek);
    router.push(
      {
        pathname: `/Kalender/${newJaarWeek}`,
      },
      undefined,
      { shallow: true }
    );
    getWeekShifts(newJaarWeek);
  }

  function resetWeek() {
    if (loading) {
      return;
    }

    const newJaarWeek = jaarWeekGen(0);
    setJaarweek(newJaarWeek.jaar + "-" + newJaarWeek.week);
    getWeekShifts(newJaarWeek.jaar + "-" + newJaarWeek.week);
  }
  return (
    <MainLayout parentPage="Kalender">
      <div className="flex flex-col">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Kalender &middot; {jaarweek}
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
        <div className="flex flex-row">
          <button
            className="flex flex-row flex-1 items-center bg-sky-500 hover:border-sky-600 border-2 border-sky-500 hover:bg-transparent hover:text-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md"
            onClick={() => previousWeek()}
          >
            <ArrowCircleLeftIcon className="w-4 mr-2" /> Vorige week
          </button>

          <button
            className="ml-4 bg-slate-200 flex-1 font-bold text-xs py-1 px-2 rounded-md hover:bg-transparent border-slate-200 border-2"
            onClick={() => resetWeek()}
          >
            Reset week
          </button>

          <button
            className=" flex flex-row flex-1 items-center justify-end ml-4 bg-sky-500 hover:border-sky-600 border-2 border-sky-500 hover:bg-transparent hover:text-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md"
            onClick={() => nextWeek()}
          >
            Volgende week <ArrowCircleRightIcon className="w-4 ml-2" />
          </button>
        </div>
        {bericht !== "" && (
          <div className="w-[100%] bg-slate-300 rounded-md p-2  my-2 hover:bg-slate-400">
            <p>{bericht}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
          {formattedWeek &&
            Object.keys(formattedWeek).map((key: any) => {
              let currentdayborder;
              if (new Date().getDate() == formattedWeek[key].dag) {
                currentdayborder = " border border-[4px] border-purple-500 ";
              }
              if (!formattedWeek[key].weekshift) {
                return (
                  <Link href="/Shifts/Nieuw">
                    <div
                      className={`${currentdayborder} flex flex-col m-2 items-center justify-center rounded-xl p-2 bg-sky-200 font-mono text-sky-500 hover:bg-sky-300`}
                    >
                      {formattedWeek[key].string}
                    </div>
                  </Link>
                );
              }
              if (formattedWeek[key].weekshift) {
                const boxStyle = kalenderStyle(
                  formattedWeek[key].weekshift?.voltooid,
                  formattedWeek[key].weekshift?.bcd,
                  formattedWeek[key].weekshift?.ziek
                );
                return (
                  <Link
                    key={formattedWeek[key]?.weekshift?.id}
                    href={"/Shifts/" + formattedWeek[key]?.weekshift?.id}
                  >
                    <div
                      className={`${currentdayborder} flex flex-col m-2 items-center justify-center rounded-xl p-2 cursor-pointer ${boxStyle} `}
                    >
                      <h2 className="text-sky-700 font-bold flex flex-row">
                        {formattedWeek[key]?.weekshift?.dag &&
                          dagformatter(formattedWeek[key]?.weekshift?.dag)}
                      </h2>
                      {formattedWeek[key]?.weekshift?.voltooid && (
                        <p className="text-sky-800">
                          {daysBetween(formattedWeek[key]?.weekshift?.datum)}{" "}
                          dagen geleden
                        </p>
                      )}
                      {!formattedWeek[key]?.weekshift?.voltooid && (
                        <p className="text-sky-800 ">
                          over{" "}
                          {formattedWeek[key]?.weekshift?.datum &&
                            daysBetween(
                              formattedWeek[key]?.weekshift?.datum
                            )}{" "}
                          dagen
                        </p>
                      )}
                      <h3>
                        {formattedWeek[key]?.weekshift?.datum &&
                          dateformatter(formattedWeek[key]?.weekshift?.datum)}
                      </h3>
                      <h3>
                        AH{formattedWeek[key]?.weekshift?.winkel?.winkelNr}
                      </h3>
                      <h3>{formattedWeek[key]?.weekshift?.tijdslot?.slot}</h3>
                      <div className="flex flex-row">
                        {formattedWeek[key]?.weekshift?.feestdag && (
                          <SparklesIcon className="ml-4 w-4 text-amber-400" />
                        )}

                        {formattedWeek[key]?.weekshift?.voltooid && (
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
