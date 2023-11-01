import Button from "@/components/buttons/button";
import FormControl from "@/components/formControl/form.control";
import { loginHandler } from "@/libs/axios/config/api.config";
import useSessionStore from "@/store/sessionStore/session.store";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

export default function LoginPage() {
  interface iData {
    email: string;
    password: string;
  }
  const [formData, setformData] = useState<iData>({
    email: "",
    password: "",
  });
  const [validations, setvalidations] = useState<{} | any>({});
  const [loading, setloading] = useState<boolean>(false);
  const [sessionData, setSessionData] = useSessionStore(
    (state) => [state.sessionData, state.setSessionData],
    shallow
  );
  const router = useRouter();

  const formList: Array<{
    placeholder: string;
    name: string;
    inputType: "text" | "email" | "password";
    value?: string | undefined;
  }> = [
    {
      name: "email",
      placeholder: "Email",
      inputType: "email",
      value: formData.email || "",
    },
    {
      name: "password",
      placeholder: "Password",
      inputType: "password",
      value: formData.password || "",
    },
  ];

  return (
    <main>
      <div className="flex">
        <div className=" w-full  md:w-3/6 lg:w-2/5 px-8 max-lg:px-4 max-sm:px-0  py-4 h-screen bg-[#6dc8c2] ">
          <div className="flex flex-col px-8 max-sm:px-6 py-4 justify-center h-full ">
            <div className="text-white flex flex-col max-md:items-center">
              <h1 className="text-4xl font-semibold">Login</h1>
              <p className="mt-2">Sign in with your account</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setvalidations({});
                setloading(true);
                loginHandler({ newData: formData })
                  .then((res: any) => {
                    setSessionData(res.data.data);
                    router.push("/dashboard/");
                  })
                  .catch((err) => {
                    setvalidations(err.response.data);
                  })
                  .finally(() => setloading(false));
              }}
              className="mt-6"
            >
              {validations["message"] && (
                <div className="bg-[rgba(245,91,91,0.6)] px-6 py-4 text-white rounded shadow-md">
                  {validations["message"]}
                </div>
              )}
              {formList.map((list, i): ReactNode => {
                return (
                  <div key={i} className="flex flex-col my-3">
                    <FormControl
                      inputType={list?.inputType}
                      name={list.name}
                      placeholder={list.placeholder}
                      value={list.value}
                      onChange={(e) =>
                        setformData((prevState: typeof formData) => ({
                          ...prevState,
                          [list.name]: e.target.value,
                        }))
                      }
                      className="focus:outline-slate-400"
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
                className="bg-white disabled:bg-slate-200 disabled:text-slate-400 px-6 py-4 hover:shadow-md hover:rounded-full mt-8"
              >
                {loading ? "..." : "Sign In"}
              </Button>
            </form>

            <span className="mt-8">
              Don't have an account?{" "}
              <Link className="text-white font-medium" href={"/auth/register"}>
                Register Now
              </Link>{" "}
            </span>
          </div>
        </div>
        <div className="flex w-full md:w-3/6 lg:w-3/5 px-[8%] max-lg:px-4 py-4 h-screen max-md:hidden">
          <img src="/assets/svg/kurir.svg" alt="kurir" />
        </div>
      </div>
    </main>
  );
}
