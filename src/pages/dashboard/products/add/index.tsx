import FormControl from "@/components/formControl/form.control";
import TextArea from "@/components/formControl/textarea";
import { UploadDropzone } from "@uploadthing/react";
import { typeFileRouter } from "@/server/uploadthing";
import { useState, useRef, useEffect } from "react";
import Select from "@/components/formControl/select";

export default function Add() {
  const myForm = useRef<HTMLFormElement>(null);
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

  const [filled, setfilled] = useState<boolean>(false);

  useEffect(() => {
    console.log(formData);
    const { url, ...formDataWithoutUrl } = formData;
    const isFilled = Object.values(formDataWithoutUrl).every(
      (value) => value !== ""
    );
    setfilled(isFilled);
  }, [formData]);

  return (
    <main className="py-24 px-8 md:px-16  lg:px-28 ">
      {/* IF Sidebar Was Created  add class lg:pl-64 */}
      <h1 className="text-3xl md:text-4xl font-semibold">Add Products</h1>
      <p>Add Product To Your Shop</p>
      <form ref={myForm} className="container flex mt-16 flex-wrap gap-4 ">
        <div className="flex flex-col gap-2 w-full lg:w-1/2">
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
          <Select
            name="category"
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
          <TextArea
            placeholder="Product Description"
            className="rounded-sm focus:outline-slate-900 focus:outline w-full flex-grow"
            name="description"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2 w-full lg:w-[45%]">
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
          <UploadDropzone<typeFileRouter>
            endpoint="imageUploader"
            appearance={{
              button: {
                display: filled ? "flex" : "none",
              },
            }}
          />
          <label className="text-red-500 text-[0.85rem] flex-grow">
            Upload Button Visible When All Inputs Filled
          </label>
        </div>
      </form>
    </main>
  );
}
