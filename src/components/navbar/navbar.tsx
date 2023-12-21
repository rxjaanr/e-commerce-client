"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../sidebar/sidebar";
import { useState } from "react";

import clsx from "clsx";
import SearchBox from "../ui/searchbox/searchbox";
import Profile from "../ui/profile/profile";

export default function Navbar({ user }: { user?: {} }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* layer */}
      <div
        className={clsx(
          "lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] z-[2]",
          !isOpen && "hidden"
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      {/* Mobile Nav */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {/* End Mobile Nav */}
      <nav className="fixed z-[1] flex justify-between top-0 right-0 left-0 px-4 md:px-8 lg:px-12 py-4 bg-white border-b border-b-slate-300">
        <div className="flex flex-grow justify-between items-center">
          <Bars3Icon
            className="w-12 lg:hidden cursor-pointer hover:bg-slate-100 rounded-full p-2"
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <div className="flex items-center">
            <h1 className="max-lg:hidden font-bold uppercase py-3">
              rjstore.co
            </h1>
            {/* Desktop Nav */}
            {/* End Desktop Nav */}
          </div>
          {/* Search Box, Cart , And Auth */}
          <div className="flex gap-3 px-2 items-center">
            <SearchBox />
            <Profile />
          </div>
          {/*  */}
        </div>
      </nav>
    </>
  );
}
