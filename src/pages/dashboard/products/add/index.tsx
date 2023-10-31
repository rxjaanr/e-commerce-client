import FormControl from "@/components/formControl/form.control";
import TextArea from "@/components/formControl/textarea";
import { UploadDropzone } from "@uploadthing/react";
import { typeFileRouter } from "@/server/uploadthing";
import { useState, useRef, useEffect } from "react";
import Select from "@/components/formControl/select";
import Button from "@/components/buttons/button";
import Modal from "@/components/modals/modal";
import Sidebar from "@/components/navs/sidebar/sidebar";
import {
  addProductHandler,
  updateProductHandler,
} from "@/libs/axios/config/api.config";
import useSessionStore from "@/store/sessionStore/session.store";
import Link from "next/link";

export default function Add() {
  const myForm = useRef<HTMLFormElement>(null);
  const loginTokens = useSessionStore(
    (state) => state.sessionData.login_tokens
  );
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [validations, setvalidations] = useState<any>({});
  const categories = [
    {
      name: "Laptop",
    },
    {
      name: "Tablet",
    },
    {
      name: "HP",
    },
    {
      name: "Keyboard",
    },
  ];
  interface iForm {
    id?: string;
    name: string;
    description: string;
    category: string;
    price: string;
    stock: string;
    url?: string;
  }
  const [formData, setFormData] = useState<iForm>({
    name: "",
    description: "",
    category: "Laptop",
    price: "",
    stock: "",
  });

  useEffect(() => {
    function keyDown(e: any) {
      if (e.key === "Escape" && isOpen === true) {
        setisOpen(false);
      }
    }
    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  }, [formData, isOpen]);

  useEffect(() => {
    if (formData.url !== "" && success !== true) {
      (() => {
        updateProductHandler({
          newData: formData,
          token: loginTokens,
          id: formData.id as string,
        })
          .then((res) => {
            setSuccess(true);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setloading(false);
          });
      })();
    }
  }, [formData.url]);
  return (
    <main>
      <Sidebar />
      <Modal isOpen={isOpen}>
        {loading ? (
          <div className="flex justify-center items-center p-8">
            Loading....
          </div>
        ) : success ? (
          <div className="flex justify-center items-center p-10 flex-col">
            <span className="text-xl font-medium">Success Add Product!</span>
            <Link
              href={"/dashboard/products"}
              className=" mt-12 px-6 py-4 bg-sky-600 border text-white border-slate-50 shadow-md rounded-md"
            >
              Back To Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            <label className="px-6 py-3 bg-slate-200 border border-slate-300 w-full">
              Add Product Image
            </label>
            <UploadDropzone<typeFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={async (res: any) => {
                setFormData((prevState) => ({
                  ...prevState,
                  ["url"]: res[0].url,
                }));
                setloading(true);
              }}
            />
          </div>
        )}
      </Modal>
      <div className="pt-40 pb-32 px-8 md:px-12 lg:px-16 ">
        {/* IF Sidebar Was Created  add class lg:pl-64 */}
        <h1 className="text-3xl md:text-4xl font-semibold">Add Products</h1>
        <p>Add Product To Your Shop</p>
        <form
          ref={myForm}
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
          className=" flex mt-8 flex-wrap gap-4 w-full"
        >
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <div className="flex flex-col">
              <FormControl
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="name"
                placeholder="Product Name"
              />
              {validations?.["name"] && (
                <small className="text-red-500 mt-1 mx-1">
                  {validations["name"]["message"]}
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <TextArea
                placeholder="Product Description"
                className="rounded-sm focus:outline-slate-900 focus:outline w-full "
                name="description"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {validations["description"] && (
                <small className="text-red-500 mt-1 mx-1">
                  {validations["description"]["message"]}
                </small>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-[48%]">
            <div className="flex flex-col">
              <label className="px-6 py-3 bg-slate-200 border border-slate-300">
                Categories
              </label>
              <Select
                name="category"
                className="rounded-b-sm"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                {categories.map((category, index) => {
                  return (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-col">
              <FormControl
                name="price"
                placeholder="Price ($)"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {validations["price"] && (
                <small className="text-red-500 mt-1 mx-1">
                  {validations["price"]["message"]}
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <FormControl
                name="stock"
                placeholder="Stock"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {validations["stock"] && (
                <small className="text-red-500 mt-1 mx-1">
                  {validations["stock"]["message"]}
                </small>
              )}
            </div>
            <Button
              disabled={loading}
              fullWidth={true}
              className="border border-slate-300 py-5 mt-8 bg-sky-500 text-white font-medium"
              onclick={() => {
                setloading(true);
                setvalidations({});
                addProductHandler({ newData: formData, token: loginTokens })
                  .then((res: any) => {
                    setisOpen(true);
                    setFormData((prevState) => ({
                      ...prevState,
                      ["id"]: res.data.message._id,
                    }));
                  })
                  .catch((err) => {
                    setvalidations(err.response.data.message.errors);
                  })
                  .finally(() => setloading(false));
              }}
            >
              {loading ? "...." : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
