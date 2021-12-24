import Link from "next/link";

export default function ShiftHeader({ page }: any) {
  return (
    <>
      <div className="flex flex-row mb-2">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Shifts &middot; {page}
        </h1>
        <Link href="/Shifts/Nieuw">
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md">
            Nieuwe Shift
          </button>
        </Link>
      </div>
      <div className="flex flex-row bg-slate-100 rounded-md p-2 items-center">
        <Link href="/Shifts">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Alle" ? "text-white bg-sky-700" : "text-sky-700"
            }`}
          >
            Alle
          </div>
        </Link>
        <Link href="/Shifts/Niet-voltooid">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Niet Voltooid"
                ? "text-white bg-sky-700"
                : "text-sky-700"
            }`}
          >
            Niet voltooid
          </div>
        </Link>
        <Link href="/Shifts/Voltooid">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Voltooid" ? "text-white bg-sky-700" : "text-sky-700"
            }`}
          >
            voltooid
          </div>
        </Link>
      </div>
    </>
  );
}
