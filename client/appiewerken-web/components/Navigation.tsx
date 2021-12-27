import Link from "next/link";
import { useState } from "react";
import { MenuIcon, ChevronDownIcon } from "@heroicons/react/outline";
import ChevronDown from "./Icons/ChevronDown";
export default function Navigation() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [overigMenu, setOverigMenu] = useState(false);

  return (
    <>
      <nav className=" z-100">
        <div className="p-2 bg-sky-500 w-screen md:flex flex-row items-center grid grid-cols-3">
          <button
            className="block md:hidden rounded-md hover:bg-sky-600 justify-self-start "
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <MenuIcon className="h-8 text-sky-800 " />
          </button>

          <div className="flex mx-8 place-self-center">
            <Link href="/Dashboard">
              <img src="/ah.png" alt="" className="h-8" />
            </Link>
          </div>
          <div className="hidden md:flex">
            <Link href="/Dashboard">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4">
                Dashboard
              </div>
            </Link>

            <Link href="/Kalender">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4">
                Kalender
              </div>
            </Link>

            <Link href="/Shifts">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4">
                Shifts
              </div>
            </Link>

            <Link href="/Betalingen">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4">
                Betalingen
              </div>
            </Link>

            <Link href="/Overig">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4">
                Overig
              </div>
            </Link>

            <Link href="/Shiftfollower">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4">
                Shiftfollower
              </div>
            </Link>
          </div>
        </div>

        {mobileMenu && (
          <div className="bg-sky-300 w-screen  md:hidden p-4 z-100">
            <Link href="/Dashboard">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4 mb-2">
                Dashboard
              </div>
            </Link>
            <Link href="/Kalender">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4 mb-2">
                Kalender
              </div>
            </Link>
            <Link href="/Shifts">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4 mb-2">
                Shifts
              </div>
            </Link>
            <Link href="/Betalingen">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4 mb-2">
                Betalingen
              </div>
            </Link>
            <Link href="/Overig">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4 mb-2">
                Overig
              </div>
            </Link>
            <Link href="/Shiftfollower">
              <div className="cursor-pointer rounded-md p-1 text-sky-100 font-semibold hover:text-sky-800 mr-4">
                Shiftfollower
              </div>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
