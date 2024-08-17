import React, { ReactNode, createContext, useEffect, useState } from "react";
import "../../types";
import { ICartProduct } from "../../types";

interface ICartContext {
  products: ICartProduct[];
  arrayWithActualProducts: ICartProduct[];
  setArrayWithActualProducts: (
    arr: ICartProduct[] | ((prev: ICartProduct[]) => ICartProduct[]),
  ) => void;
  buttonLoginIsClicked: boolean;
  setButtonLoginIsClicked: (bool: boolean) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  arrayWithActualProducts: [],
  setArrayWithActualProducts: () => [],
  buttonLoginIsClicked: false,
  setButtonLoginIsClicked: () => {},
});

export const CartContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  // let cartString = localStorage.getItem("cart");
  // let productsInCart = cartString ? JSON.parse(cartString) : null;
  const [arrayWithActualProducts, setArrayWithActualProducts] = useState<
    ICartProduct[]
  >(JSON.parse(localStorage.getItem("cart") || "[]") || []);
  const [buttonLoginIsClicked, setButtonLoginIsClicked] = useState(false);

  const setArrayWithProductsInStateAndLocalStorage = (
    newProducts: ICartProduct[] | ((prev: ICartProduct[]) => ICartProduct[]),
  ) => {
    setArrayWithActualProducts(newProducts);
    localStorage.setItem("cart", JSON.stringify(newProducts));
  };

  return (
    <CartContext.Provider
      value={{
        products: arrayWithActualProducts,
        arrayWithActualProducts,
        setArrayWithActualProducts: setArrayWithProductsInStateAndLocalStorage,
        buttonLoginIsClicked,
        setButtonLoginIsClicked,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
