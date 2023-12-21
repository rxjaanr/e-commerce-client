import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Modal from "../modal/modal";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function SearchBox() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      input.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[40%] p-2 bg-white rounded-md border border-slate-200 shadow flex flex-col z-[3]">
          <div className="flex border border-slate-300 px-3 rounded-sm ">
            <MagnifyingGlassIcon className="w-6  mr-1" />
            <input
              ref={input}
              className="flex p-2 focus:outline-none flex-grow bg-transparent"
              placeholder="Search products"
            ></input>
          </div>
        </div>
      </Modal>
      <div
        onClick={() => setIsOpen(true)}
        className={clsx(
          "rounded-full flex items-center border border-slate-300 p-2 cursor-pointer hover:bg-slate-50"
        )}
      >
        <MagnifyingGlassIcon className="w-6" />
        <h1 className="text-neutral-600 max-md:hidden mx-2 text-[0.9rem] mr-3">
          Search...
        </h1>
        <div className="flex text-[0.8rem] mx-2 max-lg:hidden font-semibold text-neutral-500">
          <span className="p-1 px-2 bg-slate-300 rounded-md shadow-md">
            CTRL
          </span>
          <span className="p-1">+</span>
          <span className="p-1 px-2 bg-slate-300 rounded-md shadow-md">K</span>
        </div>
      </div>
    </>
  );
}
