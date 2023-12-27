"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Input from "../../components/forms/input/input";
import Button from "../../components/ui/button/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authHandler } from "../../utils/requests/auth/auth";
import { toast } from "sonner";
import useSession from "../../utils/hooks/useSession";

export default function AuthPage() {
  const { type } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validation, setValidation] = useState<any>({});
  const setSession = useSession((state) => state.setSession);
  const navigate = useNavigate();
  interface iData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  const [data, setData] = useState<iData | any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const formList = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      value: data.firstName,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      value: data.lastName,
    },
    {
      name: "email",
      type: "email",
      placeholder: "example@gmail.com",
      value: data.email,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Strong Password",
      value: data.password,
    },
  ];

  return (
    <main className="flex h-screen">
      <h1 className="uppercase text-xl font-bold absolute p-6 md:p-8 text-neutral-800">
        rjstore.co
      </h1>
      <Link
        onClick={() => {
          setTimeout(() => {
            setData({});
          }, 1000);
          setValidation({});
        }}
        className="absolute p-6 md:p-8 right-0"
        to={type === "login" ? "/auth/register" : "/auth/login"}
      >
        {type === "login" ? "Register" : "Login"}
      </Link>
      <Link
        className="absolute font-medium bottom-0 right-0 p-6 md:p-8  flex gap-2 items-center"
        to={"/"}
      >
        Back to Homepage <ArrowRightIcon className="w-4 md:w-5" />
      </Link>
      <div className="md:w-2/5 lg:w-1/2 h-full hidden bg-[#DEF5E5] md:flex p-5 md:p-8">
        <p className="text-neutral-800 mt-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quam
          nisi illum illo voluptatem beatae commodi reiciendis dolores aliquid?
          Ipsa?
        </p>
      </div>
      <div className="flex-grow flex justify-center items-center px-[7%]">
        <div className="flex flex-col items-center w-full">
          <div className="text-center">
            <h1 className="capitalize text-[1.5rem] leading-9 font-semibold">
              {type === "login"
                ? "Sign in to your account"
                : "Create an account"}
            </h1>
            <p className="text-neutral-600">
              {" "}
              {type === "login"
                ? "Enter Your Credentials to login "
                : "Enter your data below to create an account"}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              authHandler({ type: type as string, data: data, options: {} })
                .then((res) => {
                  if (type === "register") {
                    toast.success(res.data.message);
                    setTimeout(() => {
                      setData({});
                      toast.loading("Navigating To Login Page", {
                        onAutoClose: () => {
                          navigate("/auth/login");
                        },
                        duration: 1000,
                      });
                    }, 1500);
                    setValidation({});
                  } else {
                    setSession(res.data);
                    navigate(-1);
                  }
                })
                .catch((err) => {
                  if (err && err.response) {
                    if (type === "register") {
                      if (err.response.status === 422) {
                        setValidation(err.response.data.error);
                      }
                    } else {
                      if (err.response.status === 401) {
                        toast.error(err.response?.data?.error.message);
                      }
                    }
                  }
                })
                .finally(() => setIsLoading(false));
            }}
            className="flex flex-col mt-8 w-full gap-2"
          >
            {formList
              .filter((list) => {
                if (type === "login") {
                  return list.name !== "firstName" && list.name !== "lastName";
                }
                return list;
              })
              .map((list, i) => {
                return (
                  <Input
                    key={i}
                    type={list.type as any}
                    value={list.value || ""}
                    onChange={(e: any) =>
                      setData((prevState: iData) => ({
                        ...prevState,
                        [list.name]: e.target.value,
                      }))
                    }
                    placeholder={list.placeholder}
                  >
                    {validation.errors && validation.errors[list.name] && (
                      <small className="mt-1 text-red-500 lowercase">
                        {validation.errors[list.name].message}
                      </small>
                    )}
                  </Input>
                );
              })}
            <Button
              disabled={isLoading}
              className="mt-6 bg-[#DEF5E5] shadow py-3 disabled:bg-neutral-100 disabled:pointer-events-none"
              type="submit"
            >
              {isLoading ? "..." : type === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
