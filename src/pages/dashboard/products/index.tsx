import Sidebar from "@/components/navs/sidebar/sidebar";
import { getAllProductHandler } from "@/libs/axios/config/api.config";
import useSessionStore from "@/store/sessionStore/session.store";
import { useState, useEffect } from "react";

export default function Index() {
  const loginTokens = useSessionStore(
    (state) => state.sessionData.login_tokens
  );
  const [products, setproducts] = useState<any[]>([]);

  useEffect(() => {
    if (products.length === 0) {
      (() => {
        getAllProductHandler(loginTokens)
          .then((res: any) => {
            setproducts(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
    console.log(products);
    return () => setproducts([]);
  }, []);

  return (
    <main>
      <Sidebar />
      <div className="flex flex-col pt-36 lg:pt-44 pb-32 px-8 md:px-12 border border-red-300">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold ">Product List </h1>
        </div>
      </div>
    </main>
  );
}
