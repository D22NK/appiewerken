import { useEffect, useState } from "react";

import axios from "axios";
import dateformatter from "../functions/dateformatter";

export default function BigCalendar() {
  const [shifts, setShifts] = useState<any>([]);

  async function getShifts() {
    try {
      const res = await axios.get(
        "https://ahwapi.d22nk.nl/filteredshifts/Alle/Alle/Alle/Alle"
      );
      setShifts(res.data);
      if (shifts.length == 0) {
        return "no array";
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <table className="print:text-xs">
      <thead>
        <tr>
          <th>#</th>
          <th>Dag</th>
          <th>Datum</th>
          <th>Tijdslot</th>
          <th>Uren Gewerkt</th>
          <th>Uren Betaald</th>
          <th>Status</th>
          <th>Winkel</th>
          <th>Ziek - BCD</th>
        </tr>
      </thead>
      <tbody>
        {shifts &&
          shifts?.map((s: any) => {
            return (
              <tr className="print:odd:bg-slate-200">
                <td>{shifts.indexOf(s)}</td>
                <td className="p-2">{s.dag}</td>
                <td className="p-2">{dateformatter(s.datum)}</td>
                <td className="p-2">{s.tijdslot.slot}</td>
                <td className="p-2">{s.urenGewerkt}</td>
                <td className="p-2">{s.urenBetaald}</td>
                <td className="p-2">
                  {s.voltooid ? "Voltooid" : "Onvoltooid"}
                </td>
                <td className="p-2">{s.winkel.winkelNr}</td>
                <td className="p-2">
                  {s.ziek && "Ziek"} {s.bcd && "BCD"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
