import React, { useState } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

import "./OrderAndPayment.css";

const OrderAndPayment = () => {
  const [value, setValue] = React.useState("courier");
  const [deliveryMethodValue, setDeliveryMethodValue] = useState<string>("ups");

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
    </div>
  );
};

export default OrderAndPayment;
