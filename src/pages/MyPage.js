import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import BookMark from "../components/Mypage/BookMark";
import LikedReview from "../components/Mypage/LikedReview";
import WritedReviews from "../components/Mypage/WritedReviews";

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* flex: 0.2 auto; */
  margin-left: 2vw;
`;
const PageLink = styled.button`
  border: none;
  background: none;
  font-size: 19px;
  &:hover {
    cursor: pointer;
  }
`;

const MainContents = styled.div``;

function MyPage() {
  const [clickMenu, setClickMenu] = useState("likedReview");

  return (
    <div style={{ display: "flex" }}>
      <SideBar>
        <div>
          <AiOutlineUser style={{ fontSize: "100px" }} />
        </div>
        {/* <div
          style={{
            marginTop: "10vh",
            color: clickMenu === "bookmark" ? "blue" : "",
          }}
          onClick={() => {
            setClickMenu("bookmark");
          }}
        >
          <PageLink>북마크</PageLink>
        </div> */}
        <div
          style={{
            marginTop: "2vh",
            color: clickMenu === "likedReview" ? "blue" : "",
          }}
          onClick={() => {
            setClickMenu("likedReview");
          }}
        >
          <PageLink>찜한 리뷰</PageLink>
        </div>
        <div
          style={{
            marginTop: "2vh",
            color: clickMenu === "writedRivew" ? "blue" : "",
          }}
          onClick={() => {
            setClickMenu("writedRivew");
          }}
        >
          <PageLink>작성한 리뷰</PageLink>
        </div>
        {/* <div
          style={{
            marginTop: "2vh",
          }}
        >
          <PageLink>맞춤 추천도서</PageLink>
        </div> */}
      </SideBar>
      <MainContents>
        {/* {clickMenu === "bookmark" ? <BookMark /> : <></>} */}
        {clickMenu === "likedReview" ? <LikedReview /> : <></>}
        {clickMenu === "writedRivew" ? <WritedReviews /> : <></>}
      </MainContents>
    </div>
  );
}

export default MyPage;
