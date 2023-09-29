import Button from "@/components/buttons/button";
import FormControl from "@/components/formControl/form.control";
import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import useAuthDataStore from "@/store/dataStore/userdata.store";
import useValidationStore from "@/store/validationStore/validations.store";
import { registerHandler } from "@/libs/axios/config/api.config";
import Modal from "@/components/modals/modal";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import useSessionStore from "@/store/sessionStore/session.store";

export default function RegisterPage() {
  const [authData, setData, removeAllData] = useAuthDataStore(
    (state) => [state.authData, state.setData, state.removeAllData],
    shallow
  );

  const [validations, setValidations, removeAllValidations] =
    useValidationStore(
      (state) => [
        state.validations,
        state.setValidations,
        state.removeAllValidations,
      ],
      shallow
    );

  const [isOpen, setisOpen] = useState<boolean>(false);

  const router = useRouter();
  const sessionData = useSessionStore((state) => state.sessionData);

  interface iForm {
    placeholder: string;
    name: string;
    inputType: "text" | "email" | "password";
    value: string | undefined;
  }

  const formList: Array<iForm> = [
    {
      placeholder: "Name",
      name: "name",
      inputType: "text",
      value: authData.name || "",
    },
    {
      placeholder: "Address",
      name: "address",
      inputType: "text",
      value: authData.address || "",
    },
    {
      placeholder: "Email",
      name: "email",
      inputType: "email",
      value: authData.email || "",
    },
    {
      placeholder: "Password",
      name: "password",
      inputType: "password",
      value: authData.password || "",
    },
    {
      placeholder: "Bank Account (optional)",
      name: "bank_account",
      inputType: "text",
      value: authData.bank_account || "",
    },
  ];

  useEffect(() => {
    if (sessionData.login_tokens !== "") {
      router.push("/404");
    }
  }, [sessionData]);

  return (
    <main>
      {/* Modal */}
      <Modal
        message={"Register Success"}
        subMessage={"Let's explore our product"}
        isOpen={isOpen}
        onclick={() => {
          setisOpen(false);
          removeAllData();
          removeAllValidations();
          router.push("/auth/login");
        }}
      />

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
              className="mt-8"
              onSubmit={
                registerHandler(authData, async (err: any, res: any) => {
                  if (err) {
                    setValidations(err?.response?.data);
                  }
                  if (res) {
                    setisOpen(true);
                  }
                }) as any
              }
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
                        setData((prevData: any) => ({
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
                fullWidth={true}
                type={"submit"}
                className="mt-8 shadow-md bg-[#6dc8c2] text-white font-semibold hover:rounded-full px-8 py-4"
              >
                Sign Up
              </Button>
            </form>
            <span className="mt-8 ">
              Already have an account?{" "}
              <Link
                className="text-[#6dc8c2]"
                href={"/auth/login"}
                onClick={() => {
                  removeAllData();
                  removeAllValidations();
                }}
              >
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
