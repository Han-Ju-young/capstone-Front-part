import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Review from "./pages/Review";
import Popular from "./pages/Popular";
import AiBook from "./pages/AiBook";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import SoLogin from "./pages/SoLogin";
import Header from "./pages/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/aibook" element={<AiBook />} />
          <Route path="/review" element={<Review />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sologin" element={<SoLogin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
