import React from "react";
import "./ArrowButton.css";

interface IProps {
  direction?: string;
  onClick?: () => void;
}

function ArrowButton({ direction = "right", onClick }: IProps) {
  return (
    <>
      <button
        className={`arrowButton ${direction !== "right" && "rotate180"}`}
        onClick={onClick}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </>
  );
}
export default ArrowButton;
