import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";
import BetalingHeader from "../../components/BetalingHeader";
import dateformatter from "../../functions/dateformatter";
export default function NieuweWinkel() {
  const [ontvangstdatum, setOntvangstdatum] = useState<String>();
  const [bedrag, setBedrag] = useState<Number>();
  const [periode, setPeriode] = useState<String>();

  const [bericht, setBericht] = useState("");
  const router = useRouter();
  const [periodes, setPeriodes] = useState<any>([]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        createBetaling();
      }
    });
  });

  async function getPeriodes() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/periodes");
      setPeriodes(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPeriodes();
  }, []);
  function createBetaling() {
    setBericht("");

    console.log("periode", periode);
    axios
      .post("https://ahwapi.d22nk.nl/betalingen", {
        datum: ontvangstdatum,
        periode: periode,
        bedrag: bedrag,
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Betaling toegevoegd");

          setTimeout(() => {
            router.push("/Betalingen");
          }, 1000);
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
      <MainLayout parentPage="Betalingen">
        <BetalingHeader page="Nieuwe Betaling" />

        <div className="w-[50%] ml-2 mt-4">
          {bericht !== "" && (
            <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
              <p>{bericht}</p>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createBetaling();
            }}
          >
            <label className="mb-4 font-semibold text-sky-500" htmlFor="datum">
              Ontvangstdatum:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="date"
              name="datum"
              onChange={(e) => setOntvangstdatum(e.target.value)}
            />
            <label className="mb-4 font-semibold text-sky-500" htmlFor="bedrag">
              Bedrag:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="number"
              name="bedrag"
              onChange={(e) => setBedrag(parseFloat(e.target.value))}
              step=".01"
            />
            <label
              className="mb-4 font-semibold text-sky-500"
              htmlFor="periode"
            >
              Betaalperiode:
            </label>
            <div className="relative inline-block w-full text-gray-700 mb-4">
              <select
                required
                className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                name="periode"
                onChange={(e) => setPeriode(e.target.value)}
              >
                <option selected disabled value="">
                  Kies periode
                </option>
                {periodes.map((periode: any) => {
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

            <div className="flex  flex-1 flex-row-reverse">
              <input
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-2 py-2 rounded-md w-[50%] active:scale-90"
                value="Aanmaken"
              />
            </div>
          </form>
        </div>
      </MainLayout>
    </>
  );
}
