import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { AppRoutes } from "./Routes";


function App() {
  return (
    <BrowserRouter> 
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
