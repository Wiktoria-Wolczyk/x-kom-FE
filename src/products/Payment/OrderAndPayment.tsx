import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import "./OrderAndPayment.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Przelewy24 from "../OrderIcons/przelewy24-lm.webp";

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
    <div className="contanerForOrderAndPaymentComponent">
      <h1 className="deliveryAndPayment">Dostawa i płatność</h1>
      <h3>Prezentujemy tylko opcje dostępne dla tego zamówienia.</h3>
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
            </div>
            <div
              onClick={() => setValue("onsite")}
              className={`radio-div ${value === "onsite" ? "selectedRadio" : ""}`}
            >
              <Radio value="onsite" className="radioElement">
                Salon x-kom
              </Radio>
            </div>
            <div
              onClick={() => setValue("inpost")}
              className={`radio-div ${value === "inpost" ? "selectedRadio" : ""}`}
            >
              <Radio value="inpost" className="radioElement">
                InPost Paczkomat 24/7
              </Radio>
            </div>
          </Stack>
        </RadioGroup>
      </div>
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
            </div>
            <div
              onClick={() => setDeliveryMethodValue("inpost")}
              className={`radio-div ${deliveryMethodValue === "inpost" ? "selectedRadio" : ""}`}
            >
              <Radio value="inpost" className="radioElement">
                InPost Kurier
              </Radio>
            </div>
            <div
              onClick={() => setDeliveryMethodValue("fedex")}
              className={`radio-div ${deliveryMethodValue === "fedex" ? "selectedRadio" : ""}`}
            >
              <Radio value="fedex" className="radioElement">
                FedEx
              </Radio>
            </div>
          </Stack>
        </RadioGroup>
      </div>

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "30px",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            Dane do faktury
          </span>
          <span>
            W naszym sklepie internetowym dowodem zakupu jest faktura.
            Standardowo wystawiamy ją na dane z adresu dostawy.
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
      </div>
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
                Płatność online
              </Radio>
              <div className="divForPaymentLogoAndPrice">
                <img
                  src={Przelewy24}
                  alt="zdjęcie loga Przelewy24"
                  width={60}
                  height={60}
                />
                <span style={{ marginLeft: 10 }}>0 zł</span>
              </div>
            </div>
            <div
              onClick={() => setDeliveryMethodValue("inpost")}
              className={`radio-div ${deliveryMethodValue === "inpost" ? "selectedRadio" : ""}`}
            >
              <Radio value="inpost" className="radioElement">
                Karta platnicza online
              </Radio>
            </div>
            <div
              onClick={() => setDeliveryMethodValue("fedex")}
              className={`radio-div ${deliveryMethodValue === "fedex" ? "selectedRadio" : ""}`}
            >
              <Radio value="fedex" className="radioElement">
                Przelew tradycyjny
              </Radio>
            </div>
            <div
              onClick={() => setDeliveryMethodValue("fedex")}
              className={`radio-div ${deliveryMethodValue === "fedex" ? "selectedRadio" : ""}`}
            >
              <Radio value="fedex" className="radioElement">
                Raty
              </Radio>
            </div>
          </Stack>
        </RadioGroup>
      </div>
      <div>
        <h2 className="textDeliveryMethod">Zgody i Oświadczenia</h2>
        <Checkbox
          style={{ marginTop: 10 }}
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) =>
            setCheckedItems([e.target.checked, e.target.checked])
          }
        >
          <p style={{ fontWeight: "bold" }}>Zaznacz wszytskie</p>
        </Checkbox>
        <Stack pl={6} mt={1} spacing={1}>
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
              Akceptuję regulamin sklepu.
              <p style={{ color: "red" }}>(wymagane)</p>
            </div>
          </Checkbox>
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
              }}
            >
              Chcę podzielić się opinią o satysfakcji z zakupów{" "}
              <button style={{ textDecoration: "underline" }}>Więcej</button>
            </div>
          </Checkbox>
        </Stack>
      </div>
    </div>
  );
};

export default OrderAndPayment;
