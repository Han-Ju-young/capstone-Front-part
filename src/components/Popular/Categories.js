import React from "react";
import styled, { css } from "styled-components";

// 카테고리 배열생성
const categories = [
  {
    name: "best",
    text: "금주의 베스트셀러",
  },
  {
    name: "field",
    text: "분야별 인기도서",
  },
  {
    name: "age",
    text: "연령별 인기도서",
  },
  {
    name: "gender",
    text: "성별 인기도서",
  },
  {
    name: "area",
    text: "지역별 인기도서",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    // 반응형 제작 해야함
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
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
      border-bottom: 2px solid #22b8cf;
      color: #22b8cf;
      &:hover {
        color: #3bc9db;
      }
    `}

  & + & {
    margin-left: 2rem;
  }
`;

const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {categories.map((v) => (
        <Category
          key={v.name}
          active={category === v.name}
          onClick={() => onSelect(v.name)}
        >
          {v.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
