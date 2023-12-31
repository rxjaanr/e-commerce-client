import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ReactNode, useState } from "react";

type propsType = {
  opened?: boolean;
  headerText: string | ReactNode;
  children?: ReactNode;
  toggleOn: "hover" | "click";
  animated?: boolean;
  withoutCaret?: boolean;
  className?: string;
};

export default function Accordion({
  opened,
  headerText,
  children,
  toggleOn,
  animated,
  className,
}: propsType) {
  const [isOpen, setIsOpen] = useState(opened);
  return (
    <>
      <div className="w-full group relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "flex w-full justify-between items-center cursor-pointer",
            className
          )}
        >
          <h1 className="font-medium">{headerText}</h1>
          <ChevronDownIcon
            className={clsx(
              "w-4 ml-2 text-slate-500",
              toggleOn == "click" && isOpen && "-rotate-180",
              toggleOn === "hover" && "group-hover:-rotate-180",
              animated && "duration-200 ease-in-out"
            )}
          />
        </div>
        <div
          className={clsx(
            "overflow-hidden max-h-0 opacity-0 w-full",
            toggleOn === "click" &&
              isOpen &&
              "max-h-[20rem] pt-1 !pb-5 opacity-100",
            toggleOn === "hover" &&
              "group-hover:opacity-100 group-hover:max-h-[20rem] group-hover:pb-5",
            animated && "transition-all duration-[0.4s] ease-in-out"
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
