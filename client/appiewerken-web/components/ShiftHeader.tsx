import Link from "next/link";

export default function ShiftHeader({ page }: any) {
  return (
    <>
      <div className="flex flex-row mb-2">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Shifts &middot; {page}
        </h1>
        <Link href="/Shifts/Nieuw">
          <button className="bg-sky-500 hover:border-sky-600 border-2 border-sky-500 hover:bg-transparent hover:text-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md">
            Nieuwe Shift
          </button>
        </Link>
      </div>
      <div className="flex flex-row bg-slate-100 rounded-md p-2 items-center">
        <Link href="/Shifts">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Alle Shifts" ? "text-white bg-sky-700" : "text-sky-700"
            }`}
          >
            Alle
          </div>
        </Link>
        <Link href="/Shifts/Onvoltooid">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Onvoltooide Shifts"
                ? "text-white bg-sky-700"
                : "text-sky-700"
            }`}
          >
            Onvoltooid
          </div>
        </Link>
        <Link href="/Shifts/Voltooid">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Voltooid Shifts"
                ? "text-white bg-sky-700"
                : "text-sky-700"
            }`}
          >
            Voltooid
          </div>
        </Link>
      </div>
    </>
  );
}
