import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SimilarBook from "./SimilarBook";
import AreaSide from "./AreaSide";
import LibraryBook from "./LibraryBook";

const DetailSearchBook = () => {
  const coverStyle = {
    width: "200px",
    height: "280px",
    marginRight: "20px",
  };
  const titleStyle = {
    fontSize: "30px",
  };
  const divStyle = {
    marginBottom: "10px",
    marginTop: "20px",
    borderBottom: "5px solid #22b8cf",
  };
  const buttonStyle = {
    backgroundColor: "#22b8cf",
    border: "none",
    color: "white",
    height: "30px",
    marginLeft: "50px",
  };
  const pStyle = {
    fontSize: "30px",
    marginBottom: "-20px",
    marginTop: "50px",
  };

  const navigate = useNavigate();
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
  //https://api.look-book.site/search/book/9791189327156/library/region/11
  //https://api.look-book.site/search/book/9791189327156/similar-book/mania

  const getData = async () => {
    const res = await fetch(
      "https://api.look-book.site/search/book/" +
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
      "https://api.look-book.site/search/book/" +
        userInfo.isbn +
        "/library/region/" +
        AreaData
    ).then((res) => res.json());

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
      <div>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td rowSpan={4} style={{ width: "250px" }}>
                <img src={userInfo.cover} alt="bookCover" style={coverStyle} />
              </td>
              <td style={titleStyle}>{userInfo.title}</td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <button style={buttonStyle} onClick={() => navigate(-1)}>
                  {"< 이전으로"}
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {userInfo.author} | {userInfo.publisher} | {userInfo.pubDate}
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                가격: {userInfo.discount}
                <button
                  style={buttonStyle}
                  onClick={() => {
                    window.open(userInfo.link);
                  }}
                >
                  도서 구매하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={divStyle}>{userInfo.description}</div>

      <div>
        {data.length !== 0 ? (
          <div>
            <div style={divStyle}>
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
        ) : (
          <div>
            <p>이 책과 유사한 도서를 찾을 수 없습니다</p>
            <p>이 책을 소장하고 있는 도서관을 찾을 수 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailSearchBook;
