import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumbs({ className }: { className?: string }) {
  const router = useLocation();
  let path = router.pathname.split("/").filter((path) => path !== "");
  return (
    <div className={className}>
      {path.map((list, i) => {
        const link = "/" + path.filter((_, index) => index <= i).join("/");
        return (
          <span
            className={clsx(
              "font-medium flex items-center gap-1 text-sm md:text-base",
              i !== path.length - 1 && "text-neutral-600"
            )}
            key={i}
          >
            <Link to={link}>{list.replace(/-/g, " ")}</Link>
            {i !== path.length - 1 && <ChevronRightIcon className="w-4" />}
          </span>
        );
      })}
    </div>
  );
}
