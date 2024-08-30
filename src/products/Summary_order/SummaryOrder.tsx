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
    deliveryMethodValue,
    setDeliveryMethodValue,
    selectedCompany,
    setSelectedCompany,
    dataWithDeliveryAdress,
    setDataWithDeliveryAdress,
  } = useContext(CartContext);

  const navigate = useNavigate();

  console.log("i co z tym?", dataWithDeliveryAdress);

  return (
    <div className="containerForSummaryBeforePayment">
      <span className="SummaryBoldText">Podsumowanie</span>
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
          <span style={{ fontWeight: 500, fontSize: 16, marginRight: 15 }}>
            {selectedCompany?.name}
          </span>
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
          <span style={{ fontWeight: 500, fontSize: 16 }}>Osoba prywatna</span>
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
          <span style={{ fontWeight: 500, fontSize: 16 }}>
            Alice Morgan albo {dataWithDeliveryAdress?.firstAndSecondName}
          </span>
          <div className="containerForUserDetailsInSummary">
            <span>Fiołkowa 3</span>
            <span>30-640 Warszawa</span>
          </div>
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
          <div
            style={{
              fontWeight: 500,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
            }}
          >
            Przelew tradycyjny{" "}
            <img src={TraditionalPayment} width={30} height={30} />
          </div>
          <div className="containerForUserDetailsInSummary">
            <ul className="containerForLi">
              <li>
                Samodzielnie zaloguj się do swojego banku i zleć przelew lub
                skorzystaj z placówki pocztowej.
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
        </div>
      </div>

      <div className="containerForSummaryDetails">
        <span className="headerBiggerFont">Produkty i usługi</span>
        <div className="containerForPhotoOfProductWithDescription">
          <div className="containerForPhotoInSummary">
            <img className="photoOfProductInSummary" src={Photo} />
          </div>
          <div className="containerForProductDetailsInSummary">
            <span className="nameOfProductInSummary">
              OnePlus Nord 4 5G 16/512GB Mercurial Silver 120Hz
            </span>
            <div className="divForFriceBeforeInSummary">2 999,00 zł</div>
            <div className="containerForQuantityAndPriceInSummary">
              <span>1szt.</span>
              <span>2 399,00 zł</span>
            </div>
          </div>
        </div>
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
      <div style={{ position: "sticky", bottom: 0 }}>
        <CartSummary />
      </div>
    </div>
  );
};

export default SummaryOrder;
