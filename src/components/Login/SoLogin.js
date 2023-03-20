import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SoLogin() {
  const code = new URL(window.location.href).searchParams.get("token"); // 현재 URL에서 토큰만 추출

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("accessToken", code); // 엑세스 토큰 -> 로컬 스토리지에 저장
    // => 액세스 토큰 세션 만료시 임의로 localStorage에서 토큰 삭제 필요
    // => 액세스 토큰 세션 만료시 삭제 후 재발급 기능 필요
    alert("로그인 성공!");

    navigate("/", { replace: true }); // 로그인 완료시 메인으로 이동
  }, []);

  return;
}

export default SoLogin;
