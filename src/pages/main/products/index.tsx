import { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../utils/requests/products/product";
import { ListBulletIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import { iProducts } from "../../../utils/types/type";
import Product from "../../../components/ui/products/product";
import useSession from "../../../utils/hooks/useSession";

export default function Products() {
  const { user } = useSession();
  const [_, setSearchParams] = useSearchParams();
  const filterBox = useRef<HTMLDivElement>(null);
  const toggleBtn = useRef<HTMLDivElement>(null);
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [categories, setcategories] = useState<string[]>([]);
  const productCategories: string[] = [
    "gadget",
    "gaming",
    "fashion",
    "accessories",
  ];
  let category = queryString.parse(location.search).category;
  const { data } = useQuery({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      const response = await getProducts(
        category
          ? {
              params: {
                category: {
                  $in: category,
                },
              },
            }
          : {}
      );
      return response.data.result;
    },
  });

  useEffect(() => {
    if (category !== undefined) {
      if (typeof category === "string") {
        setcategories([category]);
      } else {
        setcategories([...(category as any)] || []);
      }
    }
  }, []);

  useEffect(() => {
    function clickHandler(e: Event) {
      if (
        !filterBox?.current?.contains(e.target as Node) &&
        !toggleBtn.current?.contains(e.target as Node)
      ) {
        setisOpen(false);
      }
    }
    window.addEventListener("click", clickHandler);

    return () => window.removeEventListener("click", clickHandler);
  }, []);

  return (
    <main className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:pt-12">
      <div>
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">Product</h1>
          <p className="text-neutral-600">Discover our products</p>
          <div
            ref={toggleBtn}
            onClick={() => setisOpen(true)}
            className="flex gap-2 fixed bottom-6 right-6 cursor-pointer bg-black rounded-md text-white px-3 py-2"
          >
            <ListBulletIcon className="w-4" />{" "}
            <span className="text-sm">Filter Products</span>{" "}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 md:gap-2 lg:gap-4 mt-12 md:mt-16">
          {data &&
            data.map((product: iProducts, i: number) => {
              return (
                <Product
                  key={i}
                  product={product}
                  user={user}
                  index={i}
                  queryKey={["products", category ?? "all"]}
                />
              );
            })}
        </div>
      </div>

      {/* Filter Box */}
      <div
        className={clsx(
          "w-screen fixed top-0 left-0 h-screen bg-[rgba(0,0,0,0.1)] ",
          !isOpen && "hidden"
        )}
        onClick={() => setisOpen(false)}
      ></div>
      <div
        ref={filterBox}
        className={clsx(
          "p-6 bg-white duration-300 ease-in-out z-[1] fixed bottom-0 max-md:left-0 w-screen md:w-72 md:right-0 md:top-0 md:pt-28",
          !isOpen && "max-md:translate-y-full md:translate-x-full"
        )}
      >
        <div className="flex justify-between border-b border-b-slate-300 pb-4 items-center">
          <h1 className=" font-medium">Filter Product</h1>
          <XMarkIcon
            onClick={() => setisOpen(false)}
            className="w-5 cursor-pointer"
          />
        </div>
        <h2 className="text-neutral-800 mt-4 md:mt-6">Category</h2>
        <div className="flex flex-wrap gap-6 md:gap-4 mt-5">
          {productCategories.map((category, i: number) => {
            return (
              <div
                key={i}
                className="flex gap-2 text-sm text-neutral-600 accent-purple-500 capitalize"
              >
                <input
                  onChange={() => {
                    if (categories.some((val) => val == category)) {
                      setcategories(
                        categories.filter((val) => val !== category)
                      );
                    } else {
                      setcategories([...categories, category]);
                    }
                  }}
                  checked={categories.some((val) => val === category)}
                  type="checkbox"
                  name=""
                  id={category}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            );
          })}
        </div>
        <div
          onClick={() => {
            setSearchParams(queryString.stringify({ category: categories }));
            setisOpen(false);
          }}
          className="bg-purple-600 text-white text-center px-4 py-2 mt-6 md:mt-8 rounded-md cursor-pointer"
        >
          Apply Filter
        </div>
      </div>
    </main>
  );
}
