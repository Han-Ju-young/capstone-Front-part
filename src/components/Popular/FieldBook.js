import React, { useEffect, useState, useCallback } from "react";
import BookList from "../../pages/BookList";
import FieldSide from "./FieldSide";

const FieldBook = ({ category }) => {
  const [data, setData] = useState([]);
  const [fieldData, setfieldDate] = useState("2105");
  const onFieldSelect = useCallback((fieldData) => setfieldDate(fieldData), []);

  useEffect(() => {
    getData();
  }, [category, fieldData]);

  const getData = async () => {
    const res = await fetch(
      "http://3.36.227.160:8080/recommendation/genre?category=" + fieldData
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
      };
    });
    setData(() => initData);
  };

  return (
    <div>
      <FieldSide
        fieldData={fieldData}
        onFieldSelect={onFieldSelect}
        style={{
          width: "10px",
        }}
      />
      {data &&
        data.map((item) => {
          return <BookList {...item} />;
        })}
    </div>
  );
};
export default FieldBook;
