import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Popular from "./pages/Popular";
import AiBook from "./pages/AiBook";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import NaverLogin from "./pages/NaverLogin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/aibook" element={<AiBook />} />
          <Route path="/review" element={<Review />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sologin" element={<NaverLogin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
