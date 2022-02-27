import { useEffect, useState } from "react";
import axios from "axios";

export default function OverigeStats() {
  const [stats, setStats] = useState<any>();
  async function getUrenStats() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUrenStats();
  }, []);

  return (
    <div className="w-[100%]  group-focus-visible:flex bg-slate-100 mt-4 rounded-md p-4  mr-2 row-span-1">
      <h1 className="text-xl font-semibold text-sky-500">
        Overige statistieken:
      </h1>

      <div className="grid grid-cols-1 mt-4">
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          <span className="text-sky-500 font-semibold">{stats?.ziek}</span> keer
          ziek geweest
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          Gemiddelde verdiensten per gewerkt uur:
          <span className="text-sky-500 font-semibold">
            {" "}
            €{" "}
            {(
              stats?.totaalverdiensten._sum.bedrag /
              stats?.urengewerkt._sum.urenGewerkt
            ).toFixed(2)}
          </span>
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          Gemiddelde uitbetaling per periode:
          <span className="text-sky-500 font-semibold">
            {" "}
            €{" "}
            {(
              stats?.totaalverdiensten._sum.bedrag / stats?.totaalperiodes
            ).toFixed(2)}
          </span>
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          Gemiddeld{" "}
          <span className="text-sky-500 font-semibold">
            {(
              stats?.urengewerkt._sum.urenGewerkt / stats?.totaalshifts
            ).toFixed(2)}
          </span>{" "}
          uur gewerkt per shift
        </p>
        <p className="p-2 bg-slate-200 rounded-md mb-2 mx-2">
          Gemiddeld{" "}
          <span className="text-sky-500 font-semibold">
            {(
              stats?.urenbetaald._sum.urenBetaald / stats?.totaalshifts
            ).toFixed(2)}
          </span>{" "}
          uur betaald per shift
        </p>
      </div>
      {/* <p className="italic text-slate-400 text-xs">
        Hierin zijn alleen de uren van voltooide shifts meegenomen.
      </p> */}
    </div>
  );
}
