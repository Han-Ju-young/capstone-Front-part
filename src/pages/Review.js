import React, { useState, useEffect } from "react";
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
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzE5MTUzMTY5Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY4MDg3NDk5Nn0.8JqX9AbKipytNDyaGrejeZGnHlvfbqKXS5u4krhPX6k"
    // "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzA2OTQ3MDQ2Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY4MDg3NTgzN30.7dIZvRtFJDBixOJu8gxpbMoSyc9U60sxtzlPVgGUoak"
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
                <img />
                <div className="row-review">
                  <div>{`${review.memberName} ${review.createdAt.slice(
                    0,
                    10
                  )}`}</div>
                  <div id="review-text">{review.contents}</div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {[...new Array(review.grade)].map((el) => {
                      return <FaStar />;
                    })}
                  </div>
                </div>
                <div onClick={() => {}} className="row-rivew-like">
                  ♡
                </div>
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
