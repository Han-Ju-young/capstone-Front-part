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

  return (
    <div style={divStyle}>
      <table>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <img src={item.bookImageURL} alt="bookCover" style={coverStyle} />
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
