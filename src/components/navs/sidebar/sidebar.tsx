import { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import {
  ShoppingCartIcon,
  ShoppingBagIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import useSessionStore from "@/store/sessionStore/session.store";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/20/solid";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sessionData = useSessionStore((state) => state.sessionData) || {
    role: "CUSTOMER",
  };

  const [isAdmin, setisAdmin] = useState(false);
  const router = useRouter();

  interface iNavlist {
    name: string;
    link: string;
    icon: ReactNode;
    adminOnly?: boolean;
  }

  const NavList: iNavlist[] = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <ChartBarIcon />,
    },
    {
      name: "Orders",
      link: "/dashboard/orders",
      icon: <ShoppingCartIcon />,
    },
    {
      name: "Products",
      link: "/dashboard/products",
      icon: <ShoppingBagIcon />,
      adminOnly: true,
    },
  ];

  useEffect(() => {
    setisAdmin(sessionData.role === "ADMIN");
  }, []);

  return (
    <>
      <h1>Tesss</h1>
    </>
  );
}
