import { useEffect, useState } from "react";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";

import ShiftHeader from "../../components/ShiftHeader";
import ShiftCard from "../../components/Shifts/ShiftCard";
import Loader from "../../components/Loader";
export default function Shifts() {
  const [shifts, setShifts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [opendag, setOpendag] = useState<boolean>(false);
  const [openwinkel, setOpenWinkel] = useState<boolean>(false);
  const [opentijdslot, setOpentijdslot] = useState<boolean>(false);
  const [dag, setDag] = useState<any>("Alle");
  const [winkel, setWinkel] = useState<any>("Alle");
  const [tijdslot, setTijdslot] = useState<any>("Alle");
  const [displayTijdslot, setDisplayTijdslot] =
    useState<string>("Alle Tijdslots");
  const [fields, setFields] = useState<any>([]);

  async function getShifts() {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://ahwapi.d22nk.nl/filteredshifts/${dag}/${tijdslot}/${winkel}`
      );
      setShifts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function getFields() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shiftfields");
      console.log(res.data);
      setFields(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getShifts();
  }, [dag, tijdslot, winkel]);
  useEffect(() => {
    getFields();
  });
  return (
    <MainLayout parentPage="Shifts">
      <ShiftHeader page="Alle Shifts" />

      <div className="relative inline-block text-left m-2 z-1">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => {
              setOpendag(!opendag);
            }}
          >
            {dag == "Alle"
              ? "Alle Dagen"
              : dag.charAt(0) + dag.slice(1).toLowerCase()}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        {opendag && (
          <div
            className="z-10 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="p-1" role="none">
              <div
                className=" border-b-[1px] border-slate-200 p-2 cursor-pointer"
                onClick={() => {
                  setDag("Alle");
                  setOpendag(!opendag);
                }}
              >
                Alle Dagen
              </div>
              {[
                "MAANDAG",
                "DINSDAG",
                "WOENSDAG",
                "DONDERDAG",
                "VRIJDAG",
                "ZATERDAG",
                "ZONDAG",
              ].map((dag) => {
                return (
                  <div
                    className=" border-b-[1px] border-slate-200 p-2 cursor-pointer"
                    onClick={() => {
                      setDag(dag);
                      setOpendag(!opendag);
                    }}
                  >
                    {dag.charAt(0) + dag.slice(1).toLowerCase()}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="relative inline-block text-left m-2 z-1">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => {
              setOpentijdslot(!opentijdslot);
            }}
          >
            {displayTijdslot}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        {opentijdslot && (
          <div
            className="z-10 origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="p-1 overflow-scroll h-64" role="none">
              <div
                className=" border-b-[1px] border-slate-200 p-2 cursor-pointer"
                onClick={() => {
                  setTijdslot("Alle");
                  setDisplayTijdslot("Alle Tijdslots");
                  setOpentijdslot(!opentijdslot);
                }}
              >
                Alle Tijdslots
              </div>
              {fields?.tijdslots.map((t: any) => {
                return (
                  <div
                    className=" border-b-[1px] border-slate-200 p-2 cursor-pointer"
                    onClick={() => {
                      setTijdslot(t.id);
                      setDisplayTijdslot(t.begin + "-" + t.eind);
                      setOpentijdslot(!opentijdslot);
                    }}
                  >
                    {t.begin + "-" + t.eind}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="relative inline-block text-left m-2 z-1">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => {
              setOpenWinkel(!opentijdslot);
            }}
          >
            {winkel == "Alle" ? "Alle Winkels" : winkel}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        {openwinkel && (
          <div
            className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="p-1 " role="none">
              <div
                className=" border-b-[1px] border-slate-200 p-2 cursor-pointer"
                onClick={() => {
                  setWinkel("Alle");
                  setOpenWinkel(!openwinkel);
                }}
              >
                Alle Winkels
              </div>
              {fields?.winkels.map((w: any) => {
                return (
                  <div
                    className=" border-b-[1px] border-slate-200 p-2 cursor-pointer"
                    onClick={() => {
                      setWinkel(w.winkelNr);
                      setOpenWinkel(!openwinkel);
                    }}
                  >
                    {w.winkelNr}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {loading && <Loader />}
      {shifts.length == 0 ? (
        <p className="mx-4 font-semibold italic">Geen shifts gevonden</p>
      ) : (
        shifts.map((shift: any) => {
          return <ShiftCard shift={shift} />;
        })
      )}
    </MainLayout>
  );
}
