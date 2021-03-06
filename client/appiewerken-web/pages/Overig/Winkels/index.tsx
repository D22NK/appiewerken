import { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../../components/layouts/Main";
import axios from "axios";
import {
  OfficeBuildingIcon,
  LocationMarkerIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";
import OverigHeader from "../../../components/OverigHeader";
import Loader from "../../../components/Loader";
export default function Winkels() {
  const [winkels, setWinkels] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getWinkels() {
    setLoading(true);
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/Winkels");

      setWinkels(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getWinkels();
  }, []);

  return (
    <MainLayout parentPage="Overig">
      <OverigHeader page="Winkels" />
      {loading && <Loader />}
      {winkels.map((winkel: any) => {
        return (
          <Link key={winkel.id} href={"/Overig/Winkels/" + winkel.id}>
            <div className="cursor-pointer flex flex-row md:ml-2 mt-4 bg-slate-100  sm:w-[100%] xl:w-[75%] rounded-md hover:bg-transparent border-slate-200 border-2 hover:border-sky-400">
              <div className="flex justify-center bg-sky-500 p-4 rounded-md bg-100 bg-opacity-25">
                <OfficeBuildingIcon className=" w-6 text-sky-700" />
              </div>
              <div className="flex flex-col md:flex-row w-full ml-4 md:mr-4 p-2 md:items-center md:ml-0">
                <h2 className="text-sky-700 font-bold md:ml-6">
                  {winkel.winkelNr}
                </h2>
                <p className="text-slate-400 flex-1 flex flex-row md:ml-2 md:items-center">
                  <BriefcaseIcon className="w-4 mr-2 md:mr-0" /> Shifts:{" "}
                  {winkel.shifts && winkel.shifts.length}
                </p>

                <p className="text-slate-400 flex flex-row items-center md:items-center">
                  <LocationMarkerIcon className="h-4 mr-2 md:mr-0 md:h-4" />
                  {winkel.adres}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </MainLayout>
  );
}
