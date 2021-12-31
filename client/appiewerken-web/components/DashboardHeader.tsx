import Link from "next/link";

export default function DashboardHeader({ page }: any) {
  return (
    <>
      <div className="flex flex-row mb-2">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Dashboard &middot; {page}
        </h1>
      </div>
      <div className=" flex flex-row bg-slate-100 rounded-md p-2 items-center">
        <Link href="/Dashboard">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Index" ? "text-white bg-sky-700" : "text-sky-700"
            }`}
          >
            Index
          </div>
        </Link>
        {/* <Link href="/Dashboard/Stats">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Statistieken" ? "text-white bg-sky-700" : "text-sky-700"
            }`}
          >
            Statistieken
          </div>
        </Link> */}
      </div>
    </>
  );
}
