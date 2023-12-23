import { UserCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authHandler } from "../../../utils/requests/auth/auth";
import useSession from "../../../utils/hooks/useSession";
import { toast } from "sonner";

export default function Profile({ user }: { user?: any }) {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const icon = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { deleteSession } = useSession();
  const clickHandler = (e: Event) => {
    if (
      !icon.current?.contains(e.target as Node) &&
      !box.current?.contains(e.target as Node)
    ) {
      setisOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, [isOpen]);
  return (
    <>
      <div className="relative">
        <div
          ref={icon}
          className="p-1 border border-slate-200 rounded-full cursor-pointer "
          onClick={() => setisOpen(!isOpen)}
        >
          <UserCircleIcon className="w-8" />
        </div>
        <div
          ref={box}
          className={clsx(
            "absolute shadow-md flex flex-col min-w-[13rem] right-0 top-20 p-3 px-5  rounded-md bg-white overflow-hidden duration-300 ease-in-out",
            !isOpen
              ? "max-h-[0] py-0 border-0"
              : "border border-slate-200 max-h-[20rem] "
          )}
        >
          <div className="mb-5 mt-1">
            <h1 className="font-semibold text-xl">
              {user?.firstName ?? "User"}
            </h1>
            <p className="text-neutral-600">{user?.email ?? "Not signed in"}</p>
          </div>
          <Link
            to={user ? "/dashboard" : "/auth/login"}
            className={clsx(
              "p-2 my-1 bg-black text-white rounded-md px-3 text-center cursor-pointer",
              user && user.role !== "ADMIN" && "hidden"
            )}
          >
            {user ? "Dashboard" : "Sign In"}
          </Link>

          {user ? (
            <span
              onClick={() => {
                authHandler({
                  type: "logout",
                  data: {},
                  options: {
                    headers: {
                      Authorization: user.login_tokens,
                    },
                  },
                })
                  .then((res) => {
                    navigate("/auth/login");
                    deleteSession();
                    toast.success(res.data.message, { duration: 1000 });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="p-2 my-1 rounded-md px-3 text-center border border-slate-200 cursor-pointer"
            >
              Log Out
            </span>
          ) : (
            <Link
              to={"/auth/register"}
              className="p-2 my-1 rounded-md px-3 text-center border border-slate-200 cursor-pointer"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
