import React from "react";
import styled, { css } from "styled-components";

const SideAge = [
  {
    id: "infant",
    name: "영유아",
  },
  {
    id: "chide",
    name: "어린이",
  },
  {
    id: "elementary",
    name: "초등",
  },
  {
    id: "teenager",
    name: "10대",
  },
  {
    id: "twenties",
    name: "20대",
  },
  {
    id: "thirties",
    name: "30대",
  },
  {
    id: "forties",
    name: "40대",
  },
  {
    id: "fifties",
    name: "50대",
  },
  {
    id: "sixties",
    name: "60세 이상",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  margin: 0;
  width: 100%;
  marginleft: 0;
  @media screen and (max-width: 768px) {
    // 반응형 제작 해야 함
    width: 10px;
    overflow-x: auto;
  }
`;

const Category = styled.div`
  font-size: 1.1rem;
  cursor: pointer;
  white-space: normal;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #22b8cf;
  }

  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
      color: #22b8cf;
      &:hover {
        color: #3bc9db;
      }
    `}
`;

const AgeSide = ({ onAgeSelect, AgeData }) => {
  return (
    <CategoriesBlock>
      {SideAge.map((v) => (
        <Category
          key={v.id}
          active={AgeData === v.id}
          onClick={() => onAgeSelect(v.id)}
        >
          [ {v.name} ]
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default AgeSide;
