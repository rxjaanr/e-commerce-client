import clsx from "clsx";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  type?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  type,
  className,
  disabled,
  onClick,
}: PropsType) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled ?? false}
        type={(type as any) ?? "button"}
        className={clsx("p-2 border border-slate-200", className)}
      >
        {children}
      </button>
    </>
  );
}
