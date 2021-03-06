import MainLayout from "../../components/layouts/Main";
import DashboardHeader from "../../components/DashboardHeader";
import BetalingStats from "../../components/stats/BetalingStats";
import DagenStats from "../../components/stats/DagenStats";
import ShiftStats from "../../components/stats/ShiftsStats";
import UrenGewerktStats from "../../components/stats/UrenGewerktStats";
import UrenBetaaldStats from "../../components/stats/urenBetaaldStats";
import OverigeStats from "../../components/stats/OverigeStats";
export default function Dashboard() {
  return (
    <MainLayout parentPage="Dashboard">
      <DashboardHeader page="Index" />
      <div className="w-[100%] grid grid-cols-1  grid-rows-3 lg:grid-cols-3 gap-4">
        <DagenStats />
        <BetalingStats />

        <ShiftStats />
        <UrenGewerktStats />
        <UrenBetaaldStats />
        <OverigeStats />
      </div>
    </MainLayout>
  );
}
