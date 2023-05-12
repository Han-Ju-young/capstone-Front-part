import React, { useState, useCallback } from "react";
import BestBook from "./BestBook";
import FieldBook from "./FieldBook";
import Categories from "./Categories";
import AgeBook from "./AgeBook";
import GenderBook from "./GenderBook";
import AreaBook from "./AreaBook";
import { useNavigate } from "react-router-dom";

const PopularBook = () => {
  const buttonStyle = {
    backgroundColor: "#22b8cf",
    border: "none",
    color: "white",
    height: "30px",
  };

  const [category, setCategory] = useState("best");
  const onSelect = useCallback((Category) => setCategory(Category), []);
  const navigate = useNavigate();

  return (
    <div>
      <h1>베스트셀러</h1>
      <p
        style={{
          textAlign: "right",
        }}
      >
        <button style={buttonStyle} onClick={() => navigate("/")}>
          {"< 홈으로"}
        </button>
      </p>

      {
        {
          best: (
            <div>
              <Categories category={category} onSelect={onSelect} />
              <BestBook category={category} />
            </div>
          ),
          field: (
            <div>
              <Categories category={category} onSelect={onSelect} />
              <FieldBook category={category} />
            </div>
          ),
          age: (
            <div>
              <Categories category={category} onSelect={onSelect} />
              <AgeBook category={category} />
            </div>
          ),
          gender: (
            <div>
              <Categories category={category} onSelect={onSelect} />
              <GenderBook category={category} />
            </div>
          ),
          area: (
            <div>
              <Categories category={category} onSelect={onSelect} />
              <AreaBook category={category} />
            </div>
          ),
        }[category]
      }
    </div>
  );
};
export default PopularBook;
