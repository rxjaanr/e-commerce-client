import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { ProductType } from "../../../../utils/types/type";
import Input from "../../../../components/forms/input/input";
import Button from "../../../../components/ui/button/button";
import { toast } from "sonner";
import {
  createProduct,
  updateProduct,
} from "../../../../utils/requests/products/product";
import useSession from "../../../../utils/hooks/useSession";
import clsx from "clsx";
import { uploadImage } from "../../../../utils/requests/images/images";

export default function NewProduct() {
  const { user } = useSession();
  const [formData, setFormData] = useState(new FormData());
  const [loading, setloading] = useState<boolean>(false);
  const [validations, setValidations] = useState<any>({});
  const [images, setImages] = useState<File[]>([]);
  const [productData, setProductData] = useState<ProductType>({
    name: "",
    slug: "",
    description: "",
    category: "laptop",
    price: 0,
    qty: 0,
    images: [],
    discount: 0,
  });
  const [imageUrls, setImageUrls] = useState<{ url: string }[]>([]);

  useEffect(() => {
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("image", image);
    });
    setFormData(newForm);
  }, [images]);

  const preventNonNumberInput = (e: KeyboardEvent) => {
    if (isNaN(parseInt(e.key))) {
      e.preventDefault();
    }
  };

  const submitHandler = async (e: Event) => {
    e.preventDefault();
    setloading(true);
    if (imageUrls.length <= 0) {
      setloading(false);
      return toast.error("Image is required");
    }
    createProduct({ data: productData, token: user.token })
      .then(async (res) => {
        const imageRes = await uploadImage({
          data: formData,
          token: user.token,
        });
        updateProduct({
          slug: res.data.result.slug,
          data: { images: imageRes.data.data },
          token: user.token,
        })
          .then((result) => {
            console.log(result);
            setProductData({
              name: "",
              price: 0,
              description: "",
              qty: 0,
              category: "laptop",
              images: [],
              slug: "",
              discount: 0,
            });
            setFormData(new FormData());
            setImageUrls([]);
            setImages([]);
            return toast.success("Product Created!");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setValidations(err.response.data.error);
        }
      })
      .finally(() => setloading(false));
  };

  return (
    <main>
      <div className="mb-8">
        <h1 className="font-semibold text-3xl ">New Product</h1>
        <p className="text-neutral-700"> Create new product. </p>
      </div>
      <form className="lg:flex gap-2" onSubmit={submitHandler as any}>
        <div className="flex flex-col lg:w-1/2">
          <Input
            value={productData.name}
            placeholder="Product Name"
            className="my-1"
            onChange={(e: any) =>
              setProductData((data) => ({ ...data, ["name"]: e.target.value }))
            }
          >
            {validations.errors && validations.errors["name"] && (
              <small className="text-red-500">
                {validations.errors["name"].message}
              </small>
            )}
          </Input>
          <Input
            value={productData.slug}
            onChange={(e: any) =>
              setProductData((data) => ({ ...data, ["slug"]: e.target.value }))
            }
            placeholder="Product Slug"
            className="my-1"
          >
            {validations.errors && validations.errors["slug"] && (
              <small className="text-red-500">
                {validations.errors["slug"].message}
              </small>
            )}
          </Input>
          <Input
            onKeyPress={preventNonNumberInput}
            value={productData.discount || ""}
            onChange={(e: any) =>
              setProductData((data) => ({
                ...data,
                ["discount"]: parseInt(e.target.value),
              }))
            }
            placeholder="Discount (Optional)"
            className="my-1"
          ></Input>
          <div className="flex flex-col max-lg:mb-2 flex-grow">
            {validations.errors && validations.errors["description"] && (
              <small className="text-red-500 ">
                {validations.errors["description"].message}
              </small>
            )}
            <textarea
              value={productData.description}
              cols={30}
              rows={10}
              className={clsx(
                "flex flex-grow mb-0 w-full py-2 px-4 border border-slate-300 focus:outline-none my-2"
              )}
              placeholder="Product Description"
              onChange={(e: any) =>
                setProductData((data) => ({
                  ...data,
                  ["description"]: e.target.value,
                }))
              }
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col lg:pt-1 lg:w-1/2">
          <select
            name=""
            id=""
            className={clsx(
              "w-full px-4 py-3 bg-white border border-slate-300 my-1"
            )}
            onChange={(e: any) =>
              setProductData((data) => ({
                ...data,
                ["category"]: e.target.value,
              }))
            }
            value={productData.category}
          >
            <option disabled>Categories</option>
            <option value="gadget">Gadget</option>
            <option value="gaming">Gaming</option>
            <option value="fashion">Fashion</option>
            <option value="accessories">Accessories</option>
          </select>
          <div className="flex gap-1 justify-between ">
            <Input
              className={clsx(
                "w-[49%]",
                validations.errors && validations.errors["name"] && "lg:mt-5"
              )}
              onKeyPress={preventNonNumberInput}
              placeholder="Price (Rp)"
              value={productData.price || ""}
              onChange={(e) => {
                setProductData((data) => ({
                  ...data,
                  ["price"]: parseInt(e.target.value),
                }));
              }}
            >
              {validations.errors && validations.errors["price"] && (
                <small className="text-red-500 ">
                  {validations.errors["price"].message}
                </small>
              )}
            </Input>
            <Input
              className={clsx(
                "w-[49%]",
                validations.errors && validations.errors["name"] && "lg:mt-5"
              )}
              onKeyPress={preventNonNumberInput}
              placeholder="qty"
              value={productData.qty || ""}
              onChange={(e) => {
                setProductData((data) => ({
                  ...data,
                  ["qty"]: parseInt(e.target.value),
                }));
              }}
            >
              {validations.errors && validations.errors["qty"] && (
                <small className="text-red-500 ">
                  {validations.errors["qty"].message}
                </small>
              )}
            </Input>
          </div>
          {/* Image Uploader */}
          <div className="p-4 border border-slate-300 flex flex-col my-2 lg:flex-grow lg:mt-3">
            <input
              id="file"
              type="file"
              formEncType="multipart/form-data"
              placeholder="Browse Image"
              hidden
              onChange={(e: any) => {
                const file = e.target.files[0];
                const url = URL.createObjectURL(file as any);
                if (imageUrls.length < 4 && images.length < 4) {
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
                } else {
                  toast.error("Max Image Is 3");
                }
              }}
            />
            <label
              htmlFor="file"
              className="px-3 py-2 cursor-pointer bg-[#09090b] text-white rounded-md flex items-center justify-center gap-2 max-md:text-sm"
            >
              <ArrowUpCircleIcon className="w-4 md:w-5" />
              Choose Images
            </label>

            <div className="flex flex-wrap mt-4 mb-1 gap-1 flex-grow items-center">
              {imageUrls.length > 0 ? (
                imageUrls.map((image, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col w-[49%] sm:w-[32%] lg:w-[49%] items-center justify-between p-2 border border-slate-200"
                    >
                      <img
                        className=" w-full aspect-square object-cover rounded-md"
                        src={image.url}
                      />
                      <button
                        onClick={() => {
                          setImages(images.filter((_, index) => index !== i));
                          setImageUrls(
                            imageUrls.filter((i) => i.url !== image.url)
                          );
                        }}
                        className="max-sm:text-sm lg:max-xl:text-sm px-3 py-2 bg-[#09090b] text-white rounded-md w-2/3 lg:w-full mt-4 mb-2 md:mb-3"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center w-full">
                  <h1 className="text-neutral-700">No Images Selected</h1>
                </div>
              )}
            </div>
          </div>
          <div className="lg:mt-auto">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-black rounded-md text-white"
            >
              {loading ? "...." : "Submit"}
            </Button>
          </div>
        </div>
      </form>

      {/* End Image Uploader */}
    </main>
  );
}
