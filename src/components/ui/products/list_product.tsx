import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../utils/requests/products/product";
import { useEffect, useState } from "react";
import { iProducts } from "../../../utils/types/type";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ListProduct() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return getProducts().then((res) => res.data.result);
    },
  });

  // const queryClient = useQueryClient();

  // const deleteProduct = () => {
  //   const result = data.filter(
  //     (item: any) =>
  //       !checkedItems.find((checked: any) => checked.slug === item.slug)
  //   );
  //   setcheckedItems([]);
  //   return result;
  // };

  // const { mutate } = useMutation({
  //   mutationFn: deleteProduct,
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(["productList"], data);
  //     console.log("TerMutate");
  //   },
  // });

  const [checkedItems, setcheckedItems] = useState<any>([]);

  useEffect(() => {
    console.log(checkedItems);
    console.log(data);
  }, [checkedItems]);

  if (error) {
    return (
      <main>
        <h1>{error.message}</h1>
      </main>
    );
  }

  if (isLoading)
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );

  return (
    <main>
      <div className="flex justify-between items-center">
        <div className="flex gap-6 text-sm lg:text-base mx-4">
          <input
            checked={
              checkedItems.length === data.length && checkedItems.length > 1
            }
            type="checkbox"
            onChange={() =>
              setcheckedItems((items: { slug: string }[]) => {
                if (
                  ([...items].length !== data.length &&
                    [...items].length !== 0) ||
                  items.length === 0
                ) {
                  return data.map((d: iProducts) => d.slug);
                } else {
                  return [];
                }
              })
            }
          />
          <h1 className="py-2">
            {checkedItems.length > 0
              ? `${checkedItems.length} ${
                  checkedItems.length > 1 ? "Items" : "Item"
                } Selected`
              : "List Products"}
          </h1>
        </div>
        {checkedItems.length > 0 && (
          <div className="flex gap-2 items-center bg-black text-white px-3 py-2 item rounded-md cursor-pointer">
            <TrashIcon className="w-4 lg:w-5 cursor-pointer" />
            <h1
              className="text-sm lg:text-base max-sm:hidden"
              // onClick={() => mutate()}
            >
              Delete
            </h1>
          </div>
        )}
      </div>
      <table className="mt-6 w-full border border-slate-200 p-2 rounded-md text-left max-sm:text-center">
        <thead>
          <tr className="text-sm lg:text-base bg-slate-200 p-2 border border-slate-100 ">
            <th className="p-2 py-3 font-semibold tracking-wide px-4 opacity-0">
              Id
            </th>
            <th className="p-2 py-3 font-semibold tracking-wide ">Name</th>
            <th className="p-2 py-3 font-semibold tracking-wide max-lg:hidden">
              Category
            </th>
            <th className="p-2 py-3 font-semibold tracking-wide max-sm:hidden">
              Stock
            </th>
            <th className="p-2 py-3 font-semibold tracking-wide max-sm:hidden">
              Price
            </th>
            <th className="p-2 py-3 font-semibold tracking-wide">Option</th>
          </tr>
        </thead>
        <tbody className="!my-4">
          {data.map((product: iProducts, i: Number | any) => {
            return (
              <tr key={i}>
                <td
                  className={clsx(
                    "p-2 text-sm lg:text-base text-neutral-900 pl-4",
                    i <= data.length && "!pb-4",
                    i === 0 && "pt-4"
                  )}
                >
                  <input
                    checked={checkedItems.some(
                      (item: string) => item === product.slug
                    )}
                    type="checkbox"
                    onChange={() =>
                      setcheckedItems((items: string[]) => {
                        if ([...items].some((item) => item === product.slug)) {
                          return [...items].filter(
                            (item) => item !== product.slug
                          );
                        } else {
                          return [...items, product.slug];
                        }
                      })
                    }
                  />
                </td>
                <td
                  className={clsx(
                    "p-2 text-sm lg:text-base text-neutral-900",
                    i <= data.length && "!pb-4",
                    i === 0 && "pt-4"
                  )}
                >
                  {product.name}
                </td>
                <td
                  className={clsx(
                    "p-2 text-sm lg:text-base max-lg:hidden text-neutral-900 capitalize",
                    i <= data.length && "!pb-4",
                    i === 0 && "pt-4"
                  )}
                >
                  {product.category}
                </td>
                <td
                  className={clsx(
                    "p-2 text-sm lg:text-base text-neutral-900 max-sm:hidden",
                    i <= data.length && "!pb-4",
                    i === 0 && "pt-4"
                  )}
                >
                  {product.qty}
                </td>
                <td
                  className={clsx(
                    "p-2 text-sm lg:text-base text-neutral-900 max-sm:hidden",
                    i <= data.length && "!pb-4",
                    i === 0 && "pt-4"
                  )}
                >
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td
                  className={clsx(
                    "p-2 text-sm lg:text-base text-neutral-900",
                    i <= data.length && "!pb-4",
                    i === 0 && "pt-4"
                  )}
                >
                  <Link
                    to={product.slug}
                    className="flex text-left justify-left pl-6 sm:pl-4"
                  >
                    <PencilSquareIcon className="w-5" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
