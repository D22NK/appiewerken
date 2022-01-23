import { useEffect, useState } from "react";

import MainLayout from "../../components/layouts/Main";
import axios from "axios";

import ShiftHeader from "../../components/ShiftHeader";
import ShiftCard from "../../components/Shifts/ShiftCard";

export default function Shifts() {
  const [shifts, setShifts] = useState<any>([]);
  //   let winkels: any = [];
  async function getShifts() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shifts");
      //   winkels = res.data;
      setShifts(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <MainLayout parentPage="Shifts">
      <ShiftHeader page="Alle Shifts" />
      {shifts.map((shift: any) => {
        return <ShiftCard shift={shift} />;
      })}
    </MainLayout>
  );
}
