import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import OverigHeader from "../../../components/OverigHeader";
export default function NieuwUurloon() {
  const [leeftijd, setLeeftijd] = useState<Number>();
  const [uurloon, setUurloon] = useState<Number>();
  const [bericht, setBericht] = useState("");
  const router = useRouter();
  function createUurloon() {
    setBericht("");
    console.log(uurloon, leeftijd);
    axios
      .post("https://ahwapi.d22nk.nl/uurlonen", {
        leeftijd: leeftijd,
        uurloon: uurloon,
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Uurloon toegevoegd");

          setTimeout(() => {
            router.push("/Overig/Uurlonen");
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
        <OverigHeader page="Nieuw Uurloon" />

        <div className="w-[50%] ml-2 mt-4">
          {bericht !== "" && (
            <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
              <p>{bericht}</p>
            </div>
          )}
          <label className="mb-4 font-semibold text-sky-500" htmlFor="uurloon">
            Uurloon:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="number"
            name="uurloon"
            onChange={(e) => setUurloon(parseFloat(e.target.value))}
          />

          <label className="mb-4 font-semibold text-sky-500" htmlFor="leeftijd">
            Leeftijd:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="number"
            name="leeftijd"
            onChange={(e) => setLeeftijd(parseInt(e.target.value))}
          />

          <div className="flex  flex-1 flex-row-reverse">
            <button
              onClick={() => createUurloon()}
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
