import FormControl from "@/components/formControl/form.control";
import TextArea from "@/components/formControl/textarea";

export default function Add() {
  return (
    <main className="pt-24 px-8 md:px-16 lg:px-32">
      <h1 className="text-3xl font-semibold">Add Products</h1>
      <div className="container flex mt-16 flex-wrap gap-4 ">
        <div className="flex flex-col gap-2 w-full lg:w-1/2">
          <FormControl name="product" placeholder="Product Name" />
          <TextArea
            placeholder="Product Description"
            className="rounded-sm focus:outline-slate-900 focus:outline w-full "
          />
        </div>

        <div className="flex flex-col gap-2">
          <FormControl name="price" placeholder="Price" />
          <FormControl name="stock" placeholder="Stock" />
        </div>
      </div>
    </main>
  );
}
