import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import BetalingHeader from "../../../components/BetalingHeader";
export default function NieuweWinkel() {
  const [startdatum, setStartdatum] = useState<String>();
  const [einddatum, setEinddatum] = useState<String>();
  const [persoonlijkebonus, setPersoonlijkebonus] = useState(false);
  const [winstuitkering, setWinstuitkering] = useState(false);
  const [slug, setSlug] = useState<String>();

  const [bericht, setBericht] = useState("");
  const router = useRouter();

  function createPeriode(e:any) {
    e.preventDefault()
    setBericht("");

    axios
      .post("https://ahwapi.d22nk.nl/periodes", {
        start: startdatum,
        eind: einddatum,
        persoonlijkebonus: persoonlijkebonus,
        winstuitkering: winstuitkering,
        slug: slug,
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Periode toegevoegd");

          setTimeout(() => {
            router.push("/Betalingen/Periodes");
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
      <MainLayout parentPage="Betalingen">
        <BetalingHeader page="Nieuwe Periode" />

        <div className="w-[50%] ml-2 mt-4">
          {bericht !== "" && (
            <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
              <p>{bericht}</p>
            </div>
          )}
          <form
            onSubmit={(e) => {
              createPeriode(e);
            }}
          >
            <label className="mb-4 font-semibold text-sky-500" htmlFor="start">
              Startdatum:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="date"
              name="start"
              onChange={(e) => setStartdatum(e.target.value)}
            />

            <label className="mb-4 font-semibold text-sky-500" htmlFor="eind">
              Einddatum:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="date"
              name="eind"
              onChange={(e) => setEinddatum(e.target.value)}
            />

            <label className="mb-4 font-semibold text-sky-500" htmlFor="slug">
              Kenmerk:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="slug"
              onChange={(e) => setSlug(e.target.value)}
            />

            <div className="flex flex-col">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={persoonlijkebonus}
                  onChange={() => {
                    setPersoonlijkebonus(!persoonlijkebonus);
                  }}
                />
                <span className="ml-2">Persoonlijkebonus</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={winstuitkering}
                  onChange={() => {
                    console.log(!winstuitkering);
                    setWinstuitkering(!winstuitkering);
                  }}
                />
                <span className="ml-2">Winstuitkering</span>
              </label>
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
