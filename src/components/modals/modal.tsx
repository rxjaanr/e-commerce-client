import clsx from "clsx";
import { ReactNode, useRef } from "react";
import Button from "../buttons/button";

type PropsType = {
  message: string;
  subMessage: string;
  children?: ReactNode;
  dark?: boolean;
  isOpen?: boolean;
  onclick?: () => void;
};

export default function Modal(props: PropsType) {
  return (
    <>
      <div
        className={clsx(
          "absolute z-[998] h-screen w-screen bg-[rgba(0,0,0,0.4)]",
          props.isOpen === false && "hidden"
        )}
      ></div>
      <div
        className={clsx(
          "w-[20rem] py-6 px-8 rounded shadow-md flex flex-col absolute my-auto left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] duration-300 ease-in-out z-[999]",
          props.dark === true ? "bg-slate-800 text-white" : "bg-slate-100",
          props.isOpen === false ? "scale-0" : "md:scale-125"
        )}
      >
        <span className=" mb-8">
          <h1 className="text-xl font-medium">{props.message}</h1>
          <p>{props.subMessage}</p>
        </span>
        <div className="flex justify-end">
          <Button className="bg-[#6dc8c2] py-3 px-8" onclick={props.onclick}>
            Ok
          </Button>
        </div>
      </div>
    </>
  );
}
