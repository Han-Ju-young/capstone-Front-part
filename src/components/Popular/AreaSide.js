import React from "react";
import styled, { css } from "styled-components";

const SideArea = [
  {
    id: "seoul",
    name: "서울",
  },
  {
    id: "busan",
    name: "부산",
  },
  {
    id: "daegu",
    name: "대구",
  },
  {
    id: "incheon",
    name: "인천",
  },
  {
    id: "gwangj",
    name: "광주",
  },
  {
    id: "daejeon",
    name: "대전",
  },
  {
    id: "ulsan",
    name: "울산",
  },
  {
    id: "sejong",
    name: "세종",
  },
  {
    id: "gyeonggi",
    name: "경기",
  },
  {
    id: "gangwon",
    name: "강원",
  },
  {
    id: "chungbuk",
    name: "충북",
  },
  {
    id: "chungnam",
    name: "충남",
  },
  {
    id: "jeonbuk",
    name: "전북",
  },
  {
    id: "jeonnam",
    name: "전남",
  },
  {
    id: "gyeongbuk",
    name: "경북",
  },
  {
    id: "gyeongnam",
    name: "경남",
  },
  {
    id: "jeju",
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
