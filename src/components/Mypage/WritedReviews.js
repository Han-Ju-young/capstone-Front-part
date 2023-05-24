import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

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

const buttonStyle = {
  backgroundColor: "#22b8cf",
  border: "none",
  color: "white",
  height: "30px",
};

function WritedReviews() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [reviews, setReview] = useState([]);
  const [updateReviewId, setUpdateReviewId] = useState(null);
  const [bookReview, setBookReview] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    getLikedReviews();
  }, []);

  const getLikedReviews = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/member/reviews?page=${pageNum}?size=5`,
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

  const deleteReview = (id) => {
    axios({
      method: "DELETE",
      url: `https://api.look-book.site/book/review/${id}`,
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
    })
      .then((response) => {
        console.log("/book/{isbn}/review response : ", response);
      })
      .catch((error) => {
        console.log("/book/{isbn}/review error : ", error);
      });
  };

  const updateReview = () => {
    axios({
      method: "PUT",
      url: `https://api.look-book.site/book/review/${updateReviewId}`,
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
      data: {
        contents: bookReview,
      },
    })
      .then((response) => {
        console.log("/book/{isbn}/review response : ", response);
      })
      .catch((error) => {
        console.log("/book/{isbn}/review error : ", error);
      });
  };

  const handleReviewChange = (event) => {
    setBookReview(event.target.value);
  };

  return (
    <Main>
      <section className="main-contents">
        <div className="main-contents-header">
          <h1>작성한 리뷰</h1>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setUpdateReviewId(review.no);
                    }}
                    style={{ height: "30px", ...buttonStyle }}
                  >
                    수정하기
                  </button>
                </div>
                <button
                  style={{
                    borderStyle: "none",
                  }}
                  onClick={() => {
                    deleteReview(review.no);
                    getLikedReviews();
                  }}
                  className="row-rivew-like"
                >
                  X
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
        <div
          style={{
            marginTop: "10vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2>리뷰 수정하기</h2>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            닫기
          </button>
        </div>
        <div className="info" style={{ marginTop: "5vh" }}>
          <form
            onSubmit={(event) => {
              updateReview();
              alert("리뷰 수정이 완료되었습니다.");
              setIsModalOpen(false);
              getLikedReviews();
            }}
          >
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

            <div className="review">
              <button type="submit" className="btn btn-primary">
                리뷰 수정 완료
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </Main>
  );
}

export default WritedReviews;
