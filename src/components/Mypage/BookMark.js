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
  });

  return (
    <Container style={{ textAlign: "center", marginLeft: "10vw" }}>
      <div
        style={{
          width: "1300px",
          height: "1300px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookMark.length > 0 &&
          bookMark.map((v) => {
            return (
              <Link to={`/detail/${v.isbn}`}>
                <Card style={{ width: "18rem", margin: "40px" }} key={v.isbn}>
                  <Card.Img variant="top" src={v.bookImgUrl} />
                  <Card.Body>
                    <Card.Title>{v.bookTitle}</Card.Title>
                    <Card.Text>{v.bookAuthor}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
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
