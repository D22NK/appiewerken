import Link from "next/link";

export default function OverigHeader({ page }: any) {
  return (
    <>
      <div className="flex flex-row mb-2">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Shifts &middot; {page}
        </h1>
        {page === "Winkels" && (
          <Link href="/Overig/Winkels/Nieuw">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md">
              Nieuwe Winkel
            </button>
          </Link>
        )}

        {page === "Uurlonen" && (
          <Link href="/Overig/Uurlonen/Nieuw">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md">
              Nieuw Uurloon
            </button>
          </Link>
        )}
      </div>
      <div className="flex flex-row bg-slate-100 rounded-md p-2 items-center">
        <Link href="/Overig/Winkels">
          <div
            className={`cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Winkels" ||
              page === "Nieuwe Winkel" ||
              page === "Winkel Informatie"
                ? "text-white bg-sky-700"
                : "text-sky-700"
            }`}
          >
            Winkels
          </div>
        </Link>

        <Link href="/Overig/Uurlonen">
          <div
            className={`cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Uurlonen" ||
              page === "Nieuw Uurloon" ||
              page === "Uurloon Informatie"
                ? "text-white bg-sky-700"
                : "text-sky-700"
            }`}
          >
            Uurlonen
          </div>
        </Link>

        <Link href="/Overig/Winkels">
          <div
            className={`cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Tijdslots" || page === "Nieuw Tijdslot"
                ? "text-white bg-sky-700"
                : "text-sky-700"
            }`}
          >
            Tijdslots
          </div>
        </Link>
      </div>
    </>
  );
}
