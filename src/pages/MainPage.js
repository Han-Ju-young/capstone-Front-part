import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsBook } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3vh;
`;

const KindOfBestSellerSection = styled.div``;
const AISection = styled.div``;

const ReviewSection = styled.div``;

const buttonStyle = {
  backgroundColor: "#22b8cf",
  border: "none",
  color: "white",
  height: "30px",
};
const coverStyle = {
  width: "240px",
  height: "330px",
  marginRight: "20px",
};
const buttonsty = {
  backgroundColor: "white",
  border: "none",
  marginRight: "20px",
};

function MainPage() {
  const [bestSellers, setBestSellers] = useState([]);
  const [weekBestCategory, setWeekBestCategory] = useState([
    "분야",
    "나이",
    "성별",
    "지역",
  ]);
  const [reviews, setReviews] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isItSearch, setIsItSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchReviews, setSearchReviews] = useState([]);
  const [accessToken, setAccessToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzE5MTUzMTY5Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY4MTk4OTgxOX0.SQGmixjGYM8LBjY6pHqhmFYkFG_JJVrv4gXGX9q5Bpk"
  );
  const navigate = useNavigate();
  const navigateToPurchase = (el) => {
    navigate("/searchdetail", {
      state: {
        cover: `${el.image}`,
        title: `${el.title}`,
        author: `${el.author}`,
        publisher: `${el.publisher}`,
        pubDate: `${el.pubdate}`,
        description: `${el.description}`,
        discount: `${el.discount}`,
        link: `${el.link}`,
        isbn: `${el.isbn}`,
      },
    });
  };

  useEffect(() => {
    getBestSellers();
    getReviews();
  }, []);
  useEffect(() => {
    getReviews();
  }, [pageNum]);

  const getBestSellers = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/recommendation/bestseller`,
    })
      .then((response) => {
        setBestSellers(response.data.item);
      })
      .catch((error) => {
        console.log("/recommendation/bestseller erorr : ", error);
      });
  };

  const getReviews = async () => {
    console.log(
      "url : ",
      `https://api.look-book.site/book/9788936433673/review?page=${pageNum}&size=4`
    );
    axios({
      method: "GET",
      url: `https://api.look-book.site/book/9788936433673/review?page=${pageNum}&size=4`,
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
    })
      .then((response) => {
        console.log("/book/{isbn}/review response : ", response);
        setReviews(response.data.content);
      })
      .catch((error) => {
        console.log("/book/{isbn}/review error : ", error);
      });
  };

  const searchBook = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/search/book?title=${searchValue}&start=1`,
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
    })
      .then((response) => {
        console.log("/search/book?title: ", response);
        setSearchReviews(response.data.items);
      })
      .catch((error) => {
        console.log("/book/{isbn}/review error : ", error);
      });
  };
  console.log(searchReviews);

  return (
    <Main>
      <SearchSection>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{ display: "flex" }}
          >
            <Form.Label
              style={{
                width: "150px",
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              도서 검색
            </Form.Label>
            <Form.Control
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="검색할 도서명 입력"
            />
            <button
              onClick={(e) => {
                searchBook();
                setIsItSearch(true);
                e.preventDefault();
              }}
              style={{
                width: "100px",
                ...buttonStyle,
                marginTop: "5px",
                marginLeft: "10px",
              }}
            >
              검색
            </button>
          </Form.Group>
        </Form>
      </SearchSection>
      {!isItSearch ? (
        <>
          <Container style={{ marginTop: "5vh" }}>
            <div style={{ textAlign: "center" }}>
              <h1>금주의 베스트셀러 TOP 10</h1>
            </div>
            <Row style={{ marginTop: "5vh" }}>
              {bestSellers.slice(0, 10).map((bestSeller, idx) => {
                return (
                  <Col key={idx}>
                    <Card
                      style={{
                        marginBottom: "20px",
                        border: "none",
                      }}
                    >
                      <Card.Img
                        style={{
                          width: "240px",
                          height: "330px",
                        }}
                        variant="top"
                        src={bestSeller.cover}
                      />
                      <Card.Body
                        style={{
                          fontSize: "18px",
                        }}
                      >
                        {bestSeller.title}
                        {/* <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                      </Card.Text> */}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
          <Container style={{ marginTop: "15vh" }}>
            <div style={{ textAlign: "center" }}>
              <h1>분야, 나이, 성별, 지역 베스트 셀러</h1>
            </div>
            <Row style={{ marginTop: "5vh" }}>
              {weekBestCategory.map((category, idx) => {
                return (
                  <Col key={idx}>
                    <Card style={{ width: "18rem", textAlign: "center" }}>
                      <Card.Body>
                        <Card.Title>{category}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
          <Container style={{ marginTop: "15vh" }}>
            <div style={{ textAlign: "center" }}>
              <h1>인공지능 추천도서</h1>
            </div>
            <Row style={{ marginTop: "5vh" }}>
              {[
                "인공지능 도서",
                "인공지능 추천 도서 기능",
                "인공지능 도서",
              ].map((category, idx) => {
                return (
                  <Col key={idx}>
                    <Card style={{ width: "18rem", textAlign: "center" }}>
                      <Card.Body>
                        <Card.Title>{category}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
          <ReviewSection>
            <div style={{ marginTop: "15vh" }}>
              <div style={{ textAlign: "center" }}>
                <h1>도서 리뷰</h1>
              </div>
              <div
                style={{
                  marginTop: "5vh",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {reviews.map((el, idx) => {
                  return (
                    <Card
                      key={idx}
                      style={{ width: "200px", textAlign: "center" }}
                    >
                      <Card.Body>
                        <Card.Img variant="top" src={el.bookImgUrl} />
                        <Card.Title>{el.contents}</Card.Title>
                        <Card.Text
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div style={{ display: "flex", marginTop: "5px" }}>
                            {[...new Array(el.grade)].map((_el, idx) => {
                              return <FaStar style={{ color: "#f4dd09" }} />;
                            })}
                          </div>
                          <h5
                            style={{ display: "flex", alignItems: "center" }}
                          >{`${el.grade}.0`}</h5>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </div>
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
          </ReviewSection>
        </>
      ) : (
        <>
          <Container style={{ marginTop: "10vh" }}>
            <Row>
              {searchReviews.map((el, idx) => {
                return (
                  <Col key={idx}>
                    <Card
                      style={{
                        width: "264px",
                        height: "490px",
                        border: "none",
                        display: "left",
                      }}
                    >
                      <button
                        style={buttonsty}
                        onClick={() => navigateToPurchase(el)}
                      >
                        <Card.Img
                          variant="top"
                          src={el.image}
                          alt="bookCover"
                          style={coverStyle}
                          onClick={() => {}}
                        />
                      </button>

                      <Card.Body>
                        <Card.Title>{el.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </Main>
  );
}

export default MainPage;
