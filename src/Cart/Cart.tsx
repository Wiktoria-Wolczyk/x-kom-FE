import React, { useEffect, useState } from "react";
import "./Cart.css";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";

interface IProductsInCart {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  available: number;
  brand: string;
  quantity: number;
}

//1.przycisk
//2. zrobic zamownienie na backendzie

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImZpcnN0TmFtZSI6IkFsaWNlIiwibGFzdE5hbWUiOiJNb3JnYW4iLCJwYXNzd29yZCI6IiQyYiQxMCRpWmh5ZU5wSElXbVlXakg3ZjBmZXp1a1ZUYUUza2NUVDJLS2hleURDcUlicFBCeVlVbUZWYSIsImVtYWlsIjoiYWxpY2UubW9yZ2FuQGdtYWlsLmNvbSIsImlhdCI6MTcxNjQwOTQxMiwiZXhwIjoxNzE2NDQ1NDEyfQ.KIbMhHRTLOttQ7F1aBOLt7QrXY5_C3to0whtCB9GDrU";

function Cart() {
  let productsInCart = JSON.parse(localStorage.getItem("cart") || "[]");

  console.log("ppppp", productsInCart);

  const [arrayWithActualProducts, setArrayWithActualProducts] =
    useState(productsInCart);

  const navigate = useNavigate();

  const sendOrder = async () => {
    try {
      //chce miec liste uzytkownikow zeby znalezc tego konkretnego po tokenie,
      //abym mogla wpisac ktory uzytkownik zamawia

      const order = await axios.post("http://localhost:3000/orders", {
        userID: 25,
        products: productsInCart,
      });

      console.log("order", order);
      toast("Order created!", {
        icon: "👏",
      });
      setTimeout(() => {
        navigate("/");
      }, 4000);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="containerForCart">
      <span className="cartTextInCartComponent">Cart</span>
      <div className="divForCartInCartComponent">
        <div className="divForProductsInCart">
          <ul className="ulForProductsInCart">
            {arrayWithActualProducts.map((el: IProductsInCart) => (
              <>
                <li className="listInCart">
                  <div className="ContainerForElNameAndButton">
                    <span className="elName">
                      <b>name:</b> {el.name}
                    </span>
                    <button
                      onClick={() => {
                        let productsArr = [...productsInCart];
                        let arrWithoutDeletedElement = productsArr.filter(
                          (element: IProductsInCart) => element.id !== el.id
                        );

                        console.log(
                          "tu ma się usuwać całe zamównienie",
                          arrWithoutDeletedElement
                        );

                        setArrayWithActualProducts(arrWithoutDeletedElement);

                        let cartWithElements = JSON.stringify(
                          arrWithoutDeletedElement
                        );

                        localStorage.setItem("cart", cartWithElements);
                      }}
                      className="buttonDeleteFromCart"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="ContainerForElAvailableAndDiscountedPrice">
                    <span className="elDiscountedPrice">
                      <b>price: </b> {el.discountedPrice}$
                    </span>
                    <div className="containerForQuantityButtons">
                      <MinusPlusButtons value={el.quantity} />
                    </div>
                    {/* <span className="elAvailable">
                      <b>quantity: </b>
                      {el.quantity}
                    </span> */}
                  </div>
                </li>

                {/* <div className="CartProductNameText">Product Name:</div>
              <div className="ProductNameText">{el.name}</div>
              <div className="CartSelectedProducts">Selected Products</div>
              <div className="ProductSelectedText"></div> */}
              </>
            ))}
          </ul>
        </div>
        <div className="divForPriceAndTrash"></div>
      </div>
      <button onClick={sendOrder} className="buttonBuy">
        BUY
      </button>
    </div>
  );
}

export default Cart;

const MinusPlusButtons = ({ value }: { value: number }) => {
  //1. value to moj number of quantity
  const [newQuantityValue, setNewQuantityValue] = useState(value);

  const handleAddButton = () => {
    setNewQuantityValue((prevValue) => prevValue + 1);
  };

  const handleRemoveButton = () => {
    setNewQuantityValue((prevValue) =>
      prevValue > 1 ? prevValue - 1 : prevValue
    );
  };

  return (
    <>
      <button onClick={handleAddButton} className="plusQuantityButton">
        +
      </button>
      <input
        className="inputWithQuantityCount"
        type="number"
        value={newQuantityValue}
      />
      <button onClick={handleRemoveButton} className="minusQuantityButton">
        -
      </button>
    </>
  );
};
