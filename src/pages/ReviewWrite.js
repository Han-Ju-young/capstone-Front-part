import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./review.css";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

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

const buttonStyle = {
  backgroundColor: "#22b8cf",
  border: "none",
  color: "white",
  height: "30px",
};

const ARRAY = [0, 1, 2, 3, 4];

const ReviewWrite = (props) => {
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookReview, setBookReview] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  // 별점 기본값 설정
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(0);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
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
      url: "https://api.look-book.site/book/review",
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
    for (let i = 0; i < 6; i++) {
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
          style={buttonStyle}
        >
          닫기
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
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "60px" }}>
              ISBN
            </InputGroup.Text>
            <Form.Control
              placeholder="ISBN"
              aria-label="ISBN"
              aria-describedby="basic-addon1"
              onChange={handleTitleChange}
              value={title}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text
              id="basic-addon1"
              style={{ width: "60px", height: "200px" }}
            >
              리뷰
            </InputGroup.Text>
            <Form.Control
              placeholder="300자까지 입력할 수 있습니다."
              aria-label="write_review"
              aria-describedby="basic-addon1"
              value={bookReview}
              onChange={handleReviewChange}
              cols="130"
              rows="20"
            />
          </InputGroup>

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
          <h3
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >{`별점 : ${score}.0`}</h3>
          <div className="review">
            <button type="submit" className="btn btn-primary">
              리뷰 작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReviewWrite;
