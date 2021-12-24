import MainLayout from "../../components/layouts/Main";
import DashboardHeader from "../../components/DashboardHeader";
export default function Stats() {
  return (
    <MainLayout parentPage="Dashboard">
      <DashboardHeader page="Statistieken" />
      <div className="flex flex-row h-48">
        <div className="flex bg-slate-100 my-4 rounded-md p-4 w-[40%] mr-2">
          Statiestiek 1
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
