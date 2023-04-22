import React, { useEffect, useState } from "react";
import BookList from "../../pages/BookList";

const BestBook = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [category]);

  const getData = async () => {
    const res = await fetch(
      "http://3.36.227.160:8080/recommendation/bestseller"
    ).then((res) => res.json());
    const initData = res.item.map((it) => {
      return {
        title: it.title,
        link: it.link,
        cover: it.cover,
        author: it.author,
        publisher: it.publisher,
        description: it.description,
        pubDate: it.pubDate,
        bestRank: it.bestRank,
        isbn: it.isbn13,
      };
    });
    setData(() => initData);
  };

  return (
    <div>
      {data &&
        data.map((item) => {
          return <BookList {...item} />;
        })}
    </div>
  );
};
export default BestBook;
