import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../../components/layouts/Main";
import DashboardHeader from "../../components/DashboardHeader";
export default function Stats() {
  const [totaal, setTotaal] = useState<any>();
  //   let winkels: any = [];
  async function getWinkels() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/totaal");
      console.log(res.data._sum);
      setTotaal(res.data._sum.bedrag);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWinkels();
  }, []);
  return (
    <MainLayout parentPage="Dashboard">
      <DashboardHeader page="Statistieken" />
      <div className="flex flex-row h-48">
        <div className="flex bg-slate-100 my-4 rounded-md p-4 w-[40%] mr-2">
          Totaal: € {totaal}
        </div>

        <div className="flex bg-slate-100 my-4 rounded-md p-4 w-[30%] mr-2">
          Statiestiek 2
        </div>

        <div className="flex bg-slate-100 my-4 rounded-md p-4 w-[30%] mr-2">
          Grafiek 1
        </div>
      </div>
    </MainLayout>
  );
}
