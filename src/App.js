import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Review from "./pages/Review";
import Popular from "./pages/Popular";
import AiBook from "./pages/AiBook";

import Header from "./pages/Header";
import Login from "./components/Login/Login";
import SoLogin from "./components/Login/SoLogin";
import DetailBook from "./components/Detail/DetailBook";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import DetailNaruBook from "./components/Detail/DetailNaruBook";
import DetailSearchBook from "./components/Detail/DetailSearchBook";
import PopularBook from "./components/Popular/PopularBook";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="popular" element={<PopularBook />} />
          <Route path="/popularbook" element={<Popular />} />
          <Route path="/aibook" element={<AiBook />} />
          <Route path="/review" element={<Review />} />
          <Route path="/detail" element={<DetailBook />} />
          <Route path="/narudetail" element={<DetailNaruBook />} />
          <Route path="/searchdetail" element={<DetailSearchBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sologin" element={<SoLogin />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
