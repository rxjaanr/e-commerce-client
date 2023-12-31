import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ListProduct from "../../../components/ui/products/list_product";

export default function Products() {
  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium">Product </h1>
        <Link
          to={"new"}
          className="flex gap-1 items-center max-md:fixed bottom-28 right-6 text-sm py-2 px-3 bg-black text-white rounded-md "
        >
          <PlusIcon className="w-4" />
          Add Products
        </Link>
      </div>
      <div className="mt-8">
        <ListProduct />
      </div>
    </main>
  );
}
