import { Outlet } from "react-router-dom";
import Navbar from "../../components/layouts/nav/navbar";
import useSession from "../../utils/hooks/useSession";

export default function MainLayout() {
  const { user, isAuthenticated } = useSession();
  return (
    <>
      <Navbar user={isAuthenticated ? user : null} />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}
