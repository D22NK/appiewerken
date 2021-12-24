import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import OverigHeader from "../../../components/OverigHeader";
export default function NieuweWinkel() {
  const [winkelnummer, setWinkelnummer] = useState<String>();
  const [bericht, setBericht] = useState("");
  const [adres, setAdres] = useState<String>();
  const router = useRouter();
  function createWinkel() {
    setBericht("");

    axios
      .post("http://192.168.68.100:1213/Winkels", {
        winkelnummer: winkelnummer,
        adres: adres,
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Winkel toegevoegd");

          setTimeout(() => {
            router.push("/Overig/Winkels");
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
      <MainLayout parentPage="Overig">
        <OverigHeader page="Nieuwe Winkel" />

        <div className="w-[50%] ml-2 mt-4">
          {bericht !== "" && (
            <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
              <p>{bericht}</p>
            </div>
          )}
          <label
            className="mb-4 font-semibold text-sky-500"
            htmlFor="winkelnummer"
          >
            Winkelnummer:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            name="winkelnummer"
            placeholder="xxxx"
            onChange={(e) => setWinkelnummer(e.target.value)}
          />
          <label className="mb-4 font-semibold text-sky-500" htmlFor="adres">
            Adres:
          </label>
          <input
            className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            name="adres"
            placeholder="Melkweg 1, De Maan"
            onChange={(e) => setAdres(e.target.value)}
          />

          <div className="flex  flex-1 flex-row-reverse">
            <button
              onClick={() => createWinkel()}
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
