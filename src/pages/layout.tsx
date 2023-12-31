import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster
          toastOptions={{
            duration: 2500,
          }}
          richColors
        />
      </QueryClientProvider>
    </>
  );
}
