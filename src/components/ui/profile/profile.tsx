import Accordion from "@/components/accordion/accordion";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Profile({ user }: { user?: {} }) {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const icon = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const clickHandler = (e: Event) => {
    if (
      !icon.current?.contains(e.target as Node) &&
      !box.current?.contains(e.target as Node)
    ) {
      setisOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, [isOpen]);
  return (
    <>
      <div className="relative">
        <div
          ref={icon}
          className="p-1 border border-slate-200 rounded-full cursor-pointer "
          onClick={() => setisOpen(!isOpen)}
        >
          <UserCircleIcon className="w-8" />
        </div>
        <div
          ref={box}
          className={clsx(
            "absolute flex flex-col w-36 right-0 -bottom-40 p-3 border border-slate-200 rounded-md bg-white",
            !isOpen && "hidden"
          )}
        >
          <Link
            href={"auth/login"}
            className="p-2 my-1 bg-black text-white rounded-md px-3 text-center"
          >
            Sign In
          </Link>
          <Link
            href={"/auth/register"}
            className="p-2 my-1 rounded-md px-3 text-center border border-slate-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
