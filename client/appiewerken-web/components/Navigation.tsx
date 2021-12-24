import Link from "next/link";

// export default function Navigation() {
//   return (
//     <>
//       <nav className="bg-gray-800">
//         <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
//           <div className="relative flex items-center justify-between h-16">
//             <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//                 aria-controls="mobile-menu"
//                 aria-expanded="false"
//               >
//                 <span className="sr-only">Open main menu</span>

//                 <svg
//                   className="block h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>

//                 <svg
//                   className="hidden h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
//               <div className="flex-shrink-0 flex items-center">
//                 <img
//                   className="block lg:hidden h-8 w-auto"
//                   src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
//                   alt="Workflow"
//                 />
//                 <img
//                   className="hidden lg:block h-8 w-auto"
//                   src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
//                   alt="Workflow"
//                 />
//               </div>
//               <div className="hidden sm:block sm:ml-6">
//                 <div className="flex space-x-4">
//                   <a
//                     href="#"
//                     className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
//                     aria-current="page"
//                   >
//                     Dashboard
//                   </a>

//                   <a
//                     href="#"
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     Team
//                   </a>

//                   <a
//                     href="#"
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     Projects
//                   </a>

//                   <a
//                     href="#"
//                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     Calendar
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//               <button
//                 type="button"
//                 className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
//               >
//                 <span className="sr-only">View notifications</span>

//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                   />
//                 </svg>
//               </button>

//               <div className="ml-3 relative">
//                 <div>
//                   <button
//                     type="button"
//                     className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
//                     id="user-menu-button"
//                     aria-expanded="false"
//                     aria-haspopup="true"
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <img
//                       className="h-8 w-8 rounded-full"
//                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                       alt=""
//                     />
//                   </button>
//                 </div>

//                 <div
//                   className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
//                   role="menu"
//                   aria-orientation="vertical"
//                   aria-labelledby="user-menu-button"
//                   tabindex="-1"
//                 >
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700"
//                     role="menuitem"
//                     id="user-menu-item-0"
//                   >
//                     Your Profile
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700"
//                     role="menuitem"
//                     id="user-menu-item-1"
//                   >
//                     Settings
//                   </a>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700"
//                     role="menuitem"
//                     id="user-menu-item-2"
//                   >
//                     Sign out
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="sm:hidden" id="mobile-menu">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <a
//               href="#"
//               className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
//               aria-current="page"
//             >
//               Dashboard
//             </a>

//             <a
//               href="#"
//               className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
//             >
//               Team
//             </a>

//             <a
//               href="#"
//               className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
//             >
//               Projects
//             </a>

//             <a
//               href="#"
//               className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
//             >
//               Calendar
//             </a>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

export default function Navigation({ parentPage }: any) {
  return (
    <div className="bg-sky-500 flex flex-col w-[100%] md:w-[25%] xl:w-[15%] 3xl:w-[15%]">
      <div className="mt-4 flex flex-col">
        <h1 className="ml-4 text-white font-bold">AppieWerken</h1>
      </div>
      <div className="w-full m-auto my-2 border-b-2 border-w border-sky-400"></div>

      <div className="m-6 flex flex-col flex-1">
        <Link href="/Dashboard">
          <div
            className={`hover:bg-sky-600 p-2 rounded-md  mb-2  ${
              parentPage === "Dashboard" ? "bg-sky-600" : " "
            }`}
          >
            <a className="text-white font-bold" href="">
              Dashboard
            </a>
          </div>
        </Link>

        <Link href="/Kalender">
          <div
            className={`hover:bg-sky-600 p-2 rounded-md  mb-2  ${
              parentPage === "Kalender" ? "bg-sky-600" : " "
            }`}
          >
            <a className="text-white font-bold" href="">
              Kalender
            </a>
          </div>
        </Link>
        <Link href="/Shifts">
          <div
            className={`hover:bg-sky-600 p-2 rounded-md  mb-2  ${
              parentPage === "Shifts" ? "bg-sky-600" : " "
            }`}
          >
            <a className="text-white font-bold" href="">
              Shifts
            </a>
          </div>
        </Link>
        <Link href="/Betalingen">
          <div
            className={`hover:bg-sky-600 p-2 rounded-md  mb-2  ${
              parentPage === "Betalingen" ? "bg-sky-600" : " "
            }`}
          >
            <a className="text-white font-bold" href="">
              Betalingen
            </a>
          </div>
        </Link>
        <Link href="/Overig">
          <div
            className={`hover:bg-sky-600 p-2 rounded-md  mb-2  ${
              parentPage === "Overig" ? "bg-sky-600" : " "
            }`}
          >
            <a className="text-white font-bold" href="">
              Overig
            </a>
          </div>
        </Link>
      </div>
      <div className="bg-sky-400 m-2">
        <Link href="/Instellingen">
          <div
            className={`hover:bg-sky-600 p-2  ${
              parentPage === "Instellingen" ? "bg-sky-600" : " "
            }`}
          >
            <a className="text-white font-bold" href="">
              Instellingen
            </a>
          </div>
        </Link>
      </div>
    </div>
  );
}
