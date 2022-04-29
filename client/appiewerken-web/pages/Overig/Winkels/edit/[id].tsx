import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../../../components/layouts/Main";
import axios from "axios";
import OverigHeader from "../../../../components/OverigHeader";
export default function EditWinkel() {
  const [winkelnummer, setWinkelnummer] = useState<string>();
  const [bericht, setBericht] = useState("");
  const [adres, setAdres] = useState<string>();

  const router = useRouter();
  useEffect(() => {
    getWinkel();
  }, [router]);

  useEffect(() => {
    console.log(winkelnummer, adres);
  }, [adres, winkelnummer]);

  async function getWinkel() {
    console.log("GETTING _______________---");
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`https://ahwapi.d22nk.nl/winkel/${id}`);
        if (!res.data) {
          router.push("/Overig/Winkels");
        } else {
          setAdres(res.data?.winkel?.id);
          setWinkelnummer(res.data?.winkel?.winkelNr);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        editWinkel();
      }
    });
  });
  function editWinkel() {
    setBericht("");

    // axios
    //   .post("https://ahwapi.d22nk.nl/Winkels", {
    //     winkelnummer: winkelnummer,
    //     adres: adres,
    //   })
    //   .then(function (response) {
    //     if (response.status === 200) {
    //       setBericht("Winkel toegevoegd");

    //       setTimeout(() => {
    //         router.push("/Overig/Winkels");
    //       }, 1500);
    //     } else if (response.status === 500) {
    //       setBericht("Er ging iets mis");
    //     }
    //   })
    //   .catch(function (error) {
    //     setBericht("Er ging iets mis");
    //     console.log(error);
    //   });
  }
  return (
    <>
      <MainLayout parentPage="Overig">
        <OverigHeader page="Winkel Aanpassen" />

        <div className="w-[50%] ml-2 mt-4">
          {bericht !== "" && (
            <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
              <p>{bericht}</p>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editWinkel();
            }}
          >
            <label
              className="mb-4 font-semibold text-sky-500"
              htmlFor="winkelnummer"
            >
              Winkelnummer:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="winkelnummer"
              // placeholder="xxxx"
              key={winkelnummer}
              value={winkelnummer}
              onChange={(e) => {
                setWinkelnummer(e.target.value);
              }}
            />
            <label className="mb-4 font-semibold text-sky-500" htmlFor="adres">
              Adres:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="adres"
              // placeholder="Melkweg 1, De Maan"
              value={adres}
              onChange={(e) => setAdres(e.target.value)}
            />

            <div className="flex  flex-1 flex-row-reverse">
              <input
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-2 py-2 rounded-md w-[50%] active:scale-90"
                value="Aanpassen"
              />
            </div>
          </form>
        </div>
      </MainLayout>
    </>
  );
}
