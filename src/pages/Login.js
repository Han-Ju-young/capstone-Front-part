import styled from "styled-components";

function Login() {
  const NAVER_URI = `http://13.125.232.252:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/sologin`;

  return (
    <a href={NAVER_URI}>
      <NaverLoginBtn src="images/naver.jpg" alt="naverlogin"></NaverLoginBtn>
    </a>
  );
}

const NaverLoginBtn = styled.img`
  width: 50px;
  height: 50px;
`;

export default Login;
