import React, { useEffect, useState } from "react";
import NaruBookList from "../../pages/NaruBookList";

const GenderBook = ({ category }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const divStyle = {
    display: "flex",
  };
  const divstyle = {
    width: "750px",
    marginRight: "100px",
  };

  useEffect(() => {
    getData1();
    getData2();
  }, [category]);

  const getData1 = async () => {
    const res = await fetch(
      "http://3.36.227.160:8080/recommendation/popularity?pageNo=1&pageSize=10&gender=1"
    ).then((res) => res.json());
    const initData = res.response.docs.map((it) => {
      return {
        bookname: it.doc.bookname,
        bookImageURL: it.doc.bookImageURL,
        authors: it.doc.authors,
        publisher: it.doc.publisher,
        publication_year: it.doc.publication_year,
      };
    });
    setData1(() => initData);
  };
  const getData2 = async () => {
    const res = await fetch(
      "http://3.36.227.160:8080/recommendation/popularity?pageNo=1&pageSize=10&gender=0"
    ).then((res) => res.json());
    const initData = res.response.docs.map((it) => {
      return {
        bookname: it.doc.bookname,
        bookImageURL: it.doc.bookImageURL,
        authors: it.doc.authors,
        publisher: it.doc.publisher,
        publication_year: it.doc.publication_year,
      };
    });
    setData2(() => initData);
  };

  return (
    <div style={divStyle}>
      <div style={divstyle}>
        [ 여성 독자 인기도서 ]
        {data1 &&
          data1.map((item) => {
            return <NaruBookList {...item} />;
          })}
      </div>
      <div style={divstyle}>
        [ 남성 독자 인기도서 ]
        {data2 &&
          data2.map((item) => {
            return <NaruBookList {...item} />;
          })}
      </div>
    </div>
  );
};
export default GenderBook;
