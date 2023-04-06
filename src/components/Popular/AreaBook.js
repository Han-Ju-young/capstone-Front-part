import React, { useEffect, useState, useCallback } from "react";
import NaruBookList from "../../pages/NaruBookList";
import AreaSide from "./AreaSide";

const AreaBook = ({ category }) => {
  const [data, setData] = useState([]);
  const [AreaData, setAreaDate] = useState("11");
  const onAreaSelect = useCallback((AreaData) => setAreaDate(AreaData), []);

  useEffect(() => {
    getData();
  }, [category, AreaData]);

  console.log(AreaData);
  const getData = async () => {
    const res = await fetch(
      "http://3.36.227.160:8080/recommendation/popularity?pageNo=1&pageSize=10&region=" +
        AreaData
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
