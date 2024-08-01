import React from "react";

interface Category {
  name: string;
  img: string;
  spanStyle?: React.CSSProperties;
}

const CategoryTile = ({ category }: { category: Category }) => {
  return (
    <div className="categoryContainerForIMGAndName">
      <img
        className="imgCategoryIcon"
        src={category.img}
        alt={category.name}
        width={70}
        height={70}
      />
      <span className="centeredText" style={category?.spanStyle}>
        {category.name}
      </span>
    </div>
  );
};

export default CategoryTile;
