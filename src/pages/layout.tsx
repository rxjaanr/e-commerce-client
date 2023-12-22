import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          duration: 2500,
        }}
        richColors
      />
    </>
  );
}
