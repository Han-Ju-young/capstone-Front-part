const LibraryBook = (item) => {
  const titleStyle = {
    fontSize: "20px",
  };
  const divStyle = {
    borderBottom: "5px solid #22b8cf",
  };
  return (
    <div style={divStyle}>
      <table>
        <tbody>
          <tr>
            <td style={titleStyle}>{item.name}</td>
          </tr>
          <tr>
            <td>주소: {item.address}</td>
          </tr>
          <tr>
            <td>
              번호: {item.tel} | 홈페이지: {item.homepage}
            </td>
          </tr>
          <tr>
            <td>휴무일: {item.closed}</td>
          </tr>
          <tr>
            <td>운영시간: {item.time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default LibraryBook;
