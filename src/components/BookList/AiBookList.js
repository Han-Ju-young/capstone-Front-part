const AiBookList = (item) => {
  const coverStyle = {
    width: "150px",
    height: "200px",
    marginRight: "20px",
  };
  const titleStyle = {
    fontSize: "20px",
  };
  const divStyle = {
    background: "#f2f2f2f0",
    marginBottom: "20px",
  };
  const buttonsty = {
    backgroundColor: "white",
    border: "none",
    marginRight: "20px",
  };
  //onClick={() => navigateToPurchase()}
  return (
    <div style={divStyle}>
      <table>
        <tbody>
          <tr>
            <td rowSpan={4}>
              <button style={buttonsty}>
                <img src={item.cover} alt="bookCover" style={coverStyle} />
              </button>
            </td>
            <td style={titleStyle}>{item.title}</td>
          </tr>
          <tr>
            <td>
              {item.author} | {item.publisher}
            </td>
          </tr>
          <tr>
            <td>{item.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AiBookList;
