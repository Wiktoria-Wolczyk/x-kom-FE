import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import "./OrderAndPayment.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Przelewy24 from "../OrderIcons/przelewy24-lm.webp";
import VisaMastercard from "../OrderIcons/visa-mastercard.webp";
import PrzelewTradycyjny from "../OrderIcons/przelewTradycyjny.webp";
import SantanderAndAliorBankLogo from "../OrderIcons/SantanderAndAliorbank.webp";
import CourierCar from "../OrderIcons/courier-car.webp";
import XkomShop from "../OrderIcons/x-komShop.webp";
import InpostLogo from "../OrderIcons/inpostLogo.webp";
import LogoUPS from "../OrderIcons/logoUPS.webp";
import LogoInPostKurier from "../OrderIcons/inpostKurier.webp";
import LogoFedEx from "../OrderIcons/FedEx.webp";
import CartSummary from "../../Cart/CartSummary";

interface IFormInputInOrder {
  firstAndSecondName: string;
  streetAndHomeNumber: string;
  zipCode: string;
  localization: string;
  phoneNumber: string;
  email: string;
}

const OrderAndPayment = () => {
  const [value, setValue] = React.useState("courier");
  const [deliveryMethodValue, setDeliveryMethodValue] = useState<string>("ups");
  const [paymentMethodValue, setPaymentMethodValue] =
    useState<string>("przelewy24");
  const [checkedItems, setCheckedItems] = React.useState([false, false]);
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields, errors, isValid },
  } = useForm({
    defaultValues: {
      firstAndSecondName: "",
      streetAndHomeNumber: "",
      zipCode: "",
      localization: "",
      phoneNumber: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputInOrder> = async (data) => {
    // mutationLogin.mutate(data);
    console.log("tutaj tylko sprawdzam");
  };

  return (
    <div className="contianerForOrderAndPaymentComponent">
      <h1 className="deliveryAndPayment">Dostawa i płatność</h1>
      <h3 style={{ marginBottom: 10, paddingLeft: 15 }}>
        Prezentujemy tylko opcje dostępne dla tego zamówienia.
      </h3>
      <div className="containerForCheckboxAndText">
        <h2 className="textDeliveryMethod">Sposób dostawy</h2>
        <div className="containerForDeliveryMethod">
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="column">
              <div
                onClick={() => setValue("courier")}
                className={`radio-div ${value === "courier" ? "selectedRadio" : ""}`}
              >
                <Radio value="courier" className="radioElement">
                  Kurier
                </Radio>
                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={CourierCar}
                    alt="zarys busa"
                    width={30}
                    height={30}
                    style={{
                      filter:
                        value === "courier" ? "grayscale(0)" : "grayscale(1)",
                    }}
                  />
                  <span style={{ marginLeft: 10 }}> od 0 zł</span>
                </div>
              </div>
              <div
                onClick={() => setValue("onsite")}
                className={`radio-div ${value === "onsite" ? "selectedRadio" : ""}`}
              >
                <Radio value="onsite" className="radioElement">
                  Salon x-kom
                </Radio>
                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={XkomShop}
                    alt="zarys budynku sklepu"
                    width={30}
                    height={30}
                    style={{
                      filter:
                        value === "onsite" ? "grayscale(0)" : "grayscale(1)",
                    }}
                  />
                  <span style={{ marginLeft: 10 }}>0 zł</span>
                </div>
              </div>
              <div
                onClick={() => setValue("inpost")}
                className={`radio-div ${value === "inpost" ? "selectedRadio" : ""}`}
              >
                <Radio value="inpost" className="radioElement">
                  InPost Paczkomat 24/7
                </Radio>

                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={InpostLogo}
                    alt="logo InPost"
                    width={35}
                    height={35}
                    style={{
                      filter:
                        value === "inpost" ? "grayscale(0)" : "grayscale(1)",
                    }}
                  />
                  <span style={{ marginLeft: 10 }}>0 zł</span>
                </div>
              </div>
            </Stack>
          </RadioGroup>
        </div>
      </div>
      {value === "courier" && (
        <div className="containerForCheckboxAndText">
          <h2 className="textDeliveryMethod">Przesyłkę dostarczy</h2>
          <div className="containerForDeliveryMethod">
            <RadioGroup
              onChange={setDeliveryMethodValue}
              value={deliveryMethodValue}
            >
              <Stack direction="column" className="radioStack">
                <div
                  onClick={() => setDeliveryMethodValue("ups")}
                  className={`radio-div ${deliveryMethodValue === "ups" ? "selectedRadio" : ""}`}
                >
                  <Radio value="ups" className="radioElement">
                    UPS
                  </Radio>
                  <div className="divForPaymentLogoAndPrice">
                    <img
                      src={LogoUPS}
                      alt="logo UPS"
                      width={30}
                      height={30}
                      style={{
                        filter:
                          deliveryMethodValue === "ups"
                            ? "grayscale(0)"
                            : "grayscale(1)",
                      }}
                    />
                    <span style={{ marginLeft: 10 }}> 24,99 zł</span>
                  </div>
                </div>
                <div
                  onClick={() => setDeliveryMethodValue("inpost")}
                  className={`radio-div ${deliveryMethodValue === "inpost" ? "selectedRadio" : ""}`}
                >
                  <Radio value="inpost" className="radioElement">
                    InPost Kurier
                  </Radio>
                  <div className="divForPaymentLogoAndPrice">
                    <img
                      src={LogoInPostKurier}
                      alt="logo InPost Kurier"
                      width={30}
                      height={30}
                      style={{
                        filter:
                          deliveryMethodValue === "inpost"
                            ? "grayscale(0)"
                            : "grayscale(1)",
                      }}
                    />
                    <span style={{ marginLeft: 10 }}> 19,99 zł</span>
                  </div>
                </div>
                <div
                  onClick={() => setDeliveryMethodValue("fedex")}
                  className={`radio-div ${deliveryMethodValue === "fedex" ? "selectedRadio" : ""}`}
                >
                  <Radio value="fedex" className="radioElement">
                    FedEx
                  </Radio>
                  <div className="divForPaymentLogoAndPrice">
                    <img
                      src={LogoFedEx}
                      alt="logo FedEx"
                      width={30}
                      height={30}
                      style={{
                        filter:
                          deliveryMethodValue === "fedex"
                            ? "grayscale(0)"
                            : "grayscale(1)",
                      }}
                    />
                    <span style={{ marginLeft: 10 }}>0 zł</span>
                  </div>
                </div>
              </Stack>
            </RadioGroup>
          </div>
        </div>
      )}

      <div className="containerForCheckboxAndText">
        <h2 className="textDeliveryMethod deliveryAdress">Adres dostawy</h2>
        <div className="containerForShippingDetails">
          <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
            <div className="containerForDeliveryFormInputs">
              <Controller
                name="firstAndSecondName"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <Input
                    className="shippingDetailsInput"
                    placeholder="Imię i nazwisko lub nazwa firmy"
                    size="lg"
                    {...field}
                  />
                )}
              />
              <Controller
                name="streetAndHomeNumber"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <Input
                    className="shippingDetailsInput"
                    placeholder="Ulica i numer domu/ mieszkania"
                    size="lg"
                    {...field}
                  />
                )}
              />
              <Controller
                name="zipCode"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <Input
                    className="shippingDetailsInput"
                    placeholder="Kod pocztowy"
                    size="lg"
                    {...field}
                  />
                )}
              />
              <Controller
                name="localization"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <Input
                    className="shippingDetailsInput"
                    placeholder="Miejscowość"
                    size="lg"
                    {...field}
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <Input
                    className="shippingDetailsInput"
                    placeholder="Telefon"
                    size="lg"
                    {...field}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <Input
                    className="shippingDetailsInput"
                    placeholder="E-mail"
                    size="lg"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="conatinerForInforAboutSendingEmail">
              <span>Na ten E-mail wyślemy informacje o zamóweiniu</span>
              <Button type="submit" disabled={!isValid}>
                OK, prześlij wszystko
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="containerForCheckboxAndText"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span style={{ fontSize: 20, fontWeight: "bold" }}>
          Dane do faktury
        </span>
        <span>
          W naszym sklepie internetowym dowodem zakupu jest faktura. Standardowo
          wystawiamy ją na dane z adresu dostawy.
        </span>
        <Checkbox
          style={{ marginTop: 20 }}
          isChecked={isCheckboxClicked}
          onChange={(e) => setIsCheckboxClicked(e.target.checked)}
        >
          Chcę podać inne dane do faktury
        </Checkbox>
        {isCheckboxClicked && (
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="formContainerForOtherInvoiceData"
            >
              <div className="containerForOtherInvoiceData">
                <Controller
                  name="firstAndSecondName"
                  control={control}
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <Input
                      className="shippingDetailsInput"
                      placeholder="Imię i nazwisko lub nazwa firmy"
                      size="lg"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="streetAndHomeNumber"
                  control={control}
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <Input
                      className="shippingDetailsInput"
                      placeholder="Ulica i numer domu/ mieszkania"
                      size="lg"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="zipCode"
                  control={control}
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <Input
                      className="shippingDetailsInput"
                      placeholder="Kod pocztowy"
                      size="lg"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="localization"
                  control={control}
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <Input
                      className="shippingDetailsInput"
                      placeholder="Miejscowość"
                      size="lg"
                      {...field}
                    />
                  )}
                />
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="containerForCheckboxAndText">
        <div className="containerForPaymentForms">
          <RadioGroup
            onChange={setPaymentMethodValue}
            value={paymentMethodValue}
          >
            <Stack direction="column" className="radioStack">
              <div
                onClick={() => setPaymentMethodValue("przelewy24")}
                className={`radio-div ${paymentMethodValue === "przelewy24" ? "selectedRadio" : ""}`}
              >
                <Radio value="przelewy24" className="radioElement">
                  Płatność online
                </Radio>
                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={Przelewy24}
                    alt="zdjęcie loga Przelewy24"
                    width={60}
                    height={60}
                    style={{
                      filter:
                        paymentMethodValue === "przelewy24"
                          ? "grayscale(0)"
                          : "grayscale(1)",
                    }}
                  />
                  <span style={{ marginLeft: 10 }}>0 zł</span>
                </div>
              </div>
              <div
                onClick={() => setPaymentMethodValue("onlinePaymentCard")}
                className={`radio-div ${paymentMethodValue === "onlinePaymentCard" ? "selectedRadio" : ""}`}
              >
                <Radio value="onlinePaymentCard" className="radioElement">
                  Karta platnicza online
                </Radio>
                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={VisaMastercard}
                    alt="zdjęcie loga Visa i Mastercard"
                    width={60}
                    height={60}
                    style={{
                      filter:
                        paymentMethodValue === "onlinePaymentCard"
                          ? "grayscale(0)"
                          : "grayscale(1)",
                    }}
                  />
                  <span style={{ marginLeft: 10 }}>0 zł</span>
                </div>
              </div>
              <div
                onClick={() => setPaymentMethodValue("traditionalTransfer")}
                className={`radio-div ${paymentMethodValue === "traditionalTransfer" ? "selectedRadio" : ""}`}
              >
                <Radio value="traditionalTransfer" className="radioElement">
                  Przelew tradycyjny
                </Radio>
                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={PrzelewTradycyjny}
                    alt="zdjęcie loga Przelewu tradycyjnego"
                    width={30}
                    height={30}
                    style={{
                      filter:
                        paymentMethodValue === "traditionalTransfer"
                          ? "grayscale(0)"
                          : "grayscale(1)",
                    }}
                  />
                  <span style={{ marginLeft: 10 }}>0 zł</span>
                </div>
              </div>
              <div
                onClick={() => {
                  setPaymentMethodValue("instalment");
                  console.log("value", value);
                }}
                className={`radio-div ${paymentMethodValue === "instalment" ? "selectedRadio" : ""}`}
              >
                <Radio value="instalment" className="radioElement">
                  Raty
                </Radio>
                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={SantanderAndAliorBankLogo}
                    alt="zdjęcie loga Przelewu tradycyjnego"
                    width={80}
                    height={80}
                    style={{
                      filter:
                        paymentMethodValue === "instalment"
                          ? "grayscale(0)"
                          : "grayscale(1)",
                    }}
                  />
                  <span style={{ marginLeft: 10 }}>0 zł</span>
                </div>
              </div>
            </Stack>
          </RadioGroup>
        </div>
      </div>
      <div className="containerForCheckboxAndText">
        <div className="containerForConsentAndDeclaration">
          <h2 className="textDeliveryMethod">Zgody i Oświadczenia</h2>
          <div>
            <Checkbox
              style={{ marginTop: 10 }}
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e) =>
                setCheckedItems([e.target.checked, e.target.checked])
              }
            >
              <p style={{ fontWeight: "bold" }}>Zaznacz wszystkie</p>
            </Checkbox>
          </div>
          <Stack pl={6} mt={1} spacing={1} style={{ paddingLeft: 0 }}>
            <div style={{ marginTop: 10 }}>
              <Checkbox
                isChecked={checkedItems[0]}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, checkedItems[1]])
                }
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  Akceptuję{" "}
                  <a
                    href="https://google.com"
                    style={{
                      textDecoration: "underline",
                      margin: "0px 5px",
                      cursor: "pointer",
                    }}
                  >
                    regulamin
                  </a>
                  sklepu.{" "}
                  <span style={{ color: "red", paddingLeft: 5 }}>
                    {" "}
                    (wymagane)
                  </span>
                </div>
              </Checkbox>
            </div>

            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: 10,
                }}
              >
                <span>Chcę podzielić się opinią o satysfakcji z zakupów</span>
                <a
                  href="https://google.com"
                  style={{ textDecoration: "underline" }}
                >
                  Więcej
                </a>
              </div>
            </Checkbox>
          </Stack>
        </div>
      </div>
      <div className="containerForSummaryInOrderAndPayment">
        <CartSummary />
      </div>
    </div>
  );
};

export default OrderAndPayment;
