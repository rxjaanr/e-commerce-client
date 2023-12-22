import { Outlet } from "react-router-dom";
import Navbar from "../../components/layouts/nav/navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}
