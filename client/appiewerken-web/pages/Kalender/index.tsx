import { useEffect } from "react";
import MainLayout from "../../components/layouts/Main";
import { useRouter } from "next/router";
import jaarWeekGen from "../../functions/jaarWeekGen";

export default function Kalender() {
  const router = useRouter();
  useEffect(() => {
    const jw = jaarWeekGen(0);
    router.push(`/Kalender/${jw.jaar}-${jw.week}`);
  });

  return <MainLayout parentPage="Kalender">Redirecting.....</MainLayout>;
}
