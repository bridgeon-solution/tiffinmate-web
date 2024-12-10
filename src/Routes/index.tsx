import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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
    </Routes>
    </Suspense>
  );
};

