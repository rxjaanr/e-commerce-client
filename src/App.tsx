import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/layout";
import Home from "./pages/main";
import MainLayout from "./pages/main/layout";
import AuthPage from "./pages/auth";
import GuestRoute from "./components/route/guest.route";
import Dashboard from "./pages/dashboard";
import DashboardLayout from "./pages/dashboard/layout";
import Users from "./pages/dashboard/users";
import ProductsOnDashboard from "./pages/dashboard/products";
import Products from "./pages/main/products/";
import Orders from "./pages/dashboard/orders";
import NewProduct from "./pages/dashboard/products/new";
import EditProduct from "./pages/dashboard/products/[edit]";
import ProductDetail from "./pages/main/products/[slug]";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* Main */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
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
          {/* End Auth */}
          {/* Dashboard */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Users Management */}
            <Route path="/dashboard/users" element={<Users />} />
            {/* Product Management */}
            <Route
              path="/dashboard/products"
              element={<ProductsOnDashboard />}
            />
            <Route path="/dashboard/products/:slug" element={<EditProduct />} />
            <Route path="/dashboard/products/new" element={<NewProduct />} />
            {/* Orders */}
            <Route path="/dashboard/orders" element={<Orders />} />
          </Route>
          {/* End Dashboard */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
