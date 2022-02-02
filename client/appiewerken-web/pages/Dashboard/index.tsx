import MainLayout from "../../components/layouts/Main";
import DashboardHeader from "../../components/DashboardHeader";
import BetalingStats from "../../components/stats/BetalingStats";
import DagenStats from "../../components/stats/DagenStats";
import ShiftStats from "../../components/stats/ShiftsStats";
export default function Dashboard() {
  return (
    <MainLayout parentPage="Dashboard">
      <DashboardHeader page="Index" />
      <p className="text-slate-400 p-2">Statestieken zonder BCD & Ziek dagen</p>
      <div className="w-[100%] grid grid-cols-1  grid-rows-3 lg:grid-cols-3 gap-4">
        <DagenStats />
        <BetalingStats />

        <ShiftStats />
      </div>
    </MainLayout>
  );
}
