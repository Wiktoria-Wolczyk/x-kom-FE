import React, { useContext } from "react";
import { CartContext } from "../context/loginContext/CartContext";

const CartHeader = () => {
  const { arrayWithActualProducts, setArrayWithActualProducts } =
    useContext(CartContext);

  let arrWithQuantites: number = 0;

  arrWithQuantites = arrayWithActualProducts.reduce((acc, obj) => {
    const numberQuantity = Number(obj.quantity);

    acc += numberQuantity;
    return acc;
  }, 0);

  const clearCart = () => {
    const emptyArr: [] = [];
    return setArrayWithActualProducts(emptyArr);
  };
  return (
    <div className="containerForCartTextAndSaveClearButtons">
      <span className="cartTextInCartComponent">
        Koszyk
        {arrWithQuantites > 1 ? (
          <>
            <p className="countProductsNextToCartText">
              ({arrWithQuantites} produkty)
            </p>
          </>
        ) : (
          <p className="countProductsNextToCartText">
            ({arrWithQuantites} produkt)
          </p>
        )}
      </span>
      <div className="containerForSaveAndClearTrash">
        <div
          className="clearTrashDiv"
          onClick={() => {
            localStorage.removeItem("cart");
            clearCart();
          }}
        >
          <i className="fa-regular fa-trash-can fa-lg"></i>
          <p className="paddingNextToText">Wyczyść koszyk</p>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
