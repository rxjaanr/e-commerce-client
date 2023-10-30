import clsx from "clsx";
import { ReactNode, useRef } from "react";
import Button from "../buttons/button";

type PropsType = {
  children?: ReactNode;
  isOpen?: boolean;
  onclick?: () => void;
  className?: string;
};

export default function Modal(props: PropsType) {
  return (
    props.isOpen === true && (
      <>
        <div
          className={clsx(
            "min-h-screen w-full flex bg-[rgba(0,0,0,0.3)] fixed"
          )}
        ></div>
        <div
          className={clsx(
            "absolute md:min-w-[30rem]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg rounded-md",
            props.className
          )}
        >
          {props.children}
        </div>
      </>
    )
  );
}
