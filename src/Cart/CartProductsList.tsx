import React, { useContext } from "react";
import { CartContext } from "../context/loginContext/CartContext";
import { ICartProduct } from "../types";
import QuantityChanger from "./QuantityChanger";

const CartProductsList = () => {
  const { arrayWithActualProducts, setArrayWithActualProducts } =
    useContext(CartContext);

  const changeQuantity = (id: number, change: string) => {
    const arr = arrayWithActualProducts.map((el) => {
      if (el.id === id) {
        if (change === "add") {
          el.quantity = el.quantity + 1;
        } else if (change === "remove") {
          el.quantity -= 1;
        }
      }

      return el;
    });

    setArrayWithActualProducts(arr);
  };

  const removeProduct = (el: ICartProduct) => {
    const productsArr = arrayWithActualProducts;
    const arrWithoutDeletedElement: ICartProduct[] = productsArr.filter(
      (element: ICartProduct) => element.id !== el.id,
    );

    setArrayWithActualProducts(arrWithoutDeletedElement);

    const cartWithElements = JSON.stringify(arrWithoutDeletedElement);

    localStorage.setItem("cart", cartWithElements);
  };

  const actualPath = window.location.pathname;

  const changeStyle = actualPath.startsWith("/cart");

  return (
    <div className="divForProductsInCart">
      <ul className="ulForProductsInCart">
        {arrayWithActualProducts.map((el: ICartProduct) => {
          return (
            <div key={el.id} className="containerForPhotoAndList">
              <div className="containerForPhoto">
                <img
                  className="productPhotoClass"
                  src={el.img}
                  alt="Apple IPhone photo"
                />
              </div>

              <div className="listInCart">
                <div className="ContainerForElNameAndButton">
                  <span className="elName">
                    <div>{el.name}</div>
                  </span>
                  <button
                    onClick={() => {
                      const productsArr = arrayWithActualProducts;
                      const arrWithoutDeletedElement: ICartProduct[] =
                        productsArr.filter(
                          (element: ICartProduct) => element.id !== el.id,
                        );

                      setArrayWithActualProducts(arrWithoutDeletedElement);

                      const cartWithElements = JSON.stringify(
                        arrWithoutDeletedElement,
                      );

                      localStorage.setItem("cart", cartWithElements);
                    }}
                    className="buttonDeleteFromCart"
                  >
                    <i className="fa-regular fa-trash-can fa-lg"></i>
                  </button>
                </div>
                <div className="ContainerForElAvailableAndDiscountedPrice">
                  <div className="containerForQuantityButtons">
                    <QuantityChanger
                      quantity={el.quantity}
                      id={el.id}
                      changeQuantity={changeQuantity}
                    />
                  </div>

                  <span className="elDiscountedPrice">
                    <div className="earlierPriceDiv">
                      {!el.discountedPrice ? (
                        <>
                          <div
                            className="displayNoneOnDesktop"
                            style={{ visibility: "hidden" }}
                          >
                            <p style={{ fontSize: 14 }}>Najniższa cena:</p>
                            <p
                              style={{
                                textDecoration: "line-through",
                                fontSize: 14,
                              }}
                            >
                              {el.price} zł
                            </p>
                          </div>
                          <p style={{ fontSize: 16, fontWeight: 500 }}>
                            {el.price}zł
                          </p>
                        </>
                      ) : (
                        <>
                          {changeStyle && (
                            <div style={{ display: "none" }}>
                              <p style={{ fontSize: 14 }}>Najniższa cena:</p>
                              <p
                                style={{
                                  textDecoration: "line-through",
                                  fontSize: 14,
                                }}
                              >
                                {el.price} zł
                              </p>
                            </div>
                          )}
                          <p
                            style={{
                              fontSize: 16,
                              fontWeight: 500,
                              paddingTop: 4,
                            }}
                          >
                            {el.discountedPrice}zł
                          </p>
                        </>
                      )}
                    </div>
                  </span>
                </div>
                <div className="trashInProductsCardOnDesktop">
                  <i
                    className="fa-regular fa-trash-can fa-lg"
                    onClick={() => removeProduct(el)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default CartProductsList;
