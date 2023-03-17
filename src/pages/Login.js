import styled from "styled-components";

function Login() {
  const NAVER_URI = `http://13.125.232.252:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/sologin`;
  const KAKAO_URI = `http://13.125.232.252:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/sologin`;
  const GOOGLE_URI = `http://13.125.232.252:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/sologin`;

  return (
    <div>
      <a href={NAVER_URI}>
        <LoginBtn src="images/naver.png" alt="naverlogin"></LoginBtn>
      </a>
      <br />
      <br />
      <a href={KAKAO_URI}>
        <LoginBtn src="images/kakao.png" alt="kakaologin"></LoginBtn>
      </a>
      <br />
      <br />
      <a href={GOOGLE_URI}>
        <LoginBtn src="images/google.png" alt="googlelogin"></LoginBtn>
      </a>
    </div>
  );
}

const LoginBtn = styled.img`
  width: 300px;
  height: 50px;
`;

export default Login;
