import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { indexReducer_LogIn } from "../../store/actions/indexAction";

const SoLogin = () => {
  const code = new URL(window.location.href).searchParams.get("token"); // 현재 URL에서 토큰만 추출
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const indexReducer = useSelector((state) => state.indexReducer);
  useEffect(() => {
    localStorage.setItem("accessToken", code);
    alert("로그인 성공!");
    navigate("/", {}); // 로그인 완료시 메인으로 이동
    dispatch(indexReducer_LogIn());
  }, []);

  return;
};

export default SoLogin;
