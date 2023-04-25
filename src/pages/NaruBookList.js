import { useNavigate } from "react-router-dom";

const NaruBookList = (item) => {
  const coverStyle = {
    width: "150px",
    height: "200px",
    marginRight: "20px",
  };
  const titleStyle = {
    fontSize: "20px",
  };
  const divStyle = {
    borderBottom: "5px solid #22b8cf",
    marginBottom: "10px",
  };
  const buttonsty = {
    backgroundColor: "white",
    border: "none",
    marginRight: "20px",
  };

  const navigate = useNavigate();
  const navigateToPurchase = () => {
    navigate("/narudetail", {
      state: {
        cover: `${item.bookImageURL}`,
        title: `${item.bookname}`,
        author: `${item.authors}`,
        publisher: `${item.publisher}`,
        pubDate: `${item.publication_year}`,
        isbn: `${item.isbn}`,
      },
    });
  };

  return (
    <div style={divStyle}>
      <table>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <button style={buttonsty} onClick={() => navigateToPurchase()}>
                <img
                  src={item.bookImageURL}
                  alt="bookCover"
                  style={coverStyle}
                />
              </button>
            </td>
            <td style={titleStyle}>{item.bookname}</td>
          </tr>
          <tr>
            <td>
              {item.authors} | {item.publisher} | {item.publication_year}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NaruBookList;
