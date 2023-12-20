import Accordion from "@/components/accordion/accordion";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  return (
    <>
      <div className="p-1 border border-slate-200 rounded-full cursor-pointer">
        <UserCircleIcon className="w-8" />
      </div>
    </>
  );
}
