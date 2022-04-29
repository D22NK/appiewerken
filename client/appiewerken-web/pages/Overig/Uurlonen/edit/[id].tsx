import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../../../components/layouts/Main";
import axios from "axios";
import OverigHeader from "../../../../components/OverigHeader";
export default function EditWinkel() {
  const [loon, setLoon] = useState<number>();
  const [leeftijd, setLeeftijd] = useState<number>();
  const [bericht, setBericht] = useState("");

  const router = useRouter();
  useEffect(() => {
    getUurloon();
  }, [router]);

  async function getUurloon() {
    console.log("GETTING _______________---");
    try {
      const { id } = await router.query;
      console.log("id: ", router.query.id);
      if (id) {
        const res = await axios.get(`https://ahwapi.d22nk.nl/uurloon/${id}`);
        if (!res.data) {
          router.push("/Overig/Uurlonen");
        } else {
          setLoon(res.data?.loon);
          setLeeftijd(res.data?.leeftijd);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     if (e.code === "Enter") {
  //       editWinkel();
  //     }
  //   });
  // });
  async function editUurloon() {
    setBericht("");
    const { id } = await router.query;
    axios
      .put(`https://ahwapi.d22nk.nl/uurloon/${id}`, {
        loon,
        leeftijd,
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Uurloon Aangepast");

          setTimeout(() => {
            router.push(`/Overig/Uurlonen/${id}`);
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
        <OverigHeader page="Uurloon Aanpassen" />

        <div className="w-[50%] ml-2 mt-4">
          {bericht !== "" && (
            <div className="w-[100%] bg-slate-300 rounded-md p-2  mb-2 hover:bg-slate-400">
              <p>{bericht}</p>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editUurloon();
            }}
          >
            <label
              className="mb-4 font-semibold text-sky-500"
              htmlFor="Uurloon"
            >
              Uurloon:
            </label>

            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="Uurloon"
              value={loon}
              onChange={(e) => {
                setLoon(parseFloat(e.target.value));
              }}
            />
            <label
              className="mb-4 font-semibold text-sky-500"
              htmlFor="leeftijd"
            >
              Leeftijd:
            </label>
            <input
              required
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="leeftijd"
              value={leeftijd}
              onChange={(e) => setLeeftijd(parseFloat(e.target.value))}
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
