const SimilarBook = (item) => {
  const downcoverStyle = {
    width: "150px",
    height: "200px",
    marginRight: "20px",
  };
  const titleStyle = {
    fontSize: "20px",
  };
  const divStyle = {
    marginBottom: "10px",
    marginRight: "10px",
    marginLeft: "20px",
    width: "250px",
    display: "inline-block",
  };

  return (
    <div style={divStyle}>
      <p>{item.no}.</p>
      <table>
        <tbody>
          <tr>
            <td>
              <img
                src={item.bookImageURL}
                alt="bookCover"
                style={downcoverStyle}
              />
            </td>
          </tr>
          <tr>
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
export default SimilarBook;
