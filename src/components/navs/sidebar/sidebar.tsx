import { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import {
  ShoppingCartIcon,
  ShoppingBagIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import useSessionStore from "@/store/sessionStore/session.store";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/20/solid";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sessionData = useSessionStore((state) => state.sessionData) || {
    role: "CUSTOMER",
  };

  const [isAdmin, setisAdmin] = useState(false);
  const router = useRouter();

  interface iNavlist {
    name: string;
    link: string;
    icon: ReactNode;
    adminOnly?: boolean;
  }

  const NavList: iNavlist[] = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <ChartBarIcon />,
    },
    {
      name: "Orders",
      link: "/dashboard/orders",
      icon: <ShoppingCartIcon />,
    },
    {
      name: "Products",
      link: "/dashboard/products",
      icon: <ShoppingBagIcon />,
      adminOnly: true,
    },
  ];

  useEffect(() => {
    setisAdmin(sessionData.role === "ADMIN");
  }, []);

  return (
    <>
      {/* Layer */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "absolute z-[998] w-screen h-screen bg-[rgba(0,0,0,0.3)]",
          isOpen ? "flex" : "hidden"
        )}
      ></div>
      <aside
        className={clsx(
          "flex fixed flex-col rounded-r-md  py-2 left-0 bottom-0 top-0 text-white bg-gradient-to-bl from-sky-400 to-blue-500 duration-300 ease-in-out z-[999] w-[20rem]",
          isOpen
            ? "translate-x-0"
            : "-translate-x-[100%] md:translate-x-0 md:w-24"
        )}
      >
        {/* Header */}
        <div className="flex justify-between border-b border-b-slate-100 py-4 pb-8  items-center text-2xl relative px-6 md:pl-8">
          <h1
            className={clsx(
              "capitalize font-semibold text-2xl duration-300 ease-in-out",
              !isOpen && "scale-0 origin-left"
            )}
          >
            XPedia
          </h1>
          <span
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              "p-2 px-3 text-4xl ml-8 rounded-md cursor-pointer duration-300 ease-in-out shadow-lg",
              isOpen
                ? "translate-x-0   bg-[rgba(255,255,255,0.4)] "
                : "translate-x-28 md:-translate-x-32 bg-slate-200 text-slate-700 md:bg-[rgba(255,255,255,0.4)] md:text-white"
            )}
          >
            <Bars3Icon className="w-10" />
          </span>
        </div>
        {/* Header End */}
        {/* Nav List */}
        <div className="flex flex-col px-4  py-6 overflow-hidden">
          {NavList.length > 0 &&
            NavList.map((list, i) => {
              let active: boolean = list.link === router.pathname;
              return (
                <Link
                  key={i}
                  href={list?.link}
                  className={clsx(
                    " text-xl py-4 px-6 flex  items-center md:my-1 duration-300 ease-in-out",
                    active
                      ? " bg-white rounded-md text-sky-500 shadow-md"
                      : "text-[rgba(255,255,255,0.8)]",
                    !isOpen && "md:px-4",
                    !isAdmin && list.adminOnly && "hidden"
                  )}
                >
                  <span className="min-w-[1.5rem] md:min-w-[2rem]">
                    {list?.icon}
                  </span>
                  <h1
                    className={clsx(
                      "ml-4 font-medium md:ml-6 duration-200 ease-in-out ",
                      !isOpen && "scale-0 origin-left"
                    )}
                  >
                    {list?.name}
                  </h1>
                </Link>
              );
            })}
        </div>
        {/* Nav List end */}
        <div className="flex  flex-grow justify-center items-end overflow-hidden">
          <div className="w-full flex border-t border-t-slate-200 items-center pb-2 pt-4 px-7  cursor-pointer text-[rgba(255,255,255,0.8)] font-medium">
            <ArrowLeftOnRectangleIcon className="min-w-[1.8rem] max-w-[1.9rem] md:min-w-[2.5rem] md:max-w-[2.5rem]" />

            <span
              className={clsx(
                "mx-4 text-xl duration-300 ease-in-out",
                !isOpen && "scale-0"
              )}
            >
              Logout
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
