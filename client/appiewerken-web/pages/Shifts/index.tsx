import MainLayout from "../../components/layouts/Main";
import ShiftHeader from "../../components/ShiftHeader";
export default function Shifts() {
  const shifts = [
    { Dag: "maandag", tijdslot: "17:00-19:00", voltooid: false },
    { Dag: "dinsdag", tijdslot: "17:00-19:00", voltooid: true },
  ];

  const list = shifts.map((shift) => {
    return (
      <div>
        <h1>{shift.Dag}</h1>
        <h2>{shift.tijdslot}</h2>
        <h3>{shift.voltooid && "Voltooid"}</h3>
        <br />
      </div>
    );
  });
  return (
    <MainLayout parentPage="Shifts">
      <ShiftHeader page="Alle" />
      {list}
    </MainLayout>
  );
}
