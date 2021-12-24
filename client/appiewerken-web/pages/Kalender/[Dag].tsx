import MainLayout from "../../components/layouts/Main";
import { useRouter } from 'next/router'
export default function Dag(){

    const router = useRouter()
    const { Dag } = router.query

    return(
        <MainLayout parentPage="Kalender">
            Dag: {Dag}
        </MainLayout>
    )
}