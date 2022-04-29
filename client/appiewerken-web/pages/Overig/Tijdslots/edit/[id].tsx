import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../../../components/layouts/Main";
import axios from "axios";
import OverigHeader from "../../../../components/OverigHeader";
export default function EditWinkel() {
  const [begin, setBegin] = useState<string>();
  const [eind, setEind] = useState<string>();
  const [ug, setUg] = useState<number>();
  const [ub, setUb] = useState<number>();

  const [bericht, setBericht] = useState("");

  const router = useRouter();
  useEffect(() => {
    getTijdslot();
  }, [router]);

  async function getTijdslot() {
    console.log("GETTING _______________---");
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`https://ahwapi.d22nk.nl/tijdslot/${id}`);
        if (!res.data) {
          router.push("/Overig/Tijdslots");
        } else {
          setBegin(res.data?.begin);
          setEind(res.data?.eind);
          setUg(res.data?.urenGewerkt);
          setUb(res.data?.urenBetaald);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        editTijdslot();
      }
    });
  });
  async function editTijdslot() {
    setBericht("");
    const { id } = await router.query;
    axios
      .put(`https://ahwapi.d22nk.nl/tijdslot/${id}`, {
        begin,
        eind,
        urenGewerkt: ug,
        urenBetaald: ub,
        slot: begin + "-" + eind,
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Tijdslot Aangepast");

          setTimeout(() => {
            router.push(`/Overig/Tijdslots/${id}`);
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
              editTijdslot();
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
              value={begin}
              onChange={(e) => {
                setBegin(e.target.value);
              }}
            />

            <label className="mb-4 font-semibold text-sky-500" htmlFor="eind">
              Eind:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="eind"
              value={eind}
              onChange={(e) => {
                setEind(e.target.value);
              }}
            />

            <label
              className="mb-4 font-semibold text-sky-500"
              htmlFor="urenGewerkt"
            >
              Uren gewerkt:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="number"
              name="urenGewerkt"
              value={ug}
              onChange={(e) => {
                setUg(parseFloat(e.target.value));
              }}
            />

            <label
              className="mb-4 font-semibold text-sky-500"
              htmlFor="urenBetaald"
            >
              Uren betaald:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="number"
              name="urenBetaald"
              value={ub}
              onChange={(e) => {
                setUb(parseFloat(e.target.value));
              }}
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
