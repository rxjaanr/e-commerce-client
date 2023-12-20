import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Modal from "../modal/modal";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function SearchBox() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);

  const handleKey = (e: KeyboardEvent) => {
    if (e.key == "Escape" && isOpen) {
      e.preventDefault();
      setIsOpen(false);
    }
    if (e.key === "k" && e.ctrlKey) {
      e.preventDefault();
      setIsOpen(!isOpen);
      input.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-[90%] md:w-[55%] lg:w-[40%] p-2 bg-white rounded-md border border-slate-200 shadow flex flex-col z-[3]">
          <div className="flex border border-slate-300 px-3 rounded-sm">
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
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "rounded-full border border-slate-300 p-2 cursor-pointer"
        )}
      >
        <MagnifyingGlassIcon className="w-6" />
      </div>
    </>
  );
}
