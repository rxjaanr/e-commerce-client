import Button from "@/components/buttons/button";
import FormControl from "@/components/formControl/form.control";
import { loginHandler } from "@/libs/axios/config/api.config";
import connectMongoDB from "@/libs/mongoose/config/db.config";
import useAuthDataStore from "@/store/dataStore/userdata.store";
import useSessionStore from "@/store/sessionStore/session.store";
import useValidationStore from "@/store/validationStore/validations.store";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { shallow } from "zustand/shallow";

export default function LoginPage() {
  const router = useRouter();
  const [authData, setAuthData, removeAllData] = useAuthDataStore(
    (state) => [state.authData, state.setData, state.removeAllData],
    shallow
  );
  const [sessionData, setSessionData] = useSessionStore(
    (state) => [state.sessionData, state.setSessionData],
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

  const formList: Array<{
    placeholder: string;
    name: string;
    inputType: "text" | "email" | "password";
    value: string | undefined;
  }> = [
    {
      name: "email",
      placeholder: "Email",
      inputType: "email",
      value: authData.email || "",
    },
    {
      name: "password",
      placeholder: "Password",
      inputType: "password",
      value: authData.password || "",
    },
  ];

  useEffect(() => {
    if (sessionData.login_tokens !== "") {
      router.push("/dashboard");
    }
    console.log(process.env);
  }, [sessionData]);

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
              onSubmit={
                loginHandler(authData, (err: any, res: any) => {
                  removeAllValidations();
                  if (err) {
                    setValidations(err?.response?.data);
                  }
                  if (res) {
                    setSessionData(res?.data?.data);
                    removeAllValidations();
                    removeAllData();
                    router.push("/dashboard/");
                  }
                }) as any
              }
              className="mt-6"
            >
              {validations["message"] && (
                <div className="bg-[rgba(255,129,129,0.78)] px-4 py-2 text-white rounded border border-red-700">
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
                        setAuthData((prevState: typeof authData) => ({
                          ...prevState,
                          [list.name as any]: e.target.value,
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
                fullWidth={true}
                className="bg-white px-6 py-4 hover:shadow-md hover:rounded-full mt-8"
              >
                Sign In
              </Button>
            </form>

            <span className="mt-8">
              Don't have an account?{" "}
              <Link
                className="text-white font-medium"
                href={"/auth/register"}
                onClick={() => {
                  removeAllData();

                  removeAllValidations();
                }}
              >
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
