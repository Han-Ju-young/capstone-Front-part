import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
  height: "310px",
  marginRight: "20px",
};
const buttonsty = {
  backgroundColor: "white",
  border: "none",
  marginRight: "20px",
};
const cardStyle = {
  width: "15rem",
  border: "none",
  marginRight: "30px",
  textAlign: "center",
};

function MainPage() {
  const [bestSellers, setBestSellers] = useState([]);
  const [fieldSellers, setFieldSellers] = useState([]);
  const [ageSellers, setAgeSellers] = useState([]);
  const [womanSellers, setWomanSellers] = useState([]);
  const [manSellers, setManSellers] = useState([]);
  const [areaSellers, setAreaSellers] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [pageNum, setPageNum] = useState(0);
  const [isItSearch, setIsItSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchReviews, setSearchReviews] = useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
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
    getFieldSellers();
    getAgeSellers();
    getWomanSellers();
    getManSellers();
    getAreaSellers();
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
        console.log("/recommendation/bestseller error : ", error);
      });
  };

  const getFieldSellers = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/recommendation/genre?category=2105`,
    })
      .then((response) => {
        setFieldSellers(response.data.item[0]);
      })
      .catch((error) => {
        console.log("/recommendation/genre error : ", error);
      });
  };
  const getAgeSellers = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/recommendation/popularity/twenties`,
    })
      .then((response) => {
        setAgeSellers(response.data.response.docs[0].doc);
      })
      .catch((error) => {
        console.log("/recommendation/genre error : ", error);
      });
  };
  const getWomanSellers = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/recommendation/popularity/woman`,
    })
      .then((response) => {
        setWomanSellers(response.data.response.docs[0].doc);
      })
      .catch((error) => {
        console.log("/recommendation/genre error : ", error);
      });
  };
  const getManSellers = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/recommendation/popularity/man`,
    })
      .then((response) => {
        setManSellers(response.data.response.docs[0].doc);
      })
      .catch((error) => {
        console.log("/recommendation/genre error : ", error);
      });
  };
  const getAreaSellers = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/recommendation/popularity/seoul`,
    })
      .then((response) => {
        setAreaSellers(response.data.response.docs[0].doc);
      })
      .catch((error) => {
        console.log("/recommendation/genre error : ", error);
      });
  };

  const getReviews = async () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/reviews?page=${pageNum}&size=5`,
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
    })
      .then((response) => {
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
        setSearchReviews(response.data.items);
      })
      .catch((error) => {
        console.log("/book/{isbn}/review error : ", error);
      });
  };

  return (
    <Main>
      <SearchSection>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{ display: "flex", width: "500px" }}
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
                      <Link to={`/detail/${bestSeller.isbn13}`}>
                        <Card.Img
                          style={{
                            width: "240px",
                            height: "330px",
                          }}
                          variant="top"
                          src={bestSeller.cover}
                        />
                      </Link>
                      <Card.Body
                        style={{
                          fontSize: "18px",
                        }}
                      >
                        {bestSeller.title}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
          <Container style={{ marginTop: "15vh" }}>
            <div style={{ textAlign: "center" }}>
              <h1>분야, 연령, 성별, 지역 베스트 셀러</h1>
            </div>
            <div style={{ display: "flex" }}>
              <Card
                style={cardStyle}
                onClick={() => {
                  navigate("/popularbook", {
                    state: {
                      category: "field",
                    },
                  });
                }}
              >
                <Card.Title>고전 분야 인기도서</Card.Title>
                <Card.Img
                  style={{
                    width: "250px",
                    height: "330px",
                  }}
                  variant="top"
                  src={fieldSellers.cover}
                />
                <Card.Title>{fieldSellers.title}</Card.Title>
              </Card>
              <Card
                style={cardStyle}
                onClick={() => {
                  navigate("/popularbook", {
                    state: {
                      category: "age",
                    },
                  });
                }}
              >
                <Card.Title>20대 인기도서</Card.Title>
                <Card.Img
                  style={{
                    width: "250px",
                    height: "330px",
                  }}
                  variant="top"
                  src={ageSellers.bookImageURL}
                />
                <Card.Title>{ageSellers.bookname}</Card.Title>
              </Card>

              <Card
                style={cardStyle}
                onClick={() => {
                  navigate("/popularbook", {
                    state: {
                      category: "gender",
                    },
                  });
                }}
              >
                <Card.Title>여성독자 인기도서</Card.Title>
                <Card.Img
                  style={{
                    width: "250px",
                    height: "330px",
                  }}
                  variant="top"
                  src={womanSellers.bookImageURL}
                />
                <Card.Title>{womanSellers.bookname}</Card.Title>
              </Card>
              <Card
                style={cardStyle}
                onClick={() => {
                  navigate("/popularbook", {
                    state: {
                      category: "gender",
                    },
                  });
                }}
              >
                <Card.Title>남성독자 인기도서</Card.Title>
                <Card.Img
                  style={{
                    width: "250px",
                    height: "330px",
                  }}
                  variant="top"
                  src={manSellers.bookImageURL}
                />
                <Card.Title>{manSellers.bookname}</Card.Title>
              </Card>
              <Card
                style={cardStyle}
                onClick={() => {
                  navigate("/popularbook", {
                    state: {
                      category: "area",
                    },
                  });
                }}
              >
                <Card.Title>서울 지역 인기도서</Card.Title>
                <Card.Img
                  style={{
                    width: "250px",
                    height: "330px",
                  }}
                  variant="top"
                  src={areaSellers.bookImageURL}
                />
                <Card.Title>{areaSellers.bookname}</Card.Title>
              </Card>
            </div>
          </Container>
          <ReviewSection>
            <div style={{ marginTop: "15vh" }}>
              <div style={{ textAlign: "center" }}>
                <h1>최신 리뷰</h1>
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
                    <Card style={cardStyle} key={idx}>
                      <Card.Body>
                        <Link to={`/detail/${el.isbn}`}>
                          <Card.Img
                            style={{
                              width: "240px",
                              height: "330px",
                            }}
                            variant="top"
                            src={el.bookImgUrl}
                          />
                        </Link>
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
