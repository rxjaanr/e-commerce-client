import { Navigate, Outlet } from "react-router-dom";
import useSession from "../../utils/hooks/useSession";
import DashboardNav from "../../components/layouts/nav/dashboard.nav";
import BreadCrumbs from "../../components/ui/breadcrumbs/breadcrumbs";

export default function DashboardLayout() {
  const { user } = useSession();
  return user.role !== "ADMIN" ? (
    <Navigate to={"/auth/login"} />
  ) : (
    <>
      <DashboardNav />
      <BreadCrumbs className="pt-[5.5rem] md:pl-60 lg:pl-64 flex gap-1 capitalize max-md:hidden" />
      <main className="py-28 md:pt-8 md:pl-64 lg:pl-[17rem] px-6 md:px-8 ">
        <Outlet />
      </main>
    </>
  );
}
