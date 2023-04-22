import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SimilarBook from "./SimilarBook";
import AreaSide from "../Popular/AreaSide";
import LibraryBook from "./LibraryBook";

const DetailBook = () => {
  const coverStyle = {
    marginRight: "20px",
  };
  const titleStyle = {
    fontSize: "20px",
  };
  const divStyle = {
    marginBottom: "10px",
    borderBottom: "5px solid #22b8cf",
  };
  const buttonStyle = {
    backgroundColor: "#22b8cf",
    border: "none",
    color: "white",
    height: "30px",
  };
  const pStyle = {
    fontSize: "30px",
    marginBottom: "-20px",
    marginTop: "50px",
  };

  const location = useLocation();
  const userInfo = { ...location.state };
  const [data, setData] = useState([]);
  const [lidata, setLiDate] = useState([]);
  const [AreaData, setAreaDate] = useState("11");
  const onAreaSelect = useCallback((AreaData) => setAreaDate(AreaData), []);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getLiData();
  }, [AreaData]);
  //http://3.36.227.160:8080/search/book/9791189327156/library/region/11
  //http://3.36.227.160:8080/search/book/9791189327156/similar-book/mania

  const getData = async () => {
    const res = await fetch(
      "http://3.36.227.160:8080/search/book/" +
        userInfo.isbn +
        "/similar-book/mania"
    ).then((res) => res.json());

    const initData = res.response.docs.map((it) => {
      return {
        no: it.book.no,
        authors: it.book.authors,
        publisher: it.book.publisher,
        publication_year: it.book.publication_year,
        bookname: it.book.bookname,
        bookImageURL: it.book.bookImageURL,
      };
    });
    setData(() => initData);
  };
  const getLiData = async () => {
    const res = await fetch(
      "http://3.36.227.160:8080/search/book/" +
        userInfo.isbn +
        "/library/region/" +
        AreaData
    ).then((res) => res.json());

    console.log(userInfo.isbn);
    console.log(lidata);
    const initDatas = res.response.libs.map((it) => {
      return {
        name: it.lib.libName,
        address: it.lib.address,
        tel: it.lib.tel,
        fax: it.lib.fax,
        homepage: it.lib.homepage,
        closed: it.lib.closed,
        time: it.lib.operatingTime,
      };
    });
    setLiDate(() => initDatas);
  };

  return (
    <div>
      <div style={divStyle}>
        <table>
          <tbody>
            <tr>
              <td rowSpan={4}>
                <img src={userInfo.cover} alt="bookCover" style={coverStyle} />
              </td>
              <td style={titleStyle}>{userInfo.title}</td>
            </tr>
            <tr>
              <td>
                {userInfo.author} | {userInfo.publisher} | {userInfo.pubDate}
              </td>
            </tr>
            <tr>
              <td>{userInfo.description}</td>
            </tr>
            <tr>
              <td>
                <button
                  style={buttonStyle}
                  onClick={() => {
                    window.open(userInfo.link);
                  }}
                >
                  알라딘에서 도서 구매
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p style={pStyle}>이 책과 유사한 도서 best 10</p>
        <br />
        {data &&
          data.map((item) => {
            return <SimilarBook {...item} />;
          })}
      </div>
      <div>
        <p style={pStyle}>이 책을 소장하고 있는 도서관</p>
        <AreaSide
          AreaData={AreaData}
          onAreaSelect={onAreaSelect}
          style={{
            width: "10px",
          }}
        />
        {lidata &&
          lidata.map((item) => {
            return <LibraryBook {...item} />;
          })}
      </div>
    </div>
  );
};
export default DetailBook;
