import clsx from "clsx";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: any;
  onclick?: any;
};

export default function Button(props: PropsType) {
  return (
    <>
      <button
        onClick={props.onclick}
        type={props.type}
        className={clsx(
          " rounded-md ",
          {
            "w-full": props.fullWidth === true,
          },
          props.className
        )}
      >
        {props.children}
      </button>
    </>
  );
}
