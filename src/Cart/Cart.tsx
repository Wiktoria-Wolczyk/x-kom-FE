import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Cart.css";
import toast from "react-hot-toast";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";
import { CartContext } from "../context/loginContext/CartContext";
import { ICartProduct, IProduct } from "../types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import AppleIPhone from "../HomepageIcons/Apple iPhone 15 128GB Black.webp";
import QuantityChanger from "./QuantityChanger";
import { LoginContext } from "../context/loginContext/LoginContext";
import { useMutation } from "@tanstack/react-query";
import Icons from "../Icons";
import CategoryTile from "../CategoryTile";
import { categories } from "../constants";
import CartHeader from "./CartHeader";
import CartProductsList from "./CartProductsList";
import CartSummary from "./CartSummary";

interface IFormInput {
  couponCode: string;
}

function Cart() {
  return (
    <div className="divScrollingContainer">
      <div className="containerForCart">
        <div className="divForCartInCartComponent">
          <CartHeader />
          <CartProductsList />
        </div>
        <CartSummary />
      </div>
    </div>
  );
}

export default Cart;
