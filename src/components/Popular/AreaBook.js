import React, { useEffect, useState, useCallback } from "react";
import NaruBookList from "../BookList/NaruBookList";
import AreaSide from "./AreaSide";

const AreaBook = ({ category }) => {
  const [data, setData] = useState([]);
  const [AreaData, setAreaDate] = useState("seoul");
  const onAreaSelect = useCallback((AreaData) => setAreaDate(AreaData), []);

  useEffect(() => {
    getData();
  }, [category, AreaData]);

  console.log(AreaData);
  const getData = async () => {
    const res = await fetch(
      "https://api.look-book.site/recommendation/popularity/" + AreaData
    ).then((res) => res.json());
    const initData = res.response.docs.map((it) => {
      return {
        bookname: it.doc.bookname,
        bookImageURL: it.doc.bookImageURL,
        authors: it.doc.authors,
        publisher: it.doc.publisher,
        publication_year: it.doc.publication_year,
        isbn: it.doc.isbn13,
      };
    });
    setData(() => initData);
  };

  return (
    <div>
      <AreaSide
        AreaData={AreaData}
        onAreaSelect={onAreaSelect}
        style={{
          width: "10px",
        }}
      />
      {data &&
        data.map((item) => {
          return <NaruBookList {...item} />;
        })}
    </div>
  );
};
export default AreaBook;
