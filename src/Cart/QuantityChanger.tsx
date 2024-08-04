import React from "react";

const QuantityChanger = ({
  id,
  changeQuantity,
  quantity,
}: {
  id: number;
  changeQuantity: (id: number, change: string) => void;
  quantity: number;
}) => {
  return (
    <>
      <button
        onClick={() => changeQuantity(id, "add")}
        className="plusQuantityButton"
      >
        +
      </button>
      <input
        className="inputWithQuantityCount"
        type="number"
        value={quantity}
      />
      <button
        disabled={quantity === 1}
        onClick={() => changeQuantity(id, "remove")}
        className="minusQuantityButton"
      >
        -
      </button>
    </>
  );
};

export default QuantityChanger;
