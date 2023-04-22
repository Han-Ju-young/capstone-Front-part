import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import ReviewWrite from "./ReviewWrite";
import Modal from "react-modal";
import "./review.css";

const buttonStyle = {
  backgroundColor: "#22b8cf",
  border: "none",
  color: "white",
  height: "30px",
};

function Review() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [reviews, setReview] = useState([]);
  const [accessToken, setAccessToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzE5MTUzMTY5Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY4MTk4OTgxOX0.SQGmixjGYM8LBjY6pHqhmFYkFG_JJVrv4gXGX9q5Bpk"
  );

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    getReviews();
  }, [pageNum]);
  useEffect(() => {
    getReviews();
  }, [isModalOpen]);

  const getReviews = async () => {
    console.log(
      "url : ",
      `http://3.36.227.160:8080/book/9788936433673/review?page=${pageNum}`
    );
    axios({
      method: "GET",
      url: `http://3.36.227.160:8080/book/9788936433673/review?page=${pageNum}`,
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
    })
      .then((response) => {
        console.log("/book/{isbn}/review response : ", response);
        setReview(response.data.content);
      })
      .catch((error) => {
        console.log("/book/{isbn}/review error : ", error);
      });
  };

  const clickLikeBtn = (reviewId, isItClickedLikeBtn) => {
    console.log("Authorization : " + `Bearer ${accessToken}`);
    if (!isItClickedLikeBtn) {
      axios({
        method: "POST",
        url: `http://3.36.227.160:8080/review/${reviewId}/like`,
        headers: {
          // 요청 헤더 설정
          "Content-Type": "application/json", // Content-Type 설정
          Authorization: `Bearer ${accessToken}`, // Authorization 설정
        },
      })
        .then((response) => {
          console.log("review/${reviewId}/like response : ", response);
        })
        .catch((error) => {
          console.log("review/${reviewId}/like error : ", error);
        });
    } else {
      axios({
        method: "DELETE",
        url: `http://3.36.227.160:8080/review/${reviewId}/like`,
        headers: {
          // 요청 헤더 설정
          "Content-Type": "application/json", // Content-Type 설정
          Authorization: `Bearer ${accessToken}`, // Authorization 설정
        },
      })
        .then((response) => {
          console.log("response : ", response);
        })
        .catch((error) => {
          console.log(" : ", error);
        });
    }
  };

  return (
    <>
      <section className="main-contents">
        <div className="main-contents-header">
          <h1>리뷰 한줄평</h1>
          <div>
            <button
              style={{
                width: "100px",
                height: "30px",
                border: "none",
                backgroundColor: "skyblue",
                ...buttonStyle,
              }}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              리뷰 작성
            </button>
          </div>
        </div>
        {reviews.map((review) => {
          return (
            <div className="main-contents-reviews" key={review.no}>
              <div className="row-review-info">
                <Link
                  to={`/bookDetail?bookAuthor=${review.bookAuthor}&bookImgUrl=${review.bookImgUrl}&bookTitle=${review.bookTitle}`}
                >
                  <img src={review.bookImgUrl} />
                </Link>
                <div className="row-review">
                  <div>{`${review.memberNickname} ${review.createdAt.slice(
                    0,
                    10
                  )}`}</div>
                  <div id="review-text">{review.contents}</div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div>
                      {[...new Array(review.grade)].map((el, idx) => {
                        return <FaStar style={{ color: "#f4dd09" }} />;
                      })}
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <h5>{review.grade}.0</h5>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    borderStyle: "none",
                    color: `${review.liked ? "red" : ""}`,
                  }}
                  onClick={() => {
                    clickLikeBtn(review.no, review.liked);
                    getReviews();
                  }}
                  className="row-rivew-like"
                >
                  ♥
                </button>
              </div>
            </div>
          );
        })}
      </section>
      <div className="page-move">
        <div
          onClick={() => {
            setPageNum(pageNum - 1);
          }}
        >{`<`}</div>
        <div
          onClick={() => {
            setPageNum(pageNum + 1);
          }}
          style={{
            marginLeft: "20px",
          }}
        >{`>`}</div>
      </div>
      <Modal isOpen={isModalOpen}>
        <ReviewWrite
          isModalClose={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
}

export default Review;
