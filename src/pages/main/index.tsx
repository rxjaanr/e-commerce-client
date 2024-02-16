import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Product from "../../components/ui/products/product";
import { useQuery } from "@tanstack/react-query";
import { iProducts } from "../../utils/types/type";
import { getProducts } from "../../utils/requests/products/product";
import Button from "../../components/ui/button/button";
import macbookImg from "/images/macbook.jpg";
import useSession from "../../utils/hooks/useSession";

export default function Home() {
  const { user } = useSession();
  const useHotSalesQuery = useQuery({
    queryKey: ["hot-sales"],
    queryFn: async () => {
      const response = await getProducts({
        params: {
          discount: {
            $gt: 0,
          },
        },
      });
      return response.data.result.slice(0, 4);
    },
  });

  const { isLoading, data } = useHotSalesQuery;
  const { hash } = useLocation();

  useEffect(() => {
    if (!isLoading && hash) {
      document.querySelector(hash)?.scrollIntoView();
    }
  }, [isLoading, hash]);

  if (isLoading) {
    return <main></main>;
  }

  return (
    <main className="py-8 px-4 md:px-8">
      <div className="flex flex-wrap max-md:justify-center py-4 md:py-8 md:mt-12 lg:mt-6 xl:mt-4 lg:px-4 xl:px-8 mb-28">
        <div className="mt-8  md:flex md:flex-col md:items-start lg:mt-0 md:justify-center max-md:text-center md:w-2/3 lg:w-1/2  xl:pl-8">
          <h1 className="text-4xl md:text-[2.65rem] lg:text-5xl font-semibold max-md:lowercase">
            We have some{" "}
          </h1>
          <h1 className="text-4xl md:text-[2.65rem] lg:text-5xl font-semibold">
            <span className="!font-bold text-purple-600"> cool things</span> for
            you
          </h1>
          <p className="text-neutral-600 mt-2 max-sm:px-6 sm:max-md:px-6 md:pr-8 lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
            pariatur! Nemo, ad!
          </p>
          <Button className="mt-8 bg-purple-800 text-white rounded-md px-6 font-medium">
            Shop now
          </Button>
        </div>
        <div className="px-4 md:w-1/3 lg:w-1/2 max-md:mt-8 flex justify-center">
          <img
            src={macbookImg}
            className="sm:max-md:w-3/4 lg:w-[30rem] lg:h-[25rem] object-cover md:max-lg:scale-125 lg:translate-x-12"
            alt="macbook"
          />
        </div>
      </div>
      {/* Product Hot Sales */}
      <div
        id="hot-sales"
        className="flex flex-col py-12 pt-32 md:pt-36 sm:max-md:px-8 md:pb-24"
      >
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Hot Sales</h1>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-4 xl:gap-6 pt-16 justify-center">
          {data?.length > 0 &&
            data.map((product: iProducts, i: number) => {
              return (
                <Product
                  queryKey={["hot-sales"]}
                  key={i}
                  index={i}
                  product={product}
                  user={user.token !== "" ? user : null}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
