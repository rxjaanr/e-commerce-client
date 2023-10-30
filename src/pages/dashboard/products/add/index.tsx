import FormControl from "@/components/formControl/form.control";
import TextArea from "@/components/formControl/textarea";
import { UploadDropzone } from "@uploadthing/react";
import { typeFileRouter } from "@/server/uploadthing";
import { useState, useRef, useEffect } from "react";
import Select from "@/components/formControl/select";
import Button from "@/components/buttons/button";
import Modal from "@/components/modals/modal";
import Sidebar from "@/components/navs/sidebar/sidebar";

export default function Add() {
  const myForm = useRef<HTMLFormElement>(null);
  const [isOpen, setisOpen] = useState<boolean>(false);
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
    name: string;
    description: string;
    category: string;
    price: string;
    stock: string;
    url: string;
  }
  const [formData, setFormData] = useState<iForm>({
    name: "",
    description: "",
    category: "Laptop",
    price: "",
    stock: "",
    url: "",
  });

  useEffect(() => {
    console.log(formData);
    function keyDown(e: any) {
      if (e.key === "Escape" && isOpen === true) {
        setisOpen(false);
      }
    }
    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  }, [formData, isOpen]);

  return (
    <main>
      <Modal isOpen={isOpen}>
        <div className="flex flex-col">
          <label className="px-6 py-3 bg-slate-200 border border-slate-300 w-full">
            Add Product Image
          </label>
          <UploadDropzone<typeFileRouter> endpoint="imageUploader" />
        </div>
      </Modal>
      <div className="py-24 px-8 md:px-12 lg:px-16 ">
        {/* IF Sidebar Was Created  add class lg:pl-64 */}
        <h1 className="text-3xl md:text-4xl font-semibold">Add Products</h1>
        <p>Add Product To Your Shop</p>
        <form
          ref={myForm}
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
          className=" flex mt-16 flex-wrap gap-4 w-full"
        >
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
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
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-[48%]">
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
            <Button
              fullWidth={true}
              className="border border-slate-300 py-5 mt-4 bg-sky-500 text-white font-medium"
              onclick={() => setisOpen((s) => !s)}
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
