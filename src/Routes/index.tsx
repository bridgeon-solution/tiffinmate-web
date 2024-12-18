import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const ForgotPasword=lazy(()=>import("../Pages/ForgotPasword"));
const ResetPassword=lazy(()=>import("../Pages/ResetPassword"));
const Profile=lazy(()=>import ("../Pages/Profile"));
const Menu=lazy(()=>import ("../Pages/Menu"))
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
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/menu" element={<Menu/>}/>
    </Routes>
    </Suspense>
  );
};

