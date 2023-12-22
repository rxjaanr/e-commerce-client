import clsx from "clsx";
import { ReactNode } from "react";

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={clsx(
          "fixed top-0 left-0 bottom-0 right-0 flex justify-center items-start pt-40 z-[2] backdrop-blur-[1px]"
        )}
      >
        <div
          className={clsx(
            "fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] z-[3]"
          )}
          onClick={onClose}
        ></div>
        {children}
      </div>
    </>
  );
}
