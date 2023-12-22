import { toast } from "sonner";

export default function Home() {
  return (
    <main>
      <button
        onClick={() =>
          toast.success("Item Added To Cart", {
            action: {
              label: "WOI",
              onClick: () => {},
            },
          })
        }
      >
        Click Me to Toast
      </button>
      <h1 onClick={() => toast.dismiss()}>Hilangkan Toast</h1>
    </main>
  );
}
