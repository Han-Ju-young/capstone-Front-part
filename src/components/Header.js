import React from "react";

const Header = () => {
  return (
    <div id="header">
      <h1>LookBook(이미지)</h1>
      <a href="/">Home</a>
      <br />
      <a href="/popular">인기도서</a>
      <br />
      <a href="/aibook">인공지능 추천도서</a>
      <br />
      <a href="/review">도서리뷰</a>
      <br />
    </div>
  );
};

export default Header;
