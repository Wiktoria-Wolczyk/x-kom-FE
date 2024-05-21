import React, { useEffect, useState } from "react";
import "./Cart.css";
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

interface IProductsInCart {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  available: number;
  brand: string;
}

function Cart() {
  let productsInCart = JSON.parse(localStorage.getItem("cart") || "[]");

  console.log("ppppp", productsInCart);
  return (
    <div className="containerForCart">
      <span className="cartTextInCartComponent">Cart</span>
      <div className="divForCartInCartComponent">
        <div className="divForProductsInCart">
          <ul className="ulForProductsInCart">
            {productsInCart.map((el: IProductsInCart) => (
              <>
                <li className="listInCart">
                  <div className="ContainerForElNameAndButton">
                    <span className="elName">
                      <b>name:</b> {el.name}
                    </span>
                    <button className="buttonDeleteFromCart">Delete</button>
                  </div>
                  <div className="ContainerForElAvailableAndDiscountedPrice">
                    <span className="elDiscountedPrice">
                      <b>price: </b> {el.discountedPrice}$
                    </span>
                    <span className="elAvailable">
                      <b>quantity: </b>
                      {el.available}
                    </span>
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
    </div>
  );
}

export default Cart;
