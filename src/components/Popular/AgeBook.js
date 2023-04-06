import React, { useEffect, useState, useCallback } from "react";
import AgeSide from "./AgeSide";
import NaruBookList from "../../pages/NaruBookList";

const AgeBook = ({ category }) => {
  const [data, setData] = useState([]);
  const [AgeData, setAgeDate] = useState("0");
  const onAgeSelect = useCallback((AgeData) => setAgeDate(AgeData), []);

  useEffect(() => {
    getData();
  }, [category, AgeData]);

  const getData = async () => {
    const res = await fetch(
      "http://3.36.227.160:8080/recommendation/popularity?pageNo=1&pageSize=10&age=" +
        AgeData
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
    setData(() => initData);
  };

  return (
    <div>
      <AgeSide
        AgeData={AgeData}
        onAgeSelect={onAgeSelect}
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
export default AgeBook;
