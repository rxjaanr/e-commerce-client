import clsx from "clsx";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  type?: string;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  type,
  className,
  disabled,
}: PropsType) {
  return (
    <>
      <button
        disabled={disabled ?? false}
        type={(type as any) ?? "button"}
        className={clsx("p-2 border border-slate-200", className)}
      >
        {children}
      </button>
    </>
  );
}
