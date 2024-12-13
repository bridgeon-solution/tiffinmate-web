import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPasword from "../Pages/ForgotPasword";
import ResetPassword from "../Pages/ResetPassword";
const Signup=lazy(()=>import("../Pages/Signup"));
const Login=lazy(()=>import("../Pages/Login"));
const Home=lazy(()=>import("../Pages/Home"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgotpassword" element={<ForgotPasword/>}/>
      <Route path="/resetpassword" element={<ResetPassword/>}/>
    </Routes>
    </Suspense>
  );
};

