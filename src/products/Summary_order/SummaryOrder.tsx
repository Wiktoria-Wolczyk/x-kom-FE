import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import "./SummaryOrder.css";
import Inpost from "../OrderIcons/inpostKurier.webp";
import TraditionalPayment from "../OrderIcons/przelewTradycyjny.webp";
import Photo from "../../HomepageIcons/kluczSprzętowyYubico.webp";
import { Box, Checkbox, Flex, Input } from "@chakra-ui/react";
import CartSummary from "../../Cart/CartSummary";
import { CartContext } from "../../context/loginContext/CartContext";

const SummaryOrder = () => {
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);

  const {
    products,
    setArrayWithActualProducts,
    deliveryMethodValue,
    setDeliveryMethodValue,
    selectedCompany,
    setSelectedCompany,
    dataWithDeliveryAdress,
    setDataWithDeliveryAdress,
    formOfPayment,
    setFormOfPayment,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const savedDeliveryCompany = localStorage.getItem("deliveryCompany");
  const userFormData = localStorage.getItem("userData");
  const savedFormOfPayment = localStorage.getItem("formOfPayment");

  console.log("PRODUCTS", products);

  return (
    <div className="containerForSummaryBeforePayment">
      <div className="containerForDeliveryDetails">
        <div className="SummaryBoldText">Podsumowanie</div>
        <div className="containerForSummaryDetails">
          <div className="divForHeaderInSummaryAndChangeIcon">
            <span className="headerBiggerFont">Sposób i termin dostawy</span>
            <div onClick={() => navigate("/cart/delivery")}>
              <i
                className="fa-solid fa-pencil"
                style={{ color: "rgb(94, 94, 94)" }}
              ></i>
              <span className="changeTextMarginLeft">Zmień</span>
            </div>
          </div>
          <div className="containerForDetailsUnderHeader">
            {savedDeliveryCompany && (
              <span style={{ fontWeight: 500, fontSize: 16, marginRight: 15 }}>
                {selectedCompany?.name}
              </span>
            )}

            <img src={selectedCompany?.img} width={40} height={40} />
          </div>
        </div>

        <div className="containerForSummaryDetails">
          <div className="divForHeaderInSummaryAndChangeIcon">
            <span className="headerBiggerFont">Kupujesz jako</span>
            <div onClick={() => navigate("/cart/delivery")}>
              <i
                className="fa-solid fa-pencil"
                style={{ color: "rgb(94, 94, 94)" }}
              ></i>
              <span className="changeTextMarginLeft">Zmień</span>
            </div>
          </div>
          <div className="containerForDetailsUnderHeader">
            <span style={{ fontWeight: 500, fontSize: 16 }}>
              Osoba prywatna
            </span>
          </div>
        </div>

        <div className="containerForSummaryDetails">
          <div className="divForHeaderInSummaryAndChangeIcon">
            <span className="headerBiggerFont">Adres dostawy</span>
            <div onClick={() => navigate("/cart/delivery")}>
              <i
                className="fa-solid fa-pencil"
                style={{ color: "rgb(94, 94, 94)" }}
              ></i>
              <span className="changeTextMarginLeft">Zmień</span>
            </div>
          </div>

          <div className="containerForDetailsUnderHeader-contact">
            {userFormData && (
              <>
                <span style={{ fontWeight: 500, fontSize: 16 }}>
                  {dataWithDeliveryAdress?.firstAndSecondName}
                </span>
                <div className="containerForUserDetailsInSummary">
                  <span>{dataWithDeliveryAdress?.streetAndHomeNumber}</span>
                  <span>{dataWithDeliveryAdress?.localization}</span>
                  <span>{dataWithDeliveryAdress?.zipCode}</span>
                  <span>{dataWithDeliveryAdress?.phoneNumber}</span>
                  <span>{dataWithDeliveryAdress?.email}</span>
                  <span style={{ fontSize: 12, paddingTop: 5 }}>
                    * Na ten email wyślemy informacje o zamówieniu
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="containerForSummaryDetails">
          <div className="divForHeaderInSummaryAndChangeIcon">
            <span className="headerBiggerFont">Płatność</span>
            <div onClick={() => navigate("/cart/delivery")}>
              <i
                className="fa-solid fa-pencil"
                style={{ color: "rgb(94, 94, 94)" }}
              ></i>
              <span className="changeTextMarginLeft">Zmień</span>
            </div>
          </div>
          <div className="containerForDetailsUnderHeader-contact">
            {savedFormOfPayment && (
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {formOfPayment.name}
                <img
                  src={formOfPayment.img}
                  width={formOfPayment.id === 2 ? 30 : 50}
                  height={50}
                  style={{ marginLeft: 10 }}
                />
              </div>
            )}
            <>
              {savedFormOfPayment && formOfPayment.id === 2 && (
                <div className="containerForUserDetailsInSummary">
                  <ul className="containerForLi">
                    <li>
                      Samodzielnie zaloguj się do swojego banku i zleć przelew
                      lub skorzystaj z placówki pocztowej.
                    </li>
                    <li>
                      Pamiętaj, żeby w tytule przelewu koniecznie wpisać numer
                      zamówienia, który znajdziesz w dalszych krokach.
                    </li>
                    <li>
                      Zamówienie wyślemy dopiero, gdy zaksięgujemy Twoją wpłatę.
                    </li>
                  </ul>
                </div>
              )}
            </>
          </div>
        </div>

        <div className="containerForSummaryDetails">
          <span className="headerBiggerFont">Produkty i usługi</span>
          {products?.map((product) => {
            return (
              <div
                className="containerForPhotoOfProductWithDescription"
                key={product.id}
              >
                <div className="containerForPhotoInSummary">
                  <img
                    className="photoOfProductInSummaryOrder"
                    src={product.img}
                  />
                </div>
                <div className="containerForProductDetailsInSummary">
                  <span className="nameOfProductInSummary">{product.name}</span>
                  <div className="divForFriceBeforeInSummary">
                    {product.price} zł
                  </div>
                  <div className="containerForQuantityAndPriceInSummary">
                    <span className="quantityInSummary">
                      {product.quantity} szt.
                    </span>
                    <span>{product.discountedPrice || product.price} zł</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="containerForCheckboxAndTextInSummary"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            Komentarz do zamówienia
          </span>
          <span>
            Jeśli dodasz komentarz, to czas realizacji zamówienia może się
            wydłużyć.
          </span>
          <Checkbox
            style={{ marginTop: 20 }}
            isChecked={isCheckboxClicked}
            onChange={(e) => setIsCheckboxClicked(e.target.checked)}
          >
            Chcę dodać komentarz
          </Checkbox>
          {isCheckboxClicked && (
            <div className="containerForTextareaAndValiableQuantityOfCharacters">
              <textarea
                placeholder="Twój komentarz"
                className="addComentToOrder"
                rows={5}
              ></textarea>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 14, color: "gray" }}>0/100</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="conatinerForPaymentSummary">
        <div style={{ position: "sticky", bottom: 0 }}>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default SummaryOrder;
