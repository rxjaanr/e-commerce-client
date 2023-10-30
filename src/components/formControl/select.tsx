import clsx from "clsx";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  onChange?: (e: any) => any;
  value?: string;
  className?: string;
  name: string;
};

export default function Select(props: PropsType) {
  return (
    <>
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={clsx(
          "px-6 py-4 bg-white border border-slate-200 ",
          props.className
        )}
      >
        {props.children}
      </select>
    </>
  );
}
