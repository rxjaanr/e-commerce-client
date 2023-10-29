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
          "px-6 py-4 bg-slate-50 border border-slate-200 rounded-md",
          props.className
        )}
      >
        <option disabled>Categories</option>
        {props.children}
      </select>
    </>
  );
}
