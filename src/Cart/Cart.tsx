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

interface IFormInput {
  couponCode: string;
}

function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [priceAndDiscountedPrice, setPriceAndDiscountedPrice] = useState({
    price: 0,
    discountedPrice: 0,
  });
  const [
    priceAndDiscountedPriceWithValidCoupon,
    setPriceAndDiscountedPriceWithValidCoupon,
  ] = useState({
    price: 0,
    discountedPrice: 0,
  });

  const { arrayWithActualProducts, setArrayWithActualProducts } =
    useContext(CartContext);

  const { actualUser } = useContext(LoginContext);

  const mutationPrice = useMutation({
    mutationFn: async (arrayWithActualProducts: ICartProduct[]) => {
      const response = await axios.post(
        "http://localhost:3000/orders/calculate-price",
        {
          products: arrayWithActualProducts,
          couponCode: couponCode,
        },
      );
      return response?.data?.message;
    },
    onSuccess: (data) => {
      if (couponCode) {
        setPriceAndDiscountedPriceWithValidCoupon(data);
      } else {
        setPriceAndDiscountedPrice(data);
      }
    },
    onError: () => {
      setPriceAndDiscountedPriceWithValidCoupon({
        price: 0,
        discountedPrice: 0,
      });
    },
  });

  useEffect(() => {
    mutationPrice.mutate(arrayWithActualProducts);
  }, [arrayWithActualProducts]);

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

  const savedMoney =
    priceAndDiscountedPriceWithValidCoupon.price -
      priceAndDiscountedPriceWithValidCoupon.discountedPrice ||
    priceAndDiscountedPrice.price - priceAndDiscountedPrice.discountedPrice;
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.couponCode) {
      setCouponCode(data.couponCode);
    }

    await mutationPrice.mutate(arrayWithActualProducts);
  };

  const clearCart = () => {
    const emptyArr: [] = [];
    return setArrayWithActualProducts(emptyArr);
  };

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:3000/orders", {
        userID: actualUser?.id,
        products: arrayWithActualProducts,
      });
    },
    onSuccess: () => {
      toast("Order created!", {
        icon: "👏",
      });
      localStorage.removeItem("cart");
      setArrayWithActualProducts([]);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
  });

  return (
    <div className="divScrollingContainer">
      <div className="containerForCart">
        <div className="divForCartInCartComponent">
          <div className="containerForCartTextAndSaveClearButtons">
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
              <div
                className="clearTrashDiv"
                onClick={() => {
                  localStorage.removeItem("cart");
                  clearCart();
                }}
              >
                <i className="fa-regular fa-trash-can fa-lg"></i>
                <p className="paddingNextToText">Wyczyść koszyk</p>
              </div>
            </div>
          </div>
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
                                  <p style={{ fontSize: 14 }}>
                                    Najniższa cena:
                                  </p>
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
                                <p style={{ fontSize: 14 }}>Najniższa cena:</p>
                                <p
                                  style={{
                                    textDecoration: "line-through",
                                    fontSize: 14,
                                  }}
                                >
                                  {el.price} zł
                                </p>
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
                            {/* <p style={{ fontSize: 13, marginTop: 5 }}>
                              Najniższa cena:
                            </p>
                            <p
                              style={{
                                textDecoration: "line-through",
                                fontSize: 13,
                              }}
                            >
                              {el.price} zł
                            </p> */}
                            <div>
                              {/* {el.discountedPrice ? (
                                <p style={{ fontSize: 15 }}>
                                  {el.discountedPrice}zł
                                </p>
                              ) : (
                                <p style={{ fontSize: 15 }}>{el.price}zł</p>
                              )} */}
                            </div>
                          </div>
                        </span>
                      </div>
                      <div className="trashInProductsCardOnDesktop">
                        <i
                          className="fa-regular fa-trash-can fa-lg"
                          onClick={() => {
                            const productsArr = arrayWithActualProducts;
                            const arrWithoutDeletedElement: ICartProduct[] =
                              productsArr.filter(
                                (element: ICartProduct) => element.id !== el.id,
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
                        ></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="divForPriceAndTrash"></div>
        </div>

        <div className="parentContainerForSummaryOrderAndCoupon">
          <div className="conatinerForCouponAndSummaryOrder">
            <div
              className="textAddCouponInCart"
              onClick={() => {
                chevronCouponCodeClicked();
                console.log({ addCouponCodeIsClicked });
              }}
            >
              <div className="centerCouponWithText">
                <Icons name="Coupon" style={{ height: 20 }} />
                <p style={{ paddingLeft: 10 }}>Masz kupon promocyjny?</p>
              </div>
              <i
                className={`fa-solid ${addCouponCodeIsClicked ? "fa-chevron-up" : "fa-chevron-down"} chevronInCouponCode`}
              ></i>
            </div>
            {addCouponCodeIsClicked && (
              <>
                {mutationPrice.isError ? (
                  <>
                    <div className="containerForInputCouponInCart">
                      <form
                        className="couponForm"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Controller
                          name="couponCode"
                          control={control}
                          render={({ field }) => (
                            <Input
                              style={{ border: "1px solid red" }}
                              className="inputToCouponInCart"
                              placeholder="Kod promocyjny"
                              {...field}
                            />
                          )}
                        />

                        <button className="useCouponCodeButton">Aktywuj</button>
                      </form>
                    </div>
                    <div
                      style={{
                        color: "red",
                        fontSize: 14,
                        width: "100%",
                        display: "flex",
                        paddingLeft: 36,
                        backgroundColor: "white",
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p>Niepoprawny kod</p>
                    </div>
                  </>
                ) : (
                  <div className="containerForInputCouponInCart">
                    <form
                      className="couponForm"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Controller
                        name="couponCode"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="inputToCouponInCart"
                            placeholder="Kod promocyjny"
                            {...field}
                          />
                        )}
                      />

                      <button className="useCouponCodeButton">Aktywuj</button>
                    </form>
                  </div>
                )}
              </>
            )}

            <div className="containerForSumOrderAndBuy">
              <div className="divForAmountToPay">
                <div className="containerForTextAmountToPayAndSavedMoney">
                  <p>Do zapłaty</p>
                </div>
                <div className="divForSumAmountToPayAndDiscount">
                  <div
                    className="amountToPayBeforeAndAfter"
                    style={{
                      display: "flex",
                      justifyContent: !savedMoney
                        ? "flex-end"
                        : "space-between",
                    }}
                  >
                    {mutationPrice.isPending ? (
                      <span> Loading... </span>
                    ) : (
                      <>
                        {savedMoney !== 0 && (
                          <div className="divForSavedMoney">
                            <div className="savedMoney">
                              Oszczędzasz {savedMoney} zł
                            </div>
                          </div>
                        )}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          {savedMoney !== 0 && (
                            <span className="priceBefore">
                              {priceAndDiscountedPriceWithValidCoupon.price ||
                                priceAndDiscountedPrice.price}{" "}
                              zł
                            </span>
                          )}
                          <span className="priceAfter">
                            {priceAndDiscountedPriceWithValidCoupon.discountedPrice ||
                              priceAndDiscountedPrice.discountedPrice}{" "}
                            zł
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
                className="buttonBuy"
              >
                {mutation.isPending ? "Loading..." : "Przejdź do dostawy"}
                <i className="fa-solid fa-chevron-right chevronInbuttonBuy"></i>
              </button>
              {mutation.isError ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: 300,
                      height: 50,
                      color: "red",
                      paddingBottom: 10,
                    }}
                  >
                    Wystąpił błąd przy składaniu zamówienia - spróbuj później
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
