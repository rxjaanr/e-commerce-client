import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { ProductType } from "../../../../utils/types/type";

export default function NewProduct() {
  const [form, setForm] = useState(new FormData());
  const [images, setImages] = useState<File[]>([]);
  const [productData, setProductData] = useState<ProductType>({
    name: "",
    slug: "",
    desciption: "",
    category: "",
    price: 0,
    qty: 0,
    image: [],
  });
  const [imageUrls, setImageUrls] = useState<{ url: string }[]>([]);
  useEffect(() => {
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("image", image);
    });
    setForm(newForm);
  }, [images]);
  return (
    <main>
      <div className="mb-8">
        <h1 className="font-semibold text-3xl ">New Product</h1>
        <p className="text-neutral-700"> Create new product. </p>
      </div>
      {/* Image Uploader */}
      <div className="p-4 border border-slate-200 flex flex-col">
        <input
          id="file"
          type="file"
          formEncType="multipart/form-data"
          placeholder="Browse Image"
          hidden
          onChange={(e: any) => {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file as any);
            setImageUrls(
              (data) =>
                [
                  ...data,
                  {
                    url: url,
                  },
                ] as any
            );
            setImages((data) => [...data, file]);
          }}
        />
        <label
          htmlFor="file"
          className="px-3 py-2 cursor-pointer bg-[#09090b] text-white rounded-md flex items-center justify-center gap-2 max-md:text-sm"
        >
          <ArrowUpCircleIcon className="w-4 md:w-5" />
          Choose Images
        </label>
        {imageUrls.length > 0 && (
          <div className="flex flex-wrap mt-4 mb-1 gap-1">
            {imageUrls.map((image, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col w-[49%] sm:w-[32%] items-center justify-between p-2 border border-slate-200"
                >
                  <img
                    className=" w-full aspect-square object-cover rounded-md"
                    src={image.url}
                  />
                  <button
                    onClick={() => {
                      setImages(images.filter((image, index) => index !== i));
                      setImageUrls(
                        imageUrls.filter((i) => i.url !== image.url)
                      );
                    }}
                    className="max-sm:text-sm px-3 py-2 bg-[#09090b] text-white rounded-md w-2/3 mt-4 mb-2 md:mb-3"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* End Image Uploader */}
    </main>
  );
}
