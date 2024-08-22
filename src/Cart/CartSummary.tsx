import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { ICartProduct } from "../types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { CartContext } from "../context/loginContext/CartContext";
import Icons from "../Icons";
import { Input } from "@chakra-ui/react";
import { LoginContext } from "../context/loginContext/LoginContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface IFormInput {
  couponCode: string;
}

const CartSummary = () => {
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

  const [addCouponCodeIsClicked, setAddCouponCodeIsClicked] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      couponCode: "",
    },
  });

  const { arrayWithActualProducts, setArrayWithActualProducts } =
    useContext(CartContext);
  const { actualUser } = useContext(LoginContext);

  const savedMoney =
    priceAndDiscountedPriceWithValidCoupon.price -
      priceAndDiscountedPriceWithValidCoupon.discountedPrice ||
    priceAndDiscountedPrice.price - priceAndDiscountedPrice.discountedPrice;

  const chevronCouponCodeClicked = () => {
    return setAddCouponCodeIsClicked((prev) => !prev);
  };

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.couponCode) {
      setCouponCode(data.couponCode);
    }

    await mutationPrice.mutate(arrayWithActualProducts);
  };

  const navigate = useNavigate();

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
        navigate("/cart/login");
      }, 1000);
    },
  });

  return (
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
                <form className="couponForm" onSubmit={handleSubmit(onSubmit)}>
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
                  justifyContent: !savedMoney ? "flex-end" : "space-between",
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
            onClick={() => {
              // mutation.mutate()
              console.log("przejdź do dostawy kliknięte");
              navigate("/cart/login");
            }}
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
  );
};

export default CartSummary;
