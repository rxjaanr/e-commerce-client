import { Navigate, Outlet } from "react-router-dom";
import useSession from "../../utils/hooks/useSession";

export default function DashboardLayout() {
  const { user } = useSession();
  return user.role !== "ADMIN" ? (
    <Navigate to={"/auth/login"} />
  ) : (
    <>
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
}
