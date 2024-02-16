import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../../utils/requests/products/product";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { discountedPrice } from "../../../../components/ui/products/product";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import love from "/svg/heart.svg";

export default function ProductDetail() {
  let [counter, setcounter] = useState<number>(1);
  const [selectedImages, setSelectedImages] = useState<string>("");
  const [popupOpen, setpopupOpen] = useState<boolean>(false);
  const { slug } = useParams();
  const getOneProduct = async () => {
    const response = await getProduct(slug as string);
    if (response) {
      return response.data.result;
    }
  };
  const useGetProduct = () => {
    return useQuery({ queryKey: ["product", slug], queryFn: getOneProduct });
  };
  const { data, isLoading } = useGetProduct();

  useEffect(() => {
    if (data !== null) {
      setSelectedImages(data?.images[0].url);
    }
  }, [data]);

  if (isLoading) return null;

  return (
    <main className="px-4 sm:px-8  py-4 sm:py-6 lg:px-12 xl:px-16 pb-20 sm:pb-24 md:pb-8 xl:py-6">
      <div className="md:flex relative">
        <div className="flex flex-col h-fit lg:flex-row-reverse md:sticky md:top-0 md:left-0 md:mt-6 md:pr-4">
          <div className=" aspect-square md:p-0 md:w-[20rem] lg:w-[23rem] xl:w-[25rem]">
            <img
              src={selectedImages}
              alt=""
              className="w-full h-full rounded-sm object-cover aspect-square"
            />
          </div>
          <div className="flex lg:flex-col lg:items-start lg:p-0 lg:mt-0 lg:mr-6 gap-4 items-center mt-6 border-b pb-6 border-b-slate-300 md:border-0 md:border-red-600">
            {data.images.map((image: { url: string }, i: number) => {
              return (
                <div key={i} className="aspect-square w-20 sm:w-24">
                  <img
                    src={image.url}
                    alt=""
                    onClick={() => setSelectedImages(image.url)}
                    className={clsx(
                      "w-full h-full object-cover border rounded-sm",
                      image.url === selectedImages && "border border-slate-400 "
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-5 sm:pt-8 md:overflow-scroll md:w-1/2 md:py-4 md:pl-6 md:flex-grow md:h-[80vh]">
          <h1 className="font-semibold text-xl text-[1.10rem] sm:text-xl md:text-xl">
            {data.name}
          </h1>
          <p className="text-sm capitalize text-neutral-600 sm:text-base">
            {data.category}
          </p>
          <div className="w-full flex justify-between items-center xl:w-[35rem] mt-6 ">
            <h1 className="font-medium sm:text-xl text-red-600">
              {
                discountedPrice(data.price, data.discount)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .split(",")[0]
              }
            </h1>
            <h1 className="p-2 text-sm rounded-md bg-green-200 text-green-700">
              Stock : {data.qty}
            </h1>
          </div>
          <div className=" border-0 border-t-slate-300 mt-6 py-2 ">
            <h1 className="py-2 sm:max-md:text-xl">Description : </h1>
            <p className=" text-neutral-500">{data.description}</p>
          </div>
          <div className="max-md:fixed z-[999] max-md:bottom-0 max-md:left-0 max-md:w-screen  xl:w-[35rem] px-3 py-4 lg:px-4 sm:max-md:px-8 md:mt-12 items-center max-md:bg-white border border-slate-300 rounded-md">
            <h1 className="font-medium mb-3 text-[1.15rem] max-md:hidden">
              Add To Cart
            </h1>
            <div className="flex py-1 max-md:hidden justify-between items-center mb-8 border-y border-y-neutral-300">
              <h1 className="text-neutral-700">Quantity</h1>
              <div className="flex items-center  rounded-sm ">
                <MinusIcon
                  className={clsx(
                    "w-6 p-1 cursor-pointer",
                    counter <= 1 && "!cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (counter > 1) {
                      setcounter((count) => count - 1);
                    }
                  }}
                />
                <span className="p-2 h-full px-3 font-medium ">{counter}</span>
                <PlusIcon
                  className={clsx(
                    "w-6 p-1 cursor-pointer",
                    counter === data.qty && "!cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (counter < data.qty) {
                      setcounter((count) => count + 1);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex md:items-end items-center">
              <div className="max-md:hidden">
                <h1 className="text-sm text-neutral-600">Total Price</h1>
                <h1 className="font-medium text-red-500 lg:text-xl">
                  {
                    discountedPrice(data.price * counter, data.discount)
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                      .split(",")[0]
                  }
                </h1>
              </div>
              <span className="w-11 p-[0.63rem] md:max-lg:w-9 md:max-lg:p-2 px-3 flex items-center border border-slate-400 rounded-md ml-auto">
                <img src={love} alt="" className="w-full" />
              </span>
              <button
                onClick={() => {
                  !popupOpen && setpopupOpen(true);
                }}
                className="bg-black md:hidden flex items-center text-white p-2 px-3 rounded-md ml-2"
              >
                Add to cart
              </button>
              <button className="bg-black max-md:hidden md:max-lg:text-sm flex items-center text-white p-2 px-3 rounded-md ml-2">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Popup */}

      <div
        className={clsx(
          "w-screen fixed top-0 left-0 h-screen bg-[rgba(0,0,0,0.15)] md:hidden",
          !popupOpen && "hidden"
        )}
        onClick={() => setpopupOpen(false)}
      ></div>

      <div
        className={clsx(
          "fixed md:hidden bottom-0 left-0 px-5 py-6 sm:px-8 bg-white flex w-full flex-col pb-24 transition-all duration-300 ease-in-out rounded-2xl",
          popupOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex justify-between items-center">
          <h1 className=" text-[1.10rem] font-medium">Add to Cart</h1>
          <XMarkIcon
            className="w-6 text-neutral-500 cursor-pointer"
            onClick={() => setpopupOpen(false)}
          />
        </div>
        <div className="flex  py-1 mt-6 justify-between items-center mb-6 border-y border-y-neutral-300">
          <h1 className="text-neutral-700 max-sm:text-sm">Quantity</h1>
          <div className="flex items-center  rounded-sm ">
            <MinusIcon
              className={clsx(
                "w-6 p-1 cursor-pointer",
                counter <= 1 && "!cursor-not-allowed"
              )}
              onClick={() => {
                if (counter > 1) {
                  setcounter((count) => count - 1);
                }
              }}
            />
            <span className="p-2 h-full px-3 font-medium ">{counter}</span>
            <PlusIcon
              className={clsx(
                "w-6 p-1 cursor-pointer",
                counter === data.qty && "!cursor-not-allowed"
              )}
              onClick={() => setcounter((count) => count + 1)}
            />
          </div>
        </div>
        <div className="flex md:items-end items-center">
          <div className="">
            <h1 className="text-sm text-neutral-600">Total Price</h1>
            <h1 className="font-medium text-red-500 text-xl">
              {
                discountedPrice(data.price * counter, data.discount)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .split(",")[0]
              }
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}
