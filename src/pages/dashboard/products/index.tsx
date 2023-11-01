import Sidebar from "@/components/navs/sidebar/sidebar";
import {
  deleteProduct,
  getAllProductHandler,
} from "@/libs/axios/config/api.config";
import useSessionStore from "@/store/sessionStore/session.store";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Index() {
  const loginTokens = useSessionStore(
    (state) => state.sessionData.login_tokens
  );
  const [products, setproducts] = useState<any[]>([]);

  const getAllProduct = async () => {
    try {
      const res: any = await getAllProductHandler({
        token: loginTokens,
      })
        .then((res: any) => res.data.data)
        .catch((err) => err);
      if (res) {
        setproducts(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProduct();
    return () => setproducts([]);
  }, []);

  return (
    <main>
      <Sidebar />
      <div className="flex font-normal flex-col pt-36 lg:pt-44 pb-32 px-4 sm:px-8 md:px-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold px-4">
            Product List{" "}
          </h1>
        </div>
        {products.length !== 0 ? (
          <div className="flex flex-col gap-2 mt-16 border border-slate-200 rounded-md shadow-md">
            <table className="text-center">
              <thead className="border border-slate-300">
                <tr>
                  <th className="px-4">Id</th>
                  <th>Name</th>
                  <th className="max-md:hidden">Price</th>
                  <th className="max-md:hidden">Stock</th>
                  <th className="max-lg:hidden">Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 &&
                  products.map((product, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{product.name}</td>
                        <td className="max-md:hidden">
                          {product.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                        <td className="max-md:hidden">{product.stock}</td>
                        <td className="max-lg:hidden lg:flex justify-center">
                          <img src={product.url} className="w-12" />
                        </td>
                        <td>
                          <div className="flex gap-4 max-md:gap-2 justify-center">
                            <Link
                              href="#"
                              onClick={() => {
                                setproducts([]);
                                deleteProduct({
                                  id: product._id,
                                  token: loginTokens,
                                })
                                  .then((res) => {
                                    console.log(res);
                                    getAllProduct();
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                            >
                              <TrashIcon className="w-10 p-2 bg-red-500 text-white rounded-md" />
                            </Link>
                            <Link href={"#"}>
                              <PencilSquareIcon className="w-10 p-2 bg-sky-500 text-white rounded-md" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-16 px-4">
            <h1 className="text-xl">Fetching Data...</h1>
          </div>
        )}
      </div>
    </main>
  );
}
