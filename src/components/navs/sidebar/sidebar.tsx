import { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import {
  ShoppingCartIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import useSessionStore from "@/store/sessionStore/session.store";
import { useRouter } from "next/router";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sessionData = useSessionStore((state) => state.sessionData) || {
    role: "CUSTOMER",
  };

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

  return (
    <>
      {/* Layer */}
      <div
        className={clsx(
          " fixed z-[998] w-screen h-screen bg-[rgba(0,0,0,0.2)]",
          !isOpen ? "hidden" : "flex"
        )}
      ></div>
      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={clsx(
          "flex my-5 mx-6 md:mx-12 fixed top-0 flex-col gap-[0.4rem] md:gap-2 p-3 bg-slate-50 shadow-md border border-slate-300 rounded-md duration-300 ease-in-out z-[999]",
          isOpen && "translate-x-60"
        )}
      >
        <span className="py-[0.15rem] bg-black px-[1.1rem] md:px-5 rounded-sm"></span>
        <span className="py-[0.15rem] bg-black px-[1.1rem] md:px-5 rounded-sm"></span>
        <span className="py-[0.15rem] bg-black px-[1.1rem] md:px-5 rounded-sm"></span>
      </button>
      {/* TopBar */}
      <nav className="fixed top-0 flex justify-end w-full left-0 bg-slate-100 px-8 md:px-12 lg:px-14 py-5 shadow-md items-center z-[997]">
        <div className="flex gap-5 items-center">
          <h1 className="text-xl font-medium">Welcome</h1>
          <div className="flex border border-slate-300 px-2 py-2 rounded-full cursor-pointer">
            <span className=" p-4 md:p-5 bg-sky-300 rounded-full"></span>
            <ChevronDownIcon className="w-6 ml-3" />
          </div>
        </div>
      </nav>

      {/* Side */}
      <nav
        className={clsx(
          "fixed top-0 bottom-0 left-0 py-10 bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col duration-300 ease-in-out rounded-r-md z-[999]",
          !isOpen && "-translate-x-full"
        )}
      >
        <div>
          <h1 className="flex flex-col font-semibold text-3xl md:text-3xl pl-7 md:pl-8 pr-16 md:pr-20">
            <span>next</span>
            <span>commerce</span>
          </h1>
        </div>
        <div className="flex flex-col mt-12">
          {NavList.map((list, i) => {
            return (
              <Link
                href={list.link}
                key={i}
                className="flex gap-2 py-4 items-center pl-7 md:pl-8 pr-16 md:pr-20 duration-300 ease-in-out group hover:bg-slate-50 hover:text-gray-800 "
              >
                <span className="w-6">{list.icon}</span>
                <span className="text-xl md:text-2xl ">{list.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
