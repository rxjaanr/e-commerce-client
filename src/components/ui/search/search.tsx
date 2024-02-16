import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Modal from "../modal/modal";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { getProducts } from "../../../utils/requests/products/product";
import { iProducts } from "../../../utils/types/type";
import { Link } from "react-router-dom";
import useDebounce from "../../../utils/hooks/useDebounce";

export default function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");
  const search = useDebounce(query, 1000);
  const [loading, setloading] = useState<boolean>(false);
  const [data, setData] = useState<iProducts[] | any>([]);

  const searchProducts = async (query: string) => {
    const response = await getProducts({
      params: {
        name: {
          $regex: `${query}`,
          $options: "i",
        },
      },
    });
    if (response) {
      return response.data.result;
    }
  };

  useEffect(() => {
    (async () => {
      if (search !== "") {
        setloading(true);
        try {
          const data = await searchProducts(search);
          setData(data);
          console.log("DATA : ", data);
        } catch (error) {
          console.log(error);
        } finally {
          setloading(false);
        }
      }
    })();
  }, [search]);

  // useEffect(() => {
  //   console.log(data);
  //   console.log(search);
  //   console.log("query :", query);
  // }, [data, search, query]);

  useEffect(() => {
    if (query.length > 0) {
      setloading(true);
    }
    if (query === "") {
      setData([]);
      setloading(false);
    }
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      input.current?.focus();
    } else {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[40%] p-2 bg-white rounded-md border border-slate-200 shadow flex flex-col z-[3]">
            <div className="flex border border-slate-300 px-3 rounded-sm ">
              <MagnifyingGlassIcon className="w-6 mr-1" />
              <input
                onChange={(e) => setQuery(e.target.value)}
                ref={input}
                className="flex p-2 focus:outline-none flex-grow bg-transparent"
                placeholder="Search products"
              ></input>
            </div>
            {loading && (
              <div className="pt-2 py-2 flex flex-col gap-2">
                <div className="bg-slate-200 h-7 w-full"></div>
                <span className="bg-slate-200 h-4 w-1/4"></span>
              </div>
            )}
            {!loading && data && data.length > 0 && (
              <div className="pt-2">
                {data.map((product: iProducts, i: number) => {
                  return (
                    <Link
                      onClick={() => setIsOpen(false)}
                      to={"/products/" + product.category + "/" + product.slug}
                      key={i}
                      className="py-3 px-4 border border-slate-100 flex flex-col"
                    >
                      <h1 className="text-sm md:text-base font-medium">
                        {product.name}
                      </h1>
                      <p className="text-xs md:text-sm text-neutral-500 capitalize">
                        {product.category}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
            {!loading && data === undefined && query !== "" && (
              <div className=" px-4 border border-slate-200 text-center py-6">
                <h1 className="text-sm text-neutral-700">Products Not Found</h1>
              </div>
            )}
          </div>
        </Modal>
      )}

      <div
        onClick={() => setIsOpen(true)}
        className={clsx(
          "rounded-full flex items-center border border-slate-300 p-2 md:pl-3 cursor-pointer hover:bg-slate-50"
        )}
      >
        <MagnifyingGlassIcon className="w-6" />
        <h1 className="text-neutral-500 max-md:hidden mx-2 mr-4 text-[0.9rem]">
          Search...
        </h1>
        <div className="flex text-[0.8rem] mx-2 max-lg:hidden font-semibold text-neutral-500">
          <span className="p-1 border border-slate-300 rounded-md px-2 bg-slate-100 text-xs shadow-sm">
            CTRL
          </span>
          <span className="p-1">+</span>
          <span className="p-1 border border-slate-300 rounded-md px-2 bg-slate-100 text-xs shadow-sm">
            K
          </span>
        </div>
      </div>
    </>
  );
}
