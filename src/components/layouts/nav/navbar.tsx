import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar, { navList } from "./sidebar";
import { useState } from "react";

import clsx from "clsx";
import Search from "../../ui/search/search";
import Profile from "../../ui/profile/profile";
import Dropdown from "../../ui/dropdown/dropdown";

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
          <div className="flex items-center max-lg:hidden">
            <h1 className=" font-bold uppercase py-2">rjstore.co</h1>
            {/* Desktop Nav */}
            <div className="flex ml-8 ">
              {navList.map((list, i) => {
                return (
                  <Dropdown key={i} title={list.title} items={list.route} />
                );
              })}
            </div>
            {/* End Desktop Nav */}
          </div>
          {/* Search Box, Cart , And Auth */}
          <div className="flex gap-3 px-2 items-center">
            <Search />
            <Profile />
          </div>
          {/*  */}
        </div>
      </nav>
    </>
  );
}
