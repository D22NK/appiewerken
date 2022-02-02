import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import OverigHeader from "../../../components/OverigHeader";
export default function NieuwTijdslot() {
  const [begin, setBegin] = useState<String>("");
  const [eind, setEind] = useState<String>("");
  const [urenGewerkt, setUrengewerkt] = useState<Number>();
  const [urenBetaald, setUrenbetaald] = useState<Number>();

  const [bericht, setBericht] = useState<String>("");

  const router = useRouter();

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        createTijdslot();
      }
    });
  });
  function createTijdslot() {
    setBericht("");
    axios
      .post("https://ahwapi.d22nk.nl/tijdslots", {
        begin: begin,
        eind: eind,
        urenGewerkt: urenGewerkt,
        urenBetaald: urenBetaald,
        slot: begin + "-" + eind,
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Tijdslot toegevoegd");

          setTimeout(() => {
            router.push("/Overig/Tijdslots");
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
      <MainLayout parentPage="Overig">
        <OverigHeader page="Nieuw Tijdslot" />

        <div className="w-[50%] ml-2 mt-4">
          {bericht !== "" && (
            <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
              <p>{bericht}</p>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createTijdslot();
            }}
          >
            <label className="mb-4 font-semibold text-sky-500" htmlFor="begin">
              Begin:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="begin"
              onChange={(e) => setBegin(e.target.value)}
            />
            <label className="mb-4 font-semibold text-sky-500" htmlFor="eind">
              Eind:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="eind"
              onChange={(e) => setEind(e.target.value)}
            />
            <label className="mb-4 font-semibold text-sky-500" htmlFor="uren">
              Urengewerkt:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="number"
              name="urengewerkt"
              onChange={(e) => setUrengewerkt(parseFloat(e.target.value))}
            />

            <label className="mb-4 font-semibold text-sky-500" htmlFor="uren">
              Urenbetaald:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="number"
              name="urenbetaald"
              onChange={(e) => setUrenbetaald(parseFloat(e.target.value))}
            />

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
