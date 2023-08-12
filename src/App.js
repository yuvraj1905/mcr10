import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homes from "./components/Homes";
import Departments from "./components/Departments";
import Products from "./components/Products";
import DetailPage from "./components/DetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/products" element={<Products />} />
        <Route path="/details/:p_id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
