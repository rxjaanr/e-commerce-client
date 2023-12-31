import clsx from "clsx";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Accordion from "../../ui/accordion/accordion";

export const navList = [
  {
    title: "Discover",
    route: [
      {
        name: "Hot Sales",
        link: "/#hot-sales",
      },
      {
        name: "Categories",
        link: "/#categories",
        icon: <ArrowUpRightIcon className="w-[0.70rem]" />,
      },
    ],
  },
  {
    title: "Categories",
    route: [
      {
        name: "Handphone",
        link: "/products/handphone",
      },
      {
        name: "Laptop",
        link: "/products/laptop",
      },
      {
        name: "Accessories",
        link: "/products/accessories",
      },
    ],
  },
];

export default function Sidebar(props: {
  isOpen: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={clsx(
        "fixed lg:hidden top-0 bottom-0 left-0 bg-white py-8 px-6 w-72 shadow-[rgba(0,0,15,0.1)_2px_0px_2px_0px] transition-all duration-300 ease-in-out z-[3]",
        !props.isOpen && "-translate-x-full"
      )}
    >
      <div className="flex w-full justify-between items-center">
        <h1 className="font-bold text-[1.15rem] uppercase">rjstore</h1>
        <XMarkIcon
          className="w-8 cursor-pointer hover:bg-slate-100 rounded-full p-2 translate-x-2"
          onClick={props.onClose}
        />
      </div>
      <div className="flex flex-col mt-10 gap-4">
        {navList.map((list, i) => {
          return (
            <div key={i} className="border-b border-b-slate-300">
              <Accordion
                className="py-4"
                animated
                headerText={list.title}
                toggleOn="click"
                opened={true}
              >
                <div className="flex flex-col text-neutral-500">
                  {list.route.map((route, i) => {
                    return (
                      <Link
                        reloadDocument={list.title === "Discover"}
                        key={i}
                        to={route.link}
                        className="py-1 hover:!text-black"
                      >
                        {route.name}
                      </Link>
                    );
                  })}
                </div>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}
