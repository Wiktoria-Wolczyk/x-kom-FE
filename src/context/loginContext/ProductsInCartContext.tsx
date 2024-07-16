import React, { ReactNode, createContext, useEffect, useState } from "react";
import "../../types";
import { IProductsArray } from "../../types";

interface IProductsContext {
  arrayWithActualProducts: IProductsArray[];
  setArrayWithActualProducts: (arr: IProductsArray[]) => void;
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

  useEffect(() => {
    console.log({ arrayWithActualProducts });
  }, [arrayWithActualProducts]);

  return (
    <ProductsContext.Provider
      value={{
        arrayWithActualProducts,
        setArrayWithActualProducts,
        buttonLoginIsClicked,
        setButtonLoginIsClicked,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
