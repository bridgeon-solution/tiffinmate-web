import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "../Pages/Provider";
import Navbar from "../Common/Navbar";
import { Footer } from "../Common/FooterComponent";
import { ProviderDetails } from "../Pages/ProviderDetails";
const MenuDetails=lazy(()=>import("../Pages/MenuDetails"));
const ForgotPasword=lazy(()=>import("../Pages/ForgotPasword"));
const ResetPassword=lazy(()=>import("../Pages/ResetPassword"));
const Profile=lazy(()=>import ("../Pages/Profile"));
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
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPasword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/provider" element={<Provider />} />
          <Route path="/provider/:id" element={<ProviderDetails />} />
          <Route path="/provider/:id/menu" element={<Menu/>}/>
          <Route path="/provider/:id/menu/:id" element={<MenuDetails/>}/>
        </Routes>
      </Suspense>
      {!noNav.includes(location.pathname) && <Footer />}
    </>
  );
};
