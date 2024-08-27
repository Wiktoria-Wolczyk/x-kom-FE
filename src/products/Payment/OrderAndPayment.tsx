import React, { useEffect, useState } from "react";
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
import CheckboxDelivery from "./CheckboxDelivery";

interface IFormInputInOrder {
  firstAndSecondName: string;
  streetAndHomeNumber: string;
  zipCode: string;
  localization: string;
  phoneNumber: string;
  email: string;
}

const deliveryMethod = [
  {
    id: 0,
    name: "Kurier",
    img: CourierCar,
    alt: "zarys busa",
    valueName: "courier",
  },
  {
    id: 1,
    name: "Salon x-kom",
    img: XkomShop,
    alt: "zarys budynku sklepu",
    valueName: "onsite",
  },
  {
    id: 2,
    name: "InPost Paczkomat 24/7",
    img: InpostLogo,
    alt: "logo InPost",
    price: 11.99,
    valueName: "inpost",
  },
];

const typesOfDeliveryCompanies = [
  {
    id: 0,
    name: "UPS",
    img: LogoUPS,
    alt: "logo UPS",
    price: 24.99,
    valueName: "ups",
  },
  {
    id: 1,
    name: "InPost Kurier",
    img: LogoInPostKurier,
    alt: "logo InPost kurier",
    price: 19.99,
    valueName: "inpostCourier",
  },
  {
    id: 2,
    name: "FedEx",
    img: LogoFedEx,
    alt: "logo FedEx",
    price: 14.99,
    valueName: "FedEx",
  },
];

const paymentMethod = [
  {
    id: 0,
    name: "Płatność online",
    img: Przelewy24,
    alt: "logo Przelewy24",
    valueName: "przelewy24",
  },
  {
    id: 1,
    name: "Karta płatnicza online",
    img: VisaMastercard,
    alt: "logo Visa i Mastercard",
    valueName: "onlinePaymentCard",
  },
  {
    id: 2,
    name: "Przelew tradycyjny",
    img: PrzelewTradycyjny,
    alt: "ikona przelewu tradycyjnego",
    valueName: "traditionalTransfer",
  },
  {
    id: 3,
    name: "Raty",
    img: SantanderAndAliorBankLogo,
    alt: "loga banków - Santander i AliorBank",
    valueName: "instalment",
  },
];

const OrderAndPayment = () => {
  const [deliveryMethodValue, setDeliveryMethodValue] = useState(0);
  const [deliveryCompany, setDeliveryCompany] = useState(0);
  const [paymentMethodValue, setPaymentMethodValue] = useState(0);
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

  const deliveryPriceInSelectedCompany = typesOfDeliveryCompanies.find(
    ({ id }) => id === deliveryCompany,
  )?.valueName;

  const deliveryPriceInDeliveryMethod = deliveryMethod.find(
    ({ id }) => id === deliveryMethodValue,
  )?.valueName;

  let selectedDeliveryMethod: string | undefined = "";

  if (deliveryPriceInDeliveryMethod !== "courier") {
    selectedDeliveryMethod = deliveryPriceInDeliveryMethod;
  } else {
    selectedDeliveryMethod = deliveryPriceInSelectedCompany;
  }

  console.log("takazmienna", deliveryMethod);

  return (
    <div className="contianerForOrderAndPaymentComponent">
      <h1 className="deliveryAndPayment">Dostawa i płatność</h1>
      <h3 style={{ marginBottom: 10, paddingLeft: 15 }}>
        Prezentujemy tylko opcje dostępne dla tego zamówienia.
      </h3>
      <CheckboxDelivery
        title="Sposób dostawy"
        value={deliveryMethodValue}
        setValue={(arg: number) => setDeliveryMethodValue(arg)}
        elements={deliveryMethod}
      />

      {deliveryMethodValue === 0 && (
        <CheckboxDelivery
          title="Rodzaj kuriera"
          value={deliveryCompany}
          setValue={(arg: number) => setDeliveryCompany(arg)}
          elements={typesOfDeliveryCompanies}
        />
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

      <CheckboxDelivery
        title="Płatność"
        value={paymentMethodValue}
        setValue={(arg: number) => setPaymentMethodValue(arg)}
        elements={paymentMethod}
      />

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
      <div
        className="containerForSummaryInOrderAndPayment"
        style={{ position: "sticky", bottom: 0 }}
      >
        <CartSummary
          // deliveryPrice={deliveryPriceInSelectedCompany}
          // deliveryByParcelLocker={deliveryPriceInDeliveryMethod}
          deliveryMethod={`${selectedDeliveryMethod}`}
        />
      </div>
    </div>
  );
};

export default OrderAndPayment;
