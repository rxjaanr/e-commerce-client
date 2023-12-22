import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Dropdown({
  items,
  title,
}: {
  items?: any[];
  title: string;
}) {
  return (
    <div className="relative group">
      <h1 className="p-3 flex font-medium cursor-pointer">
        {title} {<ChevronDownIcon className="w-4 mx-2 text-neutral-500" />}
      </h1>
      {items && (
        <div className="absolute hidden px-5 py-4 pb-5 min-w-[12rem] rounded-md border border-slate-200 bg-white group-hover:flex flex-col">
          {items.length > 0 &&
            items?.map((item) => {
              return (
                <Link
                  className="text-neutral-700 flex items-center hover:text-black py-[0.35rem]"
                  to={item.link}
                >
                  {item.name}
                  <span className="mx-2 mb-1">{item?.icon}</span>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
