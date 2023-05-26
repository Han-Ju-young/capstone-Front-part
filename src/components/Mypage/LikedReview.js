import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Modal from "react-modal";

const Main = styled.div`
  width: 85vw;
  .header {
    display: flex;
    margin-left: 5vw;
  }
  .header h3 {
    display: flex;
    flex: 0.4 auto;
  }

  .menus {
    display: flex;
    align-items: center;
  }
  .main-menus {
    display: flex;
    align-items: center;
    flex: 0.4 auto;
    font-size: 15px;
    justify-content: space-around;
  }
  .login-menus {
    display: flex;
    align-items: center;
    flex: 0.2 auto;
    justify-content: center;
    justify-content: space-around;
  }

  .main-contents {
    margin: 4vh 5vw 3vh 5vw;
  }
  .main-contents-header {
    display: flex;
    justify-content: space-between;
  }

  .main-contents-header div {
    display: flex;
    align-items: center;
  }

  .main-contents-reviews {
  }

  .row-review-info {
    background-color: #f2f2f2;
    display: flex;
    margin-top: 20px;
  }

  .row-review-info img {
    width: 100px;
    height: 120px;
  }

  .row-review {
    display: flex;
    flex-direction: column;
    flex: 0.8 auto;
    padding: 10px;
  }

  .row-rivew-like {
    display: flex;
    flex: 0.2 auto;
    justify-content: space-around;
    align-items: center;
    font-size: 30px;
  }

  #review-text {
    margin-top: 20px;
  }

  .page-move {
    /* position: fixed;
  bottom: 10vh; */
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

function LikedReview() {
  const [pageNum, setPageNum] = useState(0);
  const [reviews, setReview] = useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    getLikedReviews();
  }, []);

  const getLikedReviews = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/member/likes?page=${pageNum}`,
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
    <Main>
      <section className="main-contents">
        <div className="main-contents-header">
          <h1>찜한 리뷰</h1>
        </div>
        {reviews.map((review) => {
          return (
            <div className="main-contents-reviews" key={review.no}>
              <div className="row-review-info">
                <img src={review.bookImgUrl} />
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
                    color: "red",
                  }}
                  onClick={() => {
                    // clickLikeBtn(review.no, review.liked);
                    // getReviews();
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
    </Main>
  );
}

export default LikedReview;
