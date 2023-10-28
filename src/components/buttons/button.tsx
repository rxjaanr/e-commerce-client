import clsx from "clsx";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: any;
  onclick?: any;
  disabled?: boolean;
};

export default function Button(props: PropsType) {
  return (
    <>
      <button
        disabled={props.disabled}
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
