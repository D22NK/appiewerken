import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";
import ShiftHeader from "../../components/ShiftHeader";
import dateformatter from "../../functions/dateformatter";
import getYear from "../../functions/getYear";
import getWeekNumber from "../../functions/getWeekNumber";
import dagformatter from "../../functions/dagformatter";
export default function NieuweShift() {
  const [fields, setFields] = useState<any>([]);
  const [datum, setDatum] = useState<String>();
  const [jaarweek, setJaarweek] = useState<string>();
  const [dag, setDag] = useState<string>();
  const [tijdslot, setTijdslot] = useState<String>();
  const [winkel, setWinkel] = useState<String>(
    "7cf9ab85-fe4e-47a8-bafe-ff34d86ae0a7"
  );
  const [uurloon, setUurloon] = useState<String>(
    "935d7659-b59a-4988-98c6-c9d117f45233"
  );
  const [betaalperiode, setBetaalperiode] = useState<String>();
  const [urengewerkt, setUrengewerkt] = useState<number>(0);
  const [urenbetaald, setUrenbetaald] = useState<number>(0);
  const [voltooid, setVoltooid] = useState(true);
  const [feestdag, setFeestdag] = useState(false);
  const [ziek, setZiek] = useState(false);
  const [bcd, setBcd] = useState(false);

  const [bericht, setBericht] = useState<String>("");

  const router = useRouter();

  async function getFields() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shiftfields");
      console.log(res.data);
      setFields(res.data);
      setBetaalperiode(res.data.betaalperiodes[0].id);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function main() {
      await getFields();
      setJaarweek(getYear() + "-" + getWeekNumber());
    }
    main();
  }, []);

  function createShift() {
    setBericht("");

    axios
      .post("https://ahwapi.d22nk.nl/shifts", {
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
        ziek: ziek,
        bcd: bcd,
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

  function tijdslotChange(e: any) {
    const index = fields.tijdslots.findIndex(
      (t: any) => t.id == e.target.value
    );
    setUrengewerkt(fields.tijdslots[index].urenGewerkt);
    setUrenbetaald(fields.tijdslots[index].urenBetaald);

    setTijdslot(e.target.value);
  }

  function dagChange(e: any) {
    if (e.target.value === "ZONDAG") {
      const dubbeleuren = urengewerkt * 2;
      setUrenbetaald(dubbeleuren);
    } else {
      setUrenbetaald(urengewerkt);
    }
  }

  function datumChange(e: any) {
    setDatum(e.target.value);
    console.log("DDDDDDDDDD", e.target.value);
    const dag = new Date(e.target.value).getDay();

    setJaarweek(
      getYear(new Date(e.target.value)) +
        "-" +
        getWeekNumber(new Date(e.target.value))
    );

    switch (dag) {
      case 0:
        setDag("ZONDAG");
        break;
      case 1:
        setDag("MAANDAG");
        break;
      case 2:
        setDag("DINSDAG");
        break;
      case 3:
        setDag("WOENSDAG");
        break;
      case 4:
        setDag("DONDERDAG");
        break;
      case 5:
        setDag("VRIJDAG");
        break;
      case 6:
        setDag("ZATERDAG");
        break;
    }
  }

  function changeZiek() {
    // if (bcd) {
    //   setZiek(!ziek);
    // } else {
    setZiek(!ziek);

    //   setBcd(!bcd);
    // }
  }

  function changeBCD() {
    // if (ziek) {
    //   setZiek(false);
    //   setBcd(!bcd);
    // } else {
    setBcd(!bcd);
    // }
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
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border border-sky-700 rounded-lg focus:shadow-outline"
            type="date"
            name="datum"
            onChange={(e) => datumChange(e)}
          />

          <label className="mb-4 font-semibold text-sky-500" htmlFor="jaarweek">
            Jaar-week:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            name="jaarweek"
            onChange={(e) => setJaarweek(e.target.value)}
            value={jaarweek}
          />
          <label className="mb-4 font-semibold text-sky-500" htmlFor="tijdslot">
            Tijdslot:
          </label>
          <div className="relative inline-block w-full text-gray-700 mb-4">
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border border-sky-700 rounded-lg appearance-none focus:shadow-outline"
              name="tijdslot"
              onChange={(e) => tijdslotChange(e)}
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
          <label className="mb-4 font-semibold text-sky-500" htmlFor="dag">
            Dag:
          </label>
          <div className="relative inline-block w-full text-gray-700 mb-4">
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              name="dag"
              onChange={(e) => dagChange(e)}
            >
              {dag ? (
                <option selected value={dag}>
                  {dagformatter(dag)}
                </option>
              ) : (
                <option selected disabled>
                  Kies dag
                </option>
              )}
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

          <label className="mb-4 font-semibold text-sky-500" htmlFor="winkel">
            Winkel:
          </label>
          <div className="relative inline-block w-full text-gray-700 mb-4">
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
              name="winkel"
              onChange={(e) => setWinkel(e.target.value)}
            >
              <option disabled>Kies winkel</option>
              {fields.winkels?.map((winkel: any) => {
                if (winkel.winkelNr === "1213") {
                  return (
                    <option selected key={winkel.id} value={winkel.id}>
                      {winkel.winkelNr}
                    </option>
                  );
                }
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
              {fields.uurlonen?.map((uurloon: any, index: any) => {
                if (uurloon.loon == 6.41) {
                  return (
                    <option key={uurloon.id} value={uurloon.id} selected>
                      {uurloon.loon}
                    </option>
                  );
                }
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
              {fields.betaalperiodes?.map((periode: any, index: number) => {
                if (index === 0) {
                  return (
                    <option selected key={periode.id} value={periode.id}>
                      {dateformatter(periode.startDatum)} tot{" "}
                      {dateformatter(periode.eindDatum)} ({periode.slug})
                    </option>
                  );
                }
                return (
                  <option key={periode.id} value={periode.id}>
                    {dateformatter(periode.startDatum)} tot{" "}
                    {dateformatter(periode.eindDatum)} ({periode.slug})
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
            value={urengewerkt}
            onChange={(e) => setUrengewerkt(parseFloat(e.target.value))}
          />

          <label className="mb-4 font-semibold text-sky-500" htmlFor="betaald">
            Uren betaald:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="number"
            name="betaald"
            value={urenbetaald}
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

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={ziek}
                onChange={() => {
                  changeZiek();
                }}
              />
              <span className="ml-2">Ziek</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={bcd}
                onChange={() => {
                  changeBCD();
                }}
              />
              <span className="ml-2">BCD</span>
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
