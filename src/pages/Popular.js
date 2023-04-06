import React, { useEffect, useState, useCallback } from "react";
import BestBook from "../components/Popular/BestBook";
import FieldBook from "../components/Popular/FieldBook";
import Categories from "../components/Popular/Categories";
import AgeBook from "../components/Popular/AgeBook";
import GenderBook from "../components/Popular/GenderBook";
import AreaBook from "../components/Popular/AreaBook";

const Popular = () => {
  const [category, setCategory] = useState("best");
  const onSelect = useCallback((Category) => setCategory(Category), []);

  return (
    <div>
      <h1>베스트셀러</h1>
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
export default Popular;
