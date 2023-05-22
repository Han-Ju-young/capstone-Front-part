const AiBookList = (item) => {
  const titleStyle = {
    fontSize: "20px",
  };
  const divStyle = {
    background: "#f2f2f2f0",
    marginBottom: "20px",
  };

  return (
    <div style={divStyle}>
      <table>
        <tbody>
          <tr>
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
