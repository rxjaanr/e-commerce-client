import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/layout";
import Home from "./pages/main";
import MainLayout from "./pages/main/layout";
import AuthPage from "./pages/auth";
import GuestRoute from "./components/route/guest.route";
import Dashboard from "./pages/dashboard";
import DashboardLayout from "./pages/dashboard/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          {/* End Main */}
          {/* Auth */}
          <Route
            path="/auth/:type"
            element={
              <GuestRoute>
                <AuthPage />
              </GuestRoute>
            }
          />
        </Route>
        {/* End Auth */}
        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* End Dashboard */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
