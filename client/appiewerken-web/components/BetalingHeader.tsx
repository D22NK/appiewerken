import Link from "next/link";

export default function BetalingHeader({ page }: any) {
  return (
    <>
      <div className="flex flex-row mb-2">
        <h1 className="flex-1 text-2xl font-bold text-sky-500">
          Betalingen &middot; {page}
        </h1>

        {page === "Betalingen" && (
          <Link href="/Betalingen/Nieuw">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md">
              Nieuwe Betaling
            </button>
          </Link>
        )}

        {page === "Periodes" && (
          <Link href="/Betalingen/Periodes/Nieuw">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-1 px-2 rounded-md">
              Nieuwe Betaalperiode
            </button>
          </Link>
        )}
      </div>
      <div className="flex flex-row bg-slate-100 rounded-md p-2 items-center">
        <Link href="/Betalingen">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Betalingen" ||
              page === "Nieuwe Betaling" ||
              page === "Betaling Informatie"
                ? "text-white bg-sky-700"
                : "text-sky-700"
            }`}
          >
            Betalingen
          </div>
        </Link>
        <Link href="/Betalingen/Periodes">
          <div
            className={` cursor-pointer font-semibold mx-2 hover:bg-sky-600 rounded-md px-2 py-0 hover:text-white ${
              page === "Periodes" || page === "Nieuwe Periode"
                ? "text-white bg-sky-700"
                : "text-sky-700"
            }`}
          >
            Periodes
          </div>
        </Link>
      </div>
    </>
  );
}
