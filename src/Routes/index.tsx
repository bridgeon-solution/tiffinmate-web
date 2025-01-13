import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import ProfileSidebar from "../Atoms/ProfileSideBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InvoiceDailyOrder from "../Components/InvoiceComponent/Invoice";
import PlanContainer from "../Containers/CurrentPlanContainer";
import RegisterVendor from "../Components/RegisterVendor";
const Subscription=lazy(()=>import("../Pages/Subscription"))
const Order=lazy(()=>import("../Pages/Order"))
const Provider = lazy(() => import("../Pages/Provider"));
const Navbar = lazy(() => import("../Common/Navbar"));
const Footer = lazy(() => import("../Common/FooterComponent"));
const ProviderDetails = lazy(() => import("../Pages/ProviderDetails"));
const MenuDetails = lazy(() => import("../Pages/MenuDetails"));
const ForgotPasword = lazy(() => import("../Pages/ForgotPasword"));
const ResetPassword = lazy(() => import("../Pages/ResetPassword"));
const Signup = lazy(() => import("../Pages/Signup"));
const Menu = lazy(() => import("../Pages/Menu"));
const Login = lazy(() => import("../Pages/Login"));
const Home = lazy(() => import("../Pages/Home"));

export const AppRoutes = () => {
  const location = useLocation();
  const noNav = [
    "/login",
    "/signup",
    "/forgotpassword",
    "/resetpassword",
    "/profile",
  ];
  return (
    <>
      {!noNav.includes(location.pathname) && <Navbar />}
      <Suspense fallback={<Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPasword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfileSidebar/>}/>
          <Route path="/provider" element={<Provider />} />
          <Route path="/provider/:id" element={<ProviderDetails />} />
          <Route path="/provider/:id/menu" element={<Menu />} />
          <Route path="/provider/:id/menu/:menuId" element={<MenuDetails />} />
          <Route path="/provider/:id/menu/:menuId/order" element={<Order />} />
          <Route path="/provider/:id/menu/:menuId/subscription" element={<Subscription />} />
          <Route path="/provider/:id/menu/:menuId/order/invoice" element={<InvoiceDailyOrder />} />

          <Route path="/currentplan" element={<PlanContainer/>}/>
          <Route path="/register" element={<RegisterVendor/>}/>
        </Routes>
      </Suspense>
      <ToastContainer/>
      {!noNav.includes(location.pathname) && <Footer />}
    </>
  );
};
