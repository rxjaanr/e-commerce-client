import Button from "@/components/buttons/button";
import FormControl from "@/components/formControl/form.control";
import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";

import { registerHandler } from "@/libs/axios/config/api.config";
import Modal from "@/components/modals/modal";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import useSessionStore from "@/store/sessionStore/session.store";

export default function RegisterPage() {
  interface iForm {
    placeholder: string;
    name: string;
    inputType: "text" | "email" | "password";
    value: string | undefined;
  }

  interface iData {
    name: string;
    address: string;
    email: string;
    password: string;
    bank_account: string;
  }

  const [formData, setformData] = useState<iData>({
    name: "",
    address: "",
    email: "",
    password: "",
    bank_account: "",
  });

  const [validations, setvalidations] = useState<{} | any>({});
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  const router = useRouter();

  const formList: Array<iForm> = [
    {
      placeholder: "Name",
      name: "name",
      inputType: "text",
      value: formData.name || "",
    },
    {
      placeholder: "Address",
      name: "address",
      inputType: "text",
      value: formData.address || "",
    },
    {
      placeholder: "Email",
      name: "email",
      inputType: "email",
      value: formData.email || "",
    },
    {
      placeholder: "Password",
      name: "password",
      inputType: "password",
      value: formData.password || "",
    },
    {
      placeholder: "Bank Account (optional)",
      name: "bank_account",
      inputType: "text",
      value: formData.bank_account || "",
    },
  ];

  return (
    <main>
      {/* Modal */}

      {/* Model End */}
      <div className="flex">
        <div className="flex w-full md:w-3/6 lg:w-3/5 px-[8%] max-lg:px-4 py-4 h-screen bg-[#6dc8c2] max-md:hidden">
          <img src="/assets/svg/person-shop.svg" alt="person-shopping" />
        </div>
        <div className=" w-full  md:w-3/6 lg:w-2/5 px-8 max-lg:px-4 max-sm:px-0  py-4 h-screen bg-gradient-to-bl from-rose-100 to-teal-100  ">
          <div className="flex flex-col px-8 py-4 justify-center h-full ">
            <div className=" max-md:text-center">
              <h1 className="text-4xl font-semibold ">Register</h1>
              <p className="mt-2 ">New here? Let's Get Started</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setvalidations({});
                setloading(true);
                registerHandler({ newData: formData })
                  .then((res) => console.log(res))
                  .catch((err) => setvalidations(err.response.data))
                  .finally(() => setloading(false));
              }}
              className="mt-8"
            >
              {formList.map((list, i): ReactNode => {
                return (
                  <div key={i} className="flex flex-col my-2">
                    <FormControl
                      placeholder={list?.placeholder}
                      inputType={list?.inputType}
                      name={list?.name}
                      value={list?.value}
                      onChange={(e) =>
                        setformData((prevData: any) => ({
                          ...prevData,
                          [list.name]: e.target.value,
                        }))
                      }
                      className=" focus:outline-[#6dc8c2]"
                    />
                    {validations?.errors?.[list.name] && (
                      <small className="text-red-500 mt-1 mx-1">
                        {validations?.errors?.[list.name].message}
                      </small>
                    )}
                  </div>
                );
              })}
              <Button
                disabled={loading}
                fullWidth={true}
                type={"submit"}
                className="mt-8 shadow-md disabled:bg-slate-500 bg-[#6dc8c2] text-white font-semibold hover:rounded-full px-8 py-4"
              >
                {loading ? "..." : "Sign Up"}
              </Button>
            </form>
            <span className="mt-8 ">
              Already have an account?{" "}
              <Link className="text-[#6dc8c2]" href={"/auth/login"}>
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
