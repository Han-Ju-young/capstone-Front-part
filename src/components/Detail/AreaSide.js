import React from "react";
import styled, { css } from "styled-components";

const SideArea = [
  {
    id: "11",
    name: "서울",
  },
  {
    id: "21",
    name: "부산",
  },
  {
    id: "22",
    name: "대구",
  },
  {
    id: "23",
    name: "인천",
  },
  {
    id: "24",
    name: "광주",
  },
  {
    id: "25",
    name: "대전",
  },
  {
    id: "26",
    name: "울산",
  },
  {
    id: "29",
    name: "세종",
  },
  {
    id: "31",
    name: "경기",
  },
  {
    id: "32",
    name: "강원",
  },
  {
    id: "33",
    name: "충북",
  },
  {
    id: "34",
    name: "충남",
  },
  {
    id: "35",
    name: "전북",
  },
  {
    id: "36",
    name: "전남",
  },
  {
    id: "37",
    name: "경북",
  },
  {
    id: "38",
    name: "경남",
  },
  {
    id: "39",
    name: "제주",
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

const AreaSide = ({ onAreaSelect, AreaData }) => {
  return (
    <CategoriesBlock>
      {SideArea.map((v) => (
        <Category
          key={v.id}
          active={AreaData === v.id}
          onClick={() => onAreaSelect(v.id)}
        >
          [ {v.name} ]
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default AreaSide;
