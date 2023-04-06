import React from "react";
import styled, { css } from "styled-components";

const SideAge = [
  {
    id: "0",
    name: "영유아(0~5세)",
  },
  {
    id: "6",
    name: "유아(6~7세)",
  },
  {
    id: "8",
    name: "초등(8~13세)",
  },
  {
    id: "14",
    name: "청소년(14~19세)",
  },
  {
    id: "20",
    name: "20대",
  },
  {
    id: "30",
    name: "30대",
  },
  {
    id: "40",
    name: "40대",
  },
  {
    id: "50",
    name: "50대",
  },
  {
    id: "60",
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
