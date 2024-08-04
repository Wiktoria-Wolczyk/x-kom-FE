import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Cart.css";
import toast from "react-hot-toast";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ProductsContext } from "../context/loginContext/ProductsInCartContext";
import { IProductsArray } from "../types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AppleIPhone from "../HomepageIcons/Apple iPhone 15 128GB Black.webp";
import QuantityChanger from "./QuantityChanger";
import { LoginContext } from "../context/loginContext/LoginContext";

interface IProductsInCart {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  available: number;
  brand: string;
  quantity: number;
}

interface IFormInput {
  couponCode: string;
}

function Cart() {
  const { arrayWithActualProducts, setArrayWithActualProducts } =
    useContext(ProductsContext);

  const { actualUser } = useContext(LoginContext);

  const cartPrice = arrayWithActualProducts.reduce((acc, curr) => {
    console.log("obliczam cartPrice");
    acc += curr.price * curr.quantity;
    return acc;
  }, 0);

  // const memoizedPrice = useMemo(() => {
  //   return arrayWithActualProducts.reduce((acc, curr) => {
  //     console.log("OBLICZAM MEMO CART PRICE");
  //     acc += curr.price * curr.quantity;
  //     return acc;
  //   }, 0);
  // }, [arrayWithActualProducts]);
  // console.log({ memoizedPrice, cartPrice });

  const cartDiscountedPrice = arrayWithActualProducts.reduce((acc, curr) => {
    acc += curr.discountedPrice * curr.quantity;
    return acc;
  }, 0);

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

  const [addCouponCodeIsClicked, setAddCouponCodeIsClicked] = useState(false);

  const savedMoney = cartPrice - cartDiscountedPrice;

  const chevronCouponCodeClicked = () => {
    return setAddCouponCodeIsClicked((prev) => !prev);
  };

  let arrWithQuantites: number = 0;

  arrWithQuantites = arrayWithActualProducts.reduce((acc, obj) => {
    const numberQuantity = Number(obj.quantity);

    acc += numberQuantity;
    return acc;
  }, 0);

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
      await axios.post("http://localhost:3000/orders", {
        userID: actualUser?.id,
        products: arrayWithActualProducts,
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
    <div className="divScrollingContainer">
      <div className="containerForCart">
        <div className="divForCartInCartComponent">
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
            <div className="saveDiv">
              <i className="fa-regular fa-heart"></i>Zapisz
            </div>
            <div
              className="clearTrashDiv"
              onClick={() => {
                localStorage.removeItem("cart");
                clearCart();
              }}
            >
              <i className="fa-regular fa-trash-can"></i>Wyczyść koszyk
            </div>
          </div>
          <div className="divForProductsInCart">
            <ul className="ulForProductsInCart">
              {arrayWithActualProducts.map((el: IProductsArray) => {
                return (
                  <div key={el.id} className="containerForPhotoAndList">
                    <div className="containerForPhoto">
                      <img
                        className="productPhotoClass"
                        src={AppleIPhone}
                        alt="Apple IPhone photo"
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
                            const productsArr = arrayWithActualProducts;
                            const arrWithoutDeletedElement: IProductsArray[] =
                              productsArr.filter(
                                (element: IProductsInCart) =>
                                  element.id !== el.id,
                              );

                            // console.log(
                            //   "tu ma się usuwać całe zamównienie",
                            //   arrWithoutDeletedElement
                            // );

                            setArrayWithActualProducts(
                              arrWithoutDeletedElement,
                            );

                            const cartWithElements = JSON.stringify(
                              arrWithoutDeletedElement,
                            );

                            localStorage.setItem("cart", cartWithElements);
                          }}
                          className="buttonDeleteFromCart"
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
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
                            <p>Najniższa cena:</p>
                            <p style={{ textDecoration: "line-through" }}>
                              {el.price} zł
                            </p>
                            <div>
                              <b>cena: </b> {el.discountedPrice}zł
                            </div>
                          </div>
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
              <div className="savedMoney">saved money: {savedMoney} zł</div>
              <div className="amountToPayBeforeAndAfter">
                {cartPrice ? (
                  <>
                    <div className="priceBefore">{cartPrice} zł</div>
                  </>
                ) : (
                  <></>
                )}

                <div className="priceAfter">{cartDiscountedPrice} zł</div>
              </div>
            </div>
          </div>

          <button onClick={sendOrder} className="buttonBuy">
            BUY
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
