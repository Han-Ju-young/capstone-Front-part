import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import ReviewWrite from "./ReviewWrite";
import Modal from "react-modal";
import "./review.css";

function Review() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [reviews, setReview] = useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
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
    axios({
      method: "GET",
      url: `https://api.look-book.site/reviews?page=${pageNum}`,
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
    })
      .then((response) => {
        console.log(response.data.content);
        setReview(response.data.content);
      })
      .catch((error) => {
        console.log("/book/{isbn}/review error : ", error);
      });
  };

  const clickLikeBtn = (reviewId, isItClickedLikeBtn) => {
    if (!isItClickedLikeBtn) {
      axios({
        method: "POST",
        url: `https://api.look-book.site/review/${reviewId}/like`,
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
        url: `https://api.look-book.site/review/${reviewId}/like`,
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
        </div>
        {reviews.map((review) => {
          return (
            <div className="main-contents-reviews" key={review.no}>
              <div className="row-review-info">
                <Link to={`/detail/${review.isbn}`}>
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
