import Link from "next/link";

export default function ShiftHeader({ page }: any) {
  return (
    <>
      <div className="flex flex-row mb-2">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Shifts &middot; {page}
        </h1>
        {(page === "Alle Shifts" ||
          page === "Voltooide Shifts" ||
          page === "Onvoltooide Shifts") && (
          <Link href="/Shifts/Nieuw">
            <button className="bg-sky-500 hover:border-sky-600 border-2 border-sky-500 hover:bg-transparent hover:text-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md">
              Nieuwe Shift
            </button>
          </Link>
        )}
      </div>
      {/* <div className="flex flex-row bg-slate-100 rounded-md p-2 items-center"></div> */}
    </>
  );
}
