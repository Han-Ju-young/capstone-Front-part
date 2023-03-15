import axios from "axios";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
export const getCookie = (name) => {
  return cookies.get(name);
};

function NaverLogin() {
  console.log(window.location.href);
  const code = new URL(window.location.href).searchParams.get("token"); // 현재 URL에서 토큰만 추출
  console.log(code);

  const cookie = getCookie("refresh_token");
  console.log(cookie);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("accessToken", code); // 엑세스 토큰 -> 로컬 스토리지에 저장
    // => 액세스 토큰 세션 만료시 삭제 후 재발급 기능 필요
    alert("로그인 성공!");
    navigate("/", { replace: true }); // 로그인 완료시 메인으로 이동
  }, []);

  return;
}

export default NaverLogin;
