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
        disabled={quantity === 1}
        onClick={() => changeQuantity(id, "remove")}
        className="minusQuantityButton"
      >
        -
      </button>

      <input
        className="inputWithQuantityCount"
        type="number"
        value={quantity}
      />
      <button
        onClick={() => changeQuantity(id, "add")}
        className="plusQuantityButton"
      >
        +
      </button>
    </>
  );
};

export default QuantityChanger;
