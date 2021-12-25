import MainLayout from "../../components/layouts/Main";
import OverigHeader from "../../components/OverigHeader";

export default function Shiftfollower() {
  const shifts = [
    { Dag: "maandag", tijdslot: "17:00-19:00", voltooid: false },
    { Dag: "dinsdag", tijdslot: "17:00-19:00", voltooid: true },
  ];

  const list = shifts.map((shift) => {
    if (!shift.voltooid) {
      return (
        <div>
          <h1>{shift.Dag}</h1>
          <h2>{shift.tijdslot}</h2>
          <br />
        </div>
      );
    }
  });
  return (
    <MainLayout parentPage="Shiftfollower">
      <h1 className="flex-1 text-2xl font-bold text-sky-500">Shiftfollower</h1>
      {list}
    </MainLayout>
  );
}
