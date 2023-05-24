import React, { useEffect, useState } from "react";
import axios from "axios";
import AiBookList from "../components/BookList/AiBookList";

const AiBook = () => {
  const [data, setData] = useState([]);
  const [book, setBook] = useState([]);
  const [reviews, setReview] = useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    getLikedReviews();
  }, []);
  useEffect(() => {
    getBook();
  }, [reviews]);
  useEffect(() => {
    getData();
  }, [book]);

  const getLikedReviews = () => {
    axios({
      method: "GET",
      url: `https://api.look-book.site/member/likes`,
      headers: {
        // 요청 헤더 설정
        "Content-Type": "application/json", // Content-Type 설정
        Authorization: `Bearer ${accessToken}`, // Authorization 설정
      },
    })
      .then((response) => {
        const initData = response.data.content.map((it) => {
          return {
            title: it.bookTitle,
          };
        });
        setReview(() => initData);
      })
      .catch((error) => {
        console.log("/book/{isbn}/review error : ", error);
      });
  };

  const getBook = async () => {
    const res = await fetch(
      `https://api.look-book.site/search/book?title=${reviews[0].title}&start=1`
    ).then((res) => res.json());
    const initData = res.items.map((it) => {
      return {
        isbn: it.isbn,
        description: it.description,
      };
    });
    setBook(() => initData);
  };

  const getData = async () => {
    const res = await fetch(
      `https://api.look-book.site:5001/?isbn=${book[0].isbn}&descrip=${book[0].description}`
    ).then((res) => res.json());

    const initData = res.map((it) => {
      return {
        title: it.title,
        author: it.author,
        publisher: it.publisher,
        description: it.description,
        cover: it.cover,
        isbn: it.isbn,
      };
    });
    setData(() => initData);
  };

  return (
    <div>
      {data.length !== 0 ? (
        <div>
          <h2>사용자 맞춤 추천 도서</h2>
          <br />
          <br />
          {data &&
            data.map((item) => {
              return <AiBookList {...item} />;
            })}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>사용자 정보를 찾을 수 없습니다</h2>
          <h2>로그인 후 이용해주시기 바랍니다.</h2>
        </div>
      )}
    </div>
  );
};
export default AiBook;
