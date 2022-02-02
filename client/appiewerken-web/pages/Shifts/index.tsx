import { useEffect, useState } from "react";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";

import ShiftHeader from "../../components/ShiftHeader";
import ShiftCard from "../../components/Shifts/ShiftCard";
import Loader from "../../components/Loader";
export default function Shifts() {
  const [shifts, setShifts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //   let winkels: any = [];
  async function getShifts() {
    setLoading(true);
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shifts");
      //   winkels = res.data;
      setShifts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <MainLayout parentPage="Shifts">
      <ShiftHeader page="Alle Shifts" />
      {loading && <Loader />}
      {shifts.map((shift: any) => {
        return <ShiftCard shift={shift} />;
      })}
    </MainLayout>
  );
}
