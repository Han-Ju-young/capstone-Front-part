import { useNavigate } from "react-router-dom";

const BookList = (item) => {
  const navigate = useNavigate();
  const navigateToPurchase = () => {
    navigate("/detail", {
      state: {
        cover: `${item.cover}`,
        title: `${item.title}`,
        author: `${item.author}`,
        publisher: `${item.publisher}`,
        pubDate: `${item.pubDate}`,
        description: `${item.description}`,
        link: `${item.link}`,
        isbn: `${item.isbn}`,
      },
    });
  };

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
  const buttonStyle = {
    backgroundColor: "#22b8cf",
    border: "none",
    color: "white",
    height: "30px",
  };
  const buttonsty = {
    backgroundColor: "white",
    border: "none",
    marginRight: "20px",
  };

  return (
    <div style={divStyle}>
      <table>
        <tbody>
          <tr>
            <td rowSpan={4}>
              <button style={buttonsty} onClick={() => navigateToPurchase()}>
                <img src={item.cover} alt="bookCover" style={coverStyle} />
              </button>
            </td>
            <td style={titleStyle}>{item.title}</td>
          </tr>
          <tr>
            <td>
              {item.author} | {item.publisher} | {item.pubDate}
            </td>
          </tr>
          <tr>
            <td>{item.description}</td>
          </tr>
          <tr>
            <td>
              <button
                style={buttonStyle}
                onClick={() => {
                  window.open(item.link);
                }}
              >
                알라딘에서 도서 구매
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
