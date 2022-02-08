import { useEffect, useState } from "react";

import axios from "axios";
import dateformatter from "../functions/dateformatter";

export default function Shifts() {
  const [shifts, setShifts] = useState<any>([]);

  async function getShifts() {
    try {
      const res = await axios.get("https://ahwapi.d22nk.nl/shifts");
      setShifts(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="grid grid-cols-7 gap-1 grid-f m-2">
        {shifts?.reverse().map((s: any) => {
          let color = "";
          if (s.dag === "MAANDAG") {
            color = "bg-purple-500";
          } else if (s.dag === "DINSDAG") {
            color = "bg-sky-500";
          } else if (s.dag === "WOENSDAG") {
            color = "bg-green-500";
          } else if (s.dag === "DONDERDAG") {
            color = "bg-yellow-500";
          } else if (s.dag === "VRIJDAG") {
            color = "bg-orange-500";
          } else if (s.dag === "ZATERDAG") {
            color = "bg-red-500";
          } else if (s.dag === "ZONDAG") {
            color = "bg-pink-500";
          }
          if (!s.voltooid) {
            color = color + " border-4 border-black";
          }
          return (
            <p
              className={
                "p-2 font-bold text-white rounded-md hover:opacity-25 " + color
              }
            >
              {s.dag} - {dateformatter(s.datum)} |{s.urenGewerkt} -{" "}
              {s.urenBetaald}
            </p>
          );
        })}
      </div>
    </div>
  );
}
