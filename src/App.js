import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "./pages/Home";
import Review from "./pages/Review";
import Popular from "./pages/Popular";
import AiBook from "./pages/AiBook";
import BookDeal from "./pages/BookDeal";

import Header from "./pages/Header";
import Login from "./components/Login/Login";
import SoLogin from "./components/Login/SoLogin";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/aibook" element={<AiBook />} />
            <Route path="/review" element={<Review />} />
            <Route path="/bookdeal" element={<BookDeal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sologin" element={<SoLogin />} />
          </Routes>
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
