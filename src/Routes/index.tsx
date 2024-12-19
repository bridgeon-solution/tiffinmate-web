import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ForgotPasword from "../Pages/ForgotPasword";
import ResetPassword from "../Pages/ResetPassword";
import Profile from "../Pages/Profile";
import { Provider } from "../Pages/Provider";
import Navbar from "../Common/Navbar";
import { Footer } from "../Common/FooterComponent";
import { ProviderDetails } from "../Pages/ProviderDetails";
const Signup = lazy(() => import("../Pages/Signup"));
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
        </Routes>
      </Suspense>
      {!noNav.includes(location.pathname) && <Footer />}
    </>
  );
};
