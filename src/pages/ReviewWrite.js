import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./review.css";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

const ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const ReviewWrite = (props) => {
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookReview, setBookReview] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  // 별점 기본값 설정
  const [clicked, setClicked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [score, setScore] = useState(0);
  const [accessToken, setAccessToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzE5MTUzMTY5Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY4MDUyNTA3OX0.Anwy0JNzN_c1JIM0ZUQXC3BDdY3LAi7in-S-80xeTbI"
  );

  useEffect(() => {
    console.log("clicked : ", clicked);
    sendReview();
  }, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    setScore(score);
    console.log("score : ", score);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setBookReview(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const BodyToPost = {
      isbn: title,
      contents: bookReview,
      grade: score,
    };
    axios({
      method: "POST",
      url: "http://3.36.227.160:8080/book/review",
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
      data: BodyToPost,
    });
  };

  const handleStarClick = (index) => {
    console.log("index : ", index);
    let clickStates = [...clicked];
    for (let i = 0; i < 10; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => {
            props.isModalClose();
          }}
        >
          Modal close
        </button>
      </div>
      <div className="info">
        <h1>리뷰를 작성하는 곳입니다.</h1>
        <p>감명 깊었던 책의 리뷰와 별점을 남겨주세요!</p>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
            alert("리뷰 작성이 완료되었습니다.");
            props.isModalClose();
          }}
        >
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text text-right">ISBN</span>
            </div>
            <textarea
              type="text"
              className="form-control text-left"
              id="title"
              value={title}
              onChange={handleTitleChange}
              cols="50"
              rows="2"
            ></textarea>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text text-right">리뷰</span>
            </div>
            <textarea
              className="form-control text-left"
              id="bookReview"
              cols="130"
              rows="20"
              placeholder="300자까지 입력할 수 있습니다."
              value={bookReview}
              onChange={handleReviewChange}
            ></textarea>
          </div>
          <Wrap>
            <RatingText>평가하기</RatingText>
            <Stars>
              {ARRAY.map((el, idx) => {
                return (
                  <FaStar
                    key={idx}
                    size="50"
                    onClick={() => {
                      console.log("el : ", el);
                      handleStarClick(el);
                    }}
                    className={clicked[el] && "yellowStar"}
                  />
                );
              })}
            </Stars>
          </Wrap>
          <h3>{`스코어 : ${score}`}</h3>
          <div className="review">
            <button type="submit" className="btn btn-primary">
              리뷰 작성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReviewWrite;
