import React, { useContext, useState } from "react";
import "./Cart.css";
import toast from "react-hot-toast";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ProductsContext } from "../context/loginContext/ProductsInCartContext";
import { IProductsArray } from "../types";
import PhotoClothes from "./Photos/clothesPhoto.jpeg";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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

interface IFormInput {
  couponCode: string;
}

function Cart() {
  const productsInCart = JSON.parse(localStorage.getItem("cart") || "[]");

  // const [arrayWithActualProducts, setArrayWithActualProducts] =
  //   useState(productsInCart);

  const { arrayWithActualProducts, setArrayWithActualProducts } =
    useContext(ProductsContext);

  const [addCouponCodeIsClicked, setAddCouponCodeIsClicked] = useState(false);

  const chevronCouponCodeClicked = () => {
    return setAddCouponCodeIsClicked((prev) => !prev);
  };

  let arrWithQuantites: number = 0;

  arrWithQuantites = arrayWithActualProducts.reduce((acc, obj) => {
    const numberQuantity = Number(obj.quantity);

    acc += numberQuantity;
    return acc;
  }, 0);

  const orderDiscountedPrice = arrayWithActualProducts.reduce((acc, obj) => {
    const price = obj.discountedPrice;

    acc += price;
    return acc;
  }, 0);

  const orderFullPrice = arrayWithActualProducts.reduce((acc, obj) => {
    const price = obj.price;

    acc += price;
    return acc;
  }, 0);

  const savedMoney = orderFullPrice - orderDiscountedPrice;

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      couponCode: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    // try {
    //   console.log("data", data);
    //   let response = await axios.post("http://localhost:3000/auth/login", {
    //     email: data.email,
    //     password: data.password,
    //   });
    //   let token = response.data.message?.token;
    //   let user = response.data.message?.user;
    //   let userName = response.data.message?.user.firstName;
    //   let userString = JSON.stringify(user);
    //   console.log(userString);
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("user", userString);
    //   toast(`Hello ${userName} !`, {
    //     icon: "👏",
    //   });
    //   setUserIsLoggedIn(true);
    //   setActualUser(user);
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);
    //   reset();
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const clearCart = () => {
    const emptyArr: [] = [];
    return setArrayWithActualProducts(emptyArr);
  };

  const sendOrder = async () => {
    try {
      //chce miec liste uzytkownikow zeby znalezc tego konkretnego po tokenie,
      //abym mogla wpisac ktory uzytkownik zamawia

      await axios.post("http://localhost:3000/orders", {
        userID: 25,
        products: productsInCart,
      });

      // console.log("order", order);
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
      <div className="divForCartInCartComponent">
        <span className="cartTextInCartComponent">
          Cart
          <p className="countProductsNextToCartText">
            ({arrWithQuantites} products)
          </p>
        </span>
        <div className="containerForSaveAndClearTrash">
          <div className="saveDiv">
            <i className="fa-regular fa-heart"></i>Save
          </div>
          <div
            className="clearTrashDiv"
            onClick={() => {
              localStorage.removeItem("cart");
              clearCart();
            }}
          >
            <i className="fa-regular fa-trash-can"></i>Clear cart
          </div>
        </div>
        <div className="divForProductsInCart">
          <ul className="ulForProductsInCart">
            {arrayWithActualProducts.map((el: IProductsArray) => {
              return (
                <div key={el.id} className="containerForPhotoAndList">
                  <div className="containerForPhoto">
                    <img
                      className="clothesPhotoClass"
                      src={PhotoClothes}
                      alt="clothesOnRail"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <li className="listInCart">
                    <div className="ContainerForElNameAndButton">
                      <span className="elName">
                        <p>{el.name}</p>
                      </span>
                      <button
                        onClick={() => {
                          const productsArr = [...productsInCart];
                          const arrWithoutDeletedElement: IProductsArray[] =
                            productsArr.filter(
                              (element: IProductsInCart) =>
                                element.id !== el.id,
                            );

                          // console.log(
                          //   "tu ma się usuwać całe zamównienie",
                          //   arrWithoutDeletedElement
                          // );

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
                        <MinusPlusButtons
                          value={el.quantity!}
                          productId={el.id}
                        />
                      </div>
                      <span className="elDiscountedPrice">
                        <b>price: </b> {el.discountedPrice}$
                      </span>

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
                </div>
              );
            })}
          </ul>
        </div>
        <div className="divForPriceAndTrash"></div>
      </div>
      <div className="containerForCouponInCart">
        <div className="textAddCouponInCart">
          <div>
            <i className="fa-solid fa-ticket"></i>Add coupon code
          </div>
          <i
            className="fa-solid fa-chevron-up"
            onClick={() => {
              chevronCouponCodeClicked();
              console.log({ addCouponCodeIsClicked });
            }}
          ></i>
        </div>
        {addCouponCodeIsClicked ? (
          <div className="containerForInputCouponInCart">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="couponCode"
                control={control}
                render={({ field }) => (
                  <Input
                    className="inputToCouponInCart"
                    placeholder="couponCode"
                    size="lg"
                    {...field}
                  />
                )}
              />
            </form>

            <button className="useCouponCodeButton">use</button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="containerForSumOrderAndBuy">
        <div className="divForAmountToPay">
          <div className="textAmountToPay">Amount to pay:</div>
          <div className="divForSumAmountToPayAndDiscount">
            <div className="savedMoney">saved money: {savedMoney}$</div>
            <div className="amountToPayBeforeAndAfter">
              {orderFullPrice ? (
                <>
                  <div className="priceBefore">{orderFullPrice}$</div>
                </>
              ) : (
                <></>
              )}

              <div className="priceAfter">{orderDiscountedPrice}$</div>
            </div>
          </div>
        </div>

        <button onClick={sendOrder} className="buttonBuy">
          BUY
        </button>
      </div>
    </div>
  );
}

export default Cart;

const MinusPlusButtons = ({
  value,
  productId,
}: {
  value: number;
  productId: number;
}) => {
  //1. value to moj number of quantity
  const { arrayWithActualProducts } = useContext(ProductsContext);

  const [newQuantityValue] = useState(value);

  const handleAddButton = () => {
    // setNewQuantityValue((prevValue) => prevValue + 1);
    const itemToEdit = arrayWithActualProducts.find(
      (value) => (value.id = productId),
    );
    console.log({ itemToEdit });
  };

  const handleRemoveButton = () => {
    // setNewQuantityValue((prevValue) =>
    //   prevValue > 1 ? prevValue - 1 : prevValue
    // );
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
