import React, { ReactNode, createContext, useEffect, useState } from "react";
import "../../types";
import { ICartProduct } from "../../types";

interface ICompany {
  id: number;
  name: string;
  img: string;
  alt: string;
  valueName: string;
}

interface IFormInputInOrder {
  firstAndSecondName: string;
  streetAndHomeNumber: string;
  zipCode: string;
  localization: string;
  phoneNumber: number;
  email: string;
}
interface ICartContext {
  products: ICartProduct[];
  arrayWithActualProducts: ICartProduct[];
  setArrayWithActualProducts: (
    arr: ICartProduct[] | ((prev: ICartProduct[]) => ICartProduct[]),
  ) => void;
  buttonLoginIsClicked: boolean;
  setButtonLoginIsClicked: (bool: boolean) => void;
  deliveryMethodValue: number;
  setDeliveryMethodValue: (arg: number) => void;
  selectedCompany: ICompany;
  setSelectedCompany: (arg: ICompany) => void;
  dataWithDeliveryAdress: IFormInputInOrder;
  setDataWithDeliveryAdress: (arg: IFormInputInOrder) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  arrayWithActualProducts: [],
  setArrayWithActualProducts: () => [],
  buttonLoginIsClicked: false,
  setButtonLoginIsClicked: () => {},
  deliveryMethodValue: 0,
  setDeliveryMethodValue: (arg: number) => arg,
  selectedCompany: {
    id: 0,
    name: "",
    img: "",
    alt: "",
    valueName: "",
  },
  setSelectedCompany: () => {},
  dataWithDeliveryAdress: {
    firstAndSecondName: "",
    streetAndHomeNumber: "",
    zipCode: "",
    localization: "",
    phoneNumber: 0,
    email: "",
  },
  setDataWithDeliveryAdress: (arg: IFormInputInOrder) => arg,
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
  const [deliveryMethodValue, setDeliveryMethodValue] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<ICompany>({
    id: 0,
    name: "",
    img: "",
    alt: "",
    valueName: "",
  });
  const [dataWithDeliveryAdress, setDataWithDeliveryAdress] =
    useState<IFormInputInOrder>({
      firstAndSecondName: "",
      streetAndHomeNumber: "",
      zipCode: "",
      localization: "",
      phoneNumber: 0,
      email: "",
    });

  const setArrayWithProductsInStateAndLocalStorage = (
    newProducts: ICartProduct[] | ((prev: ICartProduct[]) => ICartProduct[]),
  ) => {
    localStorage.setItem("cart", JSON.stringify(newProducts));
    setArrayWithActualProducts(newProducts);
  };

  return (
    <CartContext.Provider
      value={{
        products: arrayWithActualProducts,
        arrayWithActualProducts,
        setArrayWithActualProducts: setArrayWithProductsInStateAndLocalStorage,
        buttonLoginIsClicked,
        setButtonLoginIsClicked,
        deliveryMethodValue,
        setDeliveryMethodValue,
        selectedCompany,
        setSelectedCompany,
        dataWithDeliveryAdress,
        setDataWithDeliveryAdress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
