"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";

import clsx from "clsx";
import SearchBox from "../ui/searchbox/searchbox";

export default function Navbar({ auth }: { auth?: {} }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth > 1024) {
        return setIsOpen(false);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeHandler);
      return () => window.removeEventListener("resize", resizeHandler);
    }
  }, []);

  return (
    <>
      {/* layer */}
      <div
        className={clsx(
          "fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] z-[2]",
          !isOpen && "hidden"
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      {/* Mobile Nav */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {/* End Mobile Nav */}
      <nav className="fixed z-[1] flex justify-between top-0 right-0 left-0 px-4 md:px-8 py-4 bg-white border-b border-b-slate-300">
        <div className="flex flex-grow justify-between items-center">
          <Bars3Icon
            className="w-12 lg:hidden cursor-pointer hover:bg-slate-100 rounded-full p-2"
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <div className="flex items-center">
            <h1 className="font-bold uppercase py-3">rjstore.co</h1>
            {/* Desktop Nav */}
            {/* End Desktop Nav */}
          </div>
          {/* Search Box, Cart , And Auth */}
          <div className="flex gap-3 px-2">
            <SearchBox />
          </div>
          {/*  */}
        </div>
      </nav>
    </>
  );
}
