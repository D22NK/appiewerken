import MainLayout from "../../components/layouts/Main"
import DashboardHeader from "../../components/DashboardHeader"

export default function Dashboard(){
    return(
        <MainLayout parentPage="Dashboard">
         <DashboardHeader page="Index"/>

        </MainLayout>
    )
}