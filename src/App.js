import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Review from "./pages/Review";
import Popular from "./pages/Popular";
import AiBook from "./pages/AiBook";
import BookDeal from "./pages/BookDeal";

import Header from "./pages/Header";
import Login from "./components/Login/Login";
import SoLogin from "./components/Login/SoLogin";
import DetailBook from "./components/Detail/DetailBook";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/aibook" element={<AiBook />} />
          <Route path="/review" element={<Review />} />
          <Route path="/bookdeal" element={<BookDeal />} />
          <Route path="/detail" element={<DetailBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sologin" element={<SoLogin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
