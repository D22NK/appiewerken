import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/Main";
import axios from "axios";
import ShiftHeader from "../../components/ShiftHeader";
import ShiftCard from "../../components/Shifts/ShiftCard";

export default function VoltooideShifts() {
  const [shifts, setShifts] = useState<any>([]);
  async function getShifts() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shifts/voltooid");
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
      <ShiftHeader page="Voltooide Shifts" />
      {shifts.map((shift: any) => {
        return <ShiftCard shift={shift} />;
      })}
    </MainLayout>
  );
}
