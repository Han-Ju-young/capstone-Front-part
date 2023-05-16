import React from "react";
import { LoginBtn, Container, Form, FormH1 } from "./LoginElements";
import { indexReducer_LogIn } from "../../store/actions/indexAction";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const NAVER_URI = `https://api.look-book.site/oauth2/authorization/naver?redirect_uri=http://localhost:3000/sologin`;
  const KAKAO_URI = `https://api.look-book.site/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/sologin`;
  const GOOGLE_URI = `https://api.look-book.site/oauth2/authorization/google?redirect_uri=http://localhost:3000/sologin`;
  return (
    <>
      <Container>
        <Form>
          <a
            href={NAVER_URI}
            onClick={() => {
              dispatch(indexReducer_LogIn());
            }}
          >
            <LoginBtn src="images/naver.png" alt="naverlogin"></LoginBtn>
          </a>
          <br />
          <a
            href={KAKAO_URI}
            onClick={() => {
              dispatch(indexReducer_LogIn());
            }}
          >
            <LoginBtn src="images/kakao.png" alt="kakaologin"></LoginBtn>
          </a>
          <br />
          <a
            href={GOOGLE_URI}
            onClick={() => {
              dispatch(indexReducer_LogIn());
            }}
          >
            <LoginBtn src="images/google.png" alt="googlelogin"></LoginBtn>
          </a>
          <br />
          <FormH1>Log in with your social ID</FormH1>
        </Form>
      </Container>
    </>
  );
};

export default Login;
