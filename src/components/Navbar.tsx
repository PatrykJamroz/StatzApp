import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PoweredByStravaIcon } from "@/components/PoweredByStravaIcon";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    setIsNavbarCollapsed(true);
  }, [router.pathname]);

  const getItemClassname = (path: string) =>
    path === router.pathname
      ? "block py-2 pl-3 pr-4 text-white-700 bg-blue-900 rounded md:bg-transparent md:p-0"
      : "block py-2 pl-3 pr-4 text-gray-400 rounded hover:text-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent";

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-gray-900">
      <div className={"mx-auto max-w-3xl"}>
        <div
          className={
            "container flex flex-wrap items-center justify-between mx-auto"
          }
        >
          <p className={"text-2xl font-semibold"}>StatzApp</p>
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            onClick={() => {
              setIsNavbarCollapsed((prevState) => !prevState);
            }}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${
              isNavbarCollapsed ? "hidden" : ""
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
              <li>
                <Link href={"/"} className={getItemClassname("/")}>
                  User
                </Link>
              </li>
              <li>
                <Link
                  href={"/activities"}
                  className={getItemClassname("/activities")}
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link href={"/about"} className={getItemClassname("/about")}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={""}
                  className={getItemClassname("")}
                  onClick={() => (session ? signOut() : signIn())}
                >
                  {`Sign ${session ? "out" : "in"}`}
                </Link>
              </li>
              <li>
                <a
                  href={"https://strava.com"}
                  className={
                    "block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 hover:bg-gray-700 md:hover:bg-transparent"
                  }
                >
                  <PoweredByStravaIcon size={20} fill={"#fff"} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
