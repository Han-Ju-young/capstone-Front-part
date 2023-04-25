import React from "react";
import styled, { css } from "styled-components";

const SideField = [
  {
    id: "2105",
    name: "고전",
  },
  {
    id: "170",
    name: "경제경영",
  },
  {
    id: "1230",
    name: "가정/요리/뷰티",
  },
  {
    id: "55890",
    name: "건강/취미/레저",
  },
  {
    id: "2551",
    name: "만화",
  },
  {
    id: "798",
    name: "사회과학",
  },
  {
    id: "1",
    name: "소설/시/희곡",
  },
  {
    id: "1108",
    name: "어린이",
  },
  {
    id: "1196",
    name: "여행",
  },
  {
    id: "74",
    name: "역사",
  },
  {
    id: "13789",
    name: "유아",
  },
  {
    id: "656",
    name: "인문학",
  },
  {
    id: "336",
    name: "자기계발",
  },
  {
    id: "1237",
    name: "종교/역학",
  },
  {
    id: "1137",
    name: "청소년",
  },
  {
    id: "351",
    name: "컴퓨터/모바일",
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

const FieldSide = ({ onFieldSelect, fieldData }) => {
  return (
    <CategoriesBlock>
      {SideField.map((v) => (
        <Category
          key={v.id}
          active={fieldData === v.id}
          onClick={() => onFieldSelect(v.id)}
        >
          [{v.name}]
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default FieldSide;
