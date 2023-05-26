import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function BookMark() {
  const [bookMark, setBookMark] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const getBookMarks = async () => {
    const res = await fetch(
      `https://api.look-book.site/member/bookmark?size=6&page=${pageNum}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Authorization 설정
        },
      }
    )
      .then((res) => res.json())
      .then((result) => setBookMark(result.content));
  };

  useEffect(() => {
    getBookMarks();
  }, []);

  return (
    <Container style={{ textAlign: "center", marginLeft: "5vw" }}>
      <h2 style={{ textAlign: "left" }}>북마크 도서 목록</h2>
      <div
        style={{
          width: "1100px",
          height: "1300px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookMark.length > 0 &&
          bookMark.map((v) => {
            return (
              <Card
                style={{ width: "210px", margin: "30px", border: "none" }}
                key={v.isbn}
              >
                <Link to={`/detail/${v.isbn}`}>
                  <Card.Img
                    variant="top"
                    src={v.bookImgUrl}
                    style={{
                      width: "240px",
                      height: "330px",
                    }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{v.bookTitle}</Card.Title>
                  <Card.Text>{v.bookAuthor}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
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
    </Container>
  );
}

export default BookMark;
