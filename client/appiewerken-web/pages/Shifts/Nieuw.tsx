import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";
import Shift from "../../components/OverigHeader";
import ShiftHeader from "../../components/ShiftHeader";
export default function NieuweShift() {
  const [fields, setFields] = useState<any>([]);
  const [datum, setDatum] = useState<String>();
  const [jaarweek, setJaarweek] = useState<String>();
  const [dag, setDag] = useState<String>();
  const [tijdslot, setTijdslot] = useState<String>();
  const [winkel, setWinkel] = useState<String>();
  const [uurloon, setUurloon] = useState<String>();
  const [betaalperiode, setBetaalperiode] = useState<String>();
  const [urengewerkt, setUrengewerkt] = useState<Number>();
  const [urenbetaald, setUrenbetaald] = useState<Number>();
  const [voltooid, setVoltooid] = useState(true);
  const [feestdag, setFeestdag] = useState(false);
  const [bericht, setBericht] = useState<String>("");

  const router = useRouter();

  async function getFields() {
    try {
      const res = await axios.get("http://192.168.68.100:1213/shiftfields");
      console.log(res.data);
      setFields(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFields();
  }, []);

  function createShift() {
    setBericht("");
    console.log({
      datum: datum,
      jaarWeek: jaarweek,
      dag: dag,
      tijdslotId: tijdslot,
      urenGewerkt: urengewerkt,
      urenBetaald: urenbetaald,
      voltooid: voltooid,
      winkelId: winkel,
      uurloonId: uurloon,
      feestdag: feestdag,
      betaalperiodeId: betaalperiode,
    });
    axios
      .post("http://192.168.68.100:1213/shifts", {
        datum: datum,
        jaarWeek: jaarweek,
        dag: dag,
        tijdslotId: tijdslot,
        urenGewerkt: urengewerkt,
        urenBetaald: urenbetaald,
        voltooid: voltooid,
        winkelId: winkel,
        uurloonId: uurloon,
        feestdag: feestdag,
        betaalperiodeId: betaalperiode,
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Shift toegevoegd");

          setTimeout(() => {
            router.push("/Shifts");
          }, 1500);
        } else if (response.status === 500) {
          setBericht("Er ging iets mis");
        }
      })
      .catch(function (error) {
        setBericht("Er ging iets mis");
        console.log(error);
      });
  }
  return (
    <>
      <MainLayout parentPage="Shifts">
        <ShiftHeader page="Nieuwe Shifts" />

        <div className="w-[50%] ml-2 mt-4">
          {bericht !== "" && (
            <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
              <p>{bericht}</p>
            </div>
          )}

          <label className="mb-4 font-semibold text-sky-500" htmlFor="datum">
            Datum:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="date"
            name="datum"
            onChange={(e) => setDatum(e.target.value)}
          />

          <label className="mb-4 font-semibold text-sky-500" htmlFor="jaarweek">
            Jaar-week:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            name="jaarweek"
            onChange={(e) => setJaarweek(e.target.value)}
          />

          <label className="mb-4 font-semibold text-sky-500" htmlFor="dag">
            Dag:
          </label>
          <div className="relative inline-block w-full text-gray-700 mb-4">
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              name="dag"
              onChange={(e) => setDag(e.target.value)}
            >
              <option selected disabled>
                Kies dag
              </option>

              <option value="MAANDAG">Maandag</option>
              <option value="DINSDAG">Dinsdag</option>
              <option value="WOENSDAG">Woensdag</option>
              <option value="DONDERDAG">Donderdag</option>
              <option value="VRIJDAG">Vrijdag</option>
              <option value="ZATERDAG">Zaterdag</option>
              <option value="ZONDAG">Zondag</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          <label className="mb-4 font-semibold text-sky-500" htmlFor="tijdslot">
            Tijdslot:
          </label>
          <div className="relative inline-block w-full text-gray-700 mb-4">
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              name="tijdslot"
              onChange={(e) => setTijdslot(e.target.value)}
            >
              <option selected disabled>
                Kies tijdslot
              </option>
              {fields.tijdslots?.map((tijdslot: any) => {
                return (
                  <option key={tijdslot.id} value={tijdslot.id}>
                    {tijdslot.slot}
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          <label className="mb-4 font-semibold text-sky-500" htmlFor="winkel">
            Winkel:
          </label>
          <div className="relative inline-block w-full text-gray-700 mb-4">
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              name="winkel"
              onChange={(e) => setWinkel(e.target.value)}
            >
              <option selected disabled>
                Kies winkel
              </option>
              {fields.winkels?.map((winkel: any) => {
                return (
                  <option key={winkel.id} value={winkel.id}>
                    {winkel.winkelNr}
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          <label className="mb-4 font-semibold text-sky-500" htmlFor="uurloon">
            Uurloon:
          </label>
          <div className="relative inline-block w-full text-gray-700 mb-4">
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              name="uurloon"
              onChange={(e) => setUurloon(e.target.value)}
            >
              <option selected disabled>
                Kies uurloon
              </option>
              {fields.uurlonen?.map((uurloon: any) => {
                return (
                  <option key={uurloon.id} value={uurloon.id}>
                    {uurloon.loon}
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          <label className="mb-4 font-semibold text-sky-500" htmlFor="periode">
            Betaalperiode:
          </label>
          <div className="relative inline-block w-full text-gray-700 mb-4">
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              name="periode"
              onChange={(e) => setBetaalperiode(e.target.value)}
            >
              <option selected disabled>
                Kies betaalperiode
              </option>
              {fields.betaalperiodes?.map((periode: any) => {
                return (
                  <option key={periode.id} value={periode.id}>
                    {periode.startDatum.replace("T00:00:00.000Z", "")} tot{" "}
                    {periode.eindDatum.replace("T00:00:00.000Z", "")} (
                    {periode.slug})
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          <label className="mb-4 font-semibold text-sky-500" htmlFor="gewerkt">
            Uren gewerkt:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="number"
            name="gewerkt"
            onChange={(e) => setUrengewerkt(parseFloat(e.target.value))}
          />

          <label className="mb-4 font-semibold text-sky-500" htmlFor="betaald">
            Uren betaald:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="number"
            name="betaald"
            onChange={(e) => setUrenbetaald(parseFloat(e.target.value))}
          />

          <div className="flex flex-col">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={voltooid}
                onChange={() => {
                  setVoltooid(!voltooid);
                }}
              />
              <span className="ml-2">Voltooid</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={feestdag}
                onChange={() => {
                  console.log(!feestdag);
                  setFeestdag(!feestdag);
                }}
              />
              <span className="ml-2">Feestdag</span>
            </label>
          </div>

          <div className="flex  flex-1 flex-row-reverse">
            <button
              onClick={() => createShift()}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-2 py-2  rounded-md w-[50%]"
            >
              Aanmaken
            </button>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
