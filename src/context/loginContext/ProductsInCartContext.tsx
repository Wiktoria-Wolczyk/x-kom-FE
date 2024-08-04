import React, { ReactNode, createContext, useEffect, useState } from "react";
import "../../types";
import { IProductsArray } from "../../types";

interface IProductsContext {
  arrayWithActualProducts: IProductsArray[];
  setArrayWithActualProducts: (
    arr: IProductsArray[] | ((prev: IProductsArray[]) => IProductsArray[]),
  ) => void;
  buttonLoginIsClicked: boolean;
  setButtonLoginIsClicked: (bool: boolean) => void;
}

export const ProductsContext = createContext<IProductsContext>({
  arrayWithActualProducts: [],
  setArrayWithActualProducts: () => [],
  buttonLoginIsClicked: false,
  setButtonLoginIsClicked: () => {},
});

export const ProductsContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  // let cartString = localStorage.getItem("cart");
  // let productsInCart = cartString ? JSON.parse(cartString) : null;
  const [arrayWithActualProducts, setArrayWithActualProducts] = useState<
    IProductsArray[]
  >(JSON.parse(localStorage.getItem("cart") || "[]") || []);
  const [buttonLoginIsClicked, setButtonLoginIsClicked] = useState(false);

  const setArrayWithProductsInStateAndLocalStorage = (
    newProducts:
      | IProductsArray[]
      | ((prev: IProductsArray[]) => IProductsArray[]),
  ) => {
    setArrayWithActualProducts(newProducts);
    localStorage.setItem("cart", JSON.stringify(newProducts));
  };

  useEffect(() => {
    console.log({ arrayWithActualProducts });
  }, [arrayWithActualProducts]);

  return (
    <ProductsContext.Provider
      value={{
        arrayWithActualProducts,
        setArrayWithActualProducts: setArrayWithProductsInStateAndLocalStorage,
        buttonLoginIsClicked,
        setButtonLoginIsClicked,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
