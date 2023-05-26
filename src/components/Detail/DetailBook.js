import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimilarBook from "./SimilarBook";
import AreaSide from "./AreaSide";
import LibraryBook from "./LibraryBook";
import DetailReview from "./DetailReview";
import axios from "axios";

const DetailBook = () => {
  const coverStyle = {
    marginRight: "20px",
  };
  const titleStyle = {
    fontSize: "30px",
    width: "1100px",
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

  const navigate = useNavigate();
  const params = useParams();
  const [bookInfo, setBookInfo] = useState({});
  const [data, setData] = useState([]);
  const [lidata, setLiDate] = useState([]);
  const [AreaData, setAreaDate] = useState("11");
  const onAreaSelect = useCallback((AreaData) => setAreaDate(AreaData), []);

  const [bookMark, setBookMark] = useState({}); // 북마크 용 state

  useEffect(() => {
    getBookDetailData();
    getData();
    getIsBookMarked();
  }, []);

  // 북마크 등록 및 삭제 시 re-render
  useEffect(() => {
    getIsBookMarked();
  }, [bookMark]);

  useEffect(() => {
    getLiData();
  }, [AreaData]);
  //https://api.look-book.site/search/book/9791189327156/library/region/11
  //https://api.look-book.site/search/book/9791189327156/similar-book/mania

  const getBookDetailData = async () => {
    const res = await axios.get(
      `https://api.look-book.site/search/book/${params.isbn}`
    );
    setBookInfo({ ...res.data.item[0] });
  };

  const getData = async () => {
    const res = await fetch(
      "https://api.look-book.site/search/book/" +
        params.isbn +
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
        params.isbn +
        "/library/region/" +
        AreaData
    ).then((res) => res.json());

    const initDatas = res.response.libs.map((it) => {
      return {
        name: it.lib.libName,
        address: it.lib.address,
        tel: it.lib.tel,
        homepage: it.lib.homepage,
        closed: it.lib.closed,
        time: it.lib.operatingTime,
      };
    });
    setLiDate(() => initDatas);
  };

  // 북마크 생성 or 삭제 여부 조회 api
  const getIsBookMarked = async () => {
    const res = await fetch(
      "https://api.look-book.site/search/book/" + params.isbn + "/bookmark",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Authorization 설정
        },
      }
    ).then((res) => res.json());
    setBookMark({ ...res });
  };

  // 북마크 등록 및 삭제 이벤트
  const handleBookMark = async () => {
    if (bookMark.bookmarkNo === 0) {
      // 북마크 등록
      const res = await fetch(
        `https://api.look-book.site/search/book/${params.isbn}/bookmark`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Authorization 설정
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("북마크 등록 성공");
          setBookMark({ ...bookMark });
        } else {
          console.log("북마크 등록 실패");
        }
      });
    } else {
      // 북마크 삭제
      const res = await fetch(
        `https://api.look-book.site/search/book/bookmark/${bookMark.bookmarkNo}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Authorization 설정
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("북마크 삭제 성공");
          setBookMark({ ...bookMark });
        } else {
          console.log("북마크 삭제 실패");
        }
      });
    }
  };

  return (
    <div>
      <div style={divStyle}>
        <table>
          <tbody>
            <tr>
              <td rowSpan={4}>
                <img src={bookInfo.cover} alt="bookCover" style={coverStyle} />
              </td>
              <td style={titleStyle}>{bookInfo.title}</td>
              <td
                style={{
                  textAlign: "right",
                }}
              >
                <button style={buttonStyle} onClick={() => navigate(-1)}>
                  {"< 이전으로"}
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {bookInfo.author} | {bookInfo.publisher} | {bookInfo.pubDate}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>{bookInfo.description}</td>
            </tr>
            <tr>
              <td>
                <button
                  style={buttonStyle}
                  onClick={() => {
                    window.open(bookInfo.link);
                  }}
                >
                  알라딘에서 도서 구매
                </button>
              </td>
              <td>
                <button
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    color: "white",
                    height: "30px",
                  }}
                  onClick={handleBookMark}
                >
                  <img
                    src={
                      bookMark.bookmarkNo === 0
                        ? "/images/bookmark_off.png"
                        : "/images/bookmark_on.png"
                    }
                    alt="북마크"
                    height={30}
                  ></img>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <DetailReview isbn={params.isbn} />

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
export default DetailBook;
