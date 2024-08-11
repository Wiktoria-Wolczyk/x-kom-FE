import React from "react";
import Icons from "./Icons";

interface Category {
  name: string;
  img: string;
  spanStyle?: React.CSSProperties;
}

const CategoryTile = ({ category }: { category: Category }) => {
  return (
    <div className="categoryContainerForIMGAndName">
      <Icons name={category.img} style={{ height: 30 }} />
      <span className="centeredText" style={category?.spanStyle}>
        {category.name}
      </span>
    </div>
  );
};

export default CategoryTile;
