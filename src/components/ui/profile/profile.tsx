import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authHandler } from "../../../utils/requests/auth/auth";
import useSession from "../../../utils/hooks/useSession";
import { toast } from "sonner";
import { UserType } from "../../../utils/types/type";

export default function Profile({ user }: { user: UserType | any }) {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const icon = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const pathname = useLocation()?.pathname;
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
          className="flex rounded-full cursor-pointer hover:bg-slate-100 p-2 border border-slate-400 bg-slate-50 px-[0.59rem]"
          onClick={() => setisOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
            viewBox="0 0 448 512"
          >
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
          </svg>
        </div>
        <div
          ref={box}
          className={clsx(
            "absolute shadow-md flex flex-col min-w-[13rem] right-0 top-20 rounded-md bg-white overflow-hidden duration-300 ease-in-out text-sm md:text-base",
            !isOpen
              ? "max-h-[0] !py-0 border-0"
              : "border border-slate-200 max-h-[20rem] py-3 text-neutral-900 "
          )}
        >
          <div className="mb-5 mt-1 px-4">
            <h1 className="font-semibold text-xl">
              {user?.firstName ?? "User"}
            </h1>
            <p className="text-neutral-600">{user?.email ?? "Not signed in"}</p>
          </div>
          <div className="flex flex-col">
            {user && (
              <Link
                to={"/profile"}
                className="flex items-center gap-2  p-2 px-4  border border-slate-200 cursor-pointer hover:bg-slate-100"
              >
                Profile
              </Link>
            )}
            {user && user.role && "ADMIN" && (
              <Link
                to={pathname.includes("/dashboard") ? "/" : "/dashboard"}
                className={clsx(
                  "flex items-center gap-2  p-2  px-4 border border-slate-200 cursor-pointer hover:bg-slate-100",
                  user && user.role !== "ADMIN" && "hidden"
                )}
              >
                {pathname.includes("/dashboard") ? "Home" : "Dashboard"}
              </Link>
            )}

            {user ? (
              <span
                onClick={() => {
                  authHandler({
                    type: "logout",
                    data: {},
                    options: {
                      headers: {
                        Authorization: user.token,
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
                className=" flex items-center gap-2 p-2 px-4 border border-slate-200 cursor-pointer hover:bg-slate-100"
              >
                Log Out
              </span>
            ) : (
              <>
                <Link
                  to={"/auth/login"}
                  className={clsx(
                    "flex items-center gap-2 p-2 px-4 border border-slate-200 cursor-pointer hover:bg-slate-100"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  to={"/auth/register"}
                  className="flex items-center gap-2 p-2 px-4 border border-slate-200 cursor-pointer hover:bg-slate-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
