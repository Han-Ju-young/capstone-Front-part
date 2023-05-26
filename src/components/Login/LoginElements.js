import styled from "styled-components";

export const LoginBtn = styled.img`
  width: 300px;
  height: 70px;
`;

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  overflow: hidden;
  background: black;
`;

export const Form = styled.form`
  background: black;
  max-width: 400px;
  height: auto;
  width: 100%;
  display: grid;
  margin: 85px auto;
  padding: 80px 32px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid white;

  @media screen and (max-width: 480px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;
