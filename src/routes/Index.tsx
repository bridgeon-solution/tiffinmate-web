import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Index";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
