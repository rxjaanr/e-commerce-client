import {
  ArrowRightIcon,
  ListBulletIcon,
  Square2StackIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "../../ui/profile/profile";
import useSession from "../../../utils/hooks/useSession";

export default function DashboardNav() {
  const pathname = useLocation().pathname;
  const { user } = useSession();
  useEffect(() => console.log(pathname), []);
  const dashboardRoutes = [
    {
      name: "Main",
      link: "/dashboard",
      icon: <Squares2X2Icon className="w-5" />,
      active: pathname === "/dashboard" || pathname === "/dashboard/",
    },
    {
      name: "Users",
      link: "/dashboard/users",
      icon: <UsersIcon className="w-5" />,
      active: pathname.includes("/dashboard/users"),
    },
    {
      name: "Products",
      link: "/dashboard/products",
      icon: <Square2StackIcon className="w-5" />,
      active: pathname.includes("/dashboard/products"),
    },
    {
      name: "Orders",
      link: "/dashboard/orders",
      icon: <ListBulletIcon className="w-5" />,
      active: pathname.includes("/dashboard/orders"),
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center border border-slate-200 md:px-8 px-6 py-4 bg-white">
        <span className="font-medium text-base text-neutral-800 !leading-6 flex gap-1">
          <span className="text-neutral-600">Hi, </span>
          {user.firstName}
        </span>
        <div className="ml-auto flex gap-4 items-center">
          <Profile user={user} />
        </div>
        {/* Main Nav */}
        <nav className="fixed md:top-0 bottom-0 left-0 max-md:right-0 md:w-56 lg:w-60 px-8 py-6 md:py-8 bg-white border border-slate-200 rounded-t-md ">
          <div className="flex md:flex-col gap-12 sm:gap-24 md:gap-6 justify-center h-full">
            <div className="max-md:hidden pb-8 pt-3">
              <h1 className="text-xl font-semibold">RJSTORE</h1>
            </div>
            {dashboardRoutes.map((list, i) => {
              return (
                <Link
                  key={i}
                  to={list.link}
                  className={clsx(
                    "flex max-md:flex-col items-center hover:text-black max-md:justify-center text-neutral-500 gap-1",
                    list?.active && "!text-black"
                  )}
                >
                  {list.icon}
                  <h1 className="leading-5 text-xs md:text-base md:ml-2">
                    {list.name}
                  </h1>
                </Link>
              );
            })}
            <Link
              className="flex items-center gap-3 mt-auto max-md:hidden"
              to={"/"}
            >
              <span>Back To Home</span>
              <ArrowRightIcon className="w-4" />
            </Link>
          </div>
        </nav>
        {/* End Main Nav */}
      </div>
    </>
  );
}
