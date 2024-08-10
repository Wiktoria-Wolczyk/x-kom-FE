import React from "react";
import { useState } from "react";
import "./Footer.css";
import DHL from "./footerPhotos/DHL.png";
import FedEx from "./footerPhotos/FedEx.jpeg";
import Inpost from "./footerPhotos/inpost_logo.png.webp";
import Ups from "./footerPhotos/ups3764.jpg";
import Blik from "./footerPhotos/blik.jpeg";
import Mastercard from "./footerPhotos/credit-card-lm.webp";
import Przelewy24 from "./footerPhotos/przelewy24-lm.webp";
import IPKO from "./footerPhotos/leasing-pko-lm.webp";

function Footer() {
  const [orderArrowIsOpen, setOrderArrowIsOpen] = useState(false);
  const [salesAndInspirationsAreOpen, setSalesAndInspirationsAreOpen] =
    useState(false);
  const [xkomButtonIsOpen, setXkomButtonIsOpen] = useState(false);

  return (
    <div className="containerForFooter">
      <div className="divForFootersDetails">
        <div className="contact">
          <div className="contactText">Kontakt</div>
          <div className="phoneNumber">
            <i className="fa-solid fa-phone phone1 fa-lg"></i>
            <p>34 377 00 00</p>
          </div>
          <div className="open-close-hours">
            <div>
              pon. - pt. <div>sob. - niedz.</div>
            </div>
            <div>
              8:00 - 21:00<div> 8:00 - 19:00</div>
            </div>
          </div>
          <div className="emailTextInFooter">
            <i className="fa-solid fa-envelope fa-lg"></i>x-kom@x-kom.pl
          </div>
          <div className="WhatsApp">
            <i className="fa-brands fa-whatsapp fa-lg"></i>WhatsApp
          </div>
          <div className="localizations">
            <i className="fa-solid fa-location-dot fa-lg"></i> Salony x-kom
          </div>
          <div className="containerForFbIgYtX">
            <i className="fa-brands fa-facebook fa-lg"></i>
            <i className="fa-brands fa-instagram fa-lg"></i>
            <i className="fa-brands fa-youtube fa-lg"></i>
            <i className="fa-brands fa-x-twitter fa-lg"></i>
          </div>
        </div>
        <div className="ordersFooter">
          {!orderArrowIsOpen ? (
            <div
              className="ordersButtonInFooter"
              style={{ borderBottom: "0.1px solid lightgray" }}
            >
              <p>Zamówienia</p>
              <i
                className="fa-solid fa-angle-down fa-sm"
                onClick={() => {
                  setOrderArrowIsOpen(true);
                  setSalesAndInspirationsAreOpen(false);
                  setXkomButtonIsOpen(false);
                }}
              ></i>
            </div>
          ) : (
            <>
              <div className="ordersButtonInFooter" style={{ border: 0 }}>
                <p>Zamówienia</p>
                <i
                  className="fa-solid fa-chevron-up fa-sm"
                  onClick={() => {
                    setOrderArrowIsOpen(false);
                    setSalesAndInspirationsAreOpen(false);
                    setXkomButtonIsOpen(false);
                  }}
                ></i>
              </div>
              <div className="containerForOrdersButtonInFooter">
                <button className="buttonInFooter">Dostawa i płatność</button>
                <button className="buttonInFooter">Raty</button>
                <button className="buttonInFooter">Leasing</button>
                <button className="buttonInFooter">Wynajem sprzętu</button>
                <button className="buttonInFooter">Ubezpieczenia</button>
                <button className="buttonInFooter">TaxFree</button>
                <button className="buttonInFooter">Montaż</button>
                <button className="buttonInFooter">Zwroty i reklamacje</button>
                <button className="buttonInFooter">
                  Najczęściej zadawane pytania
                </button>
              </div>
            </>
          )}
          {!salesAndInspirationsAreOpen ? (
            <div
              className="salesAndInspirationsButtonInFooter"
              style={{ borderBottom: "0.1px solid lightgray" }}
            >
              <p>Promocje i inspiracje</p>
              <i
                className="fa-solid fa-angle-down fa-sm"
                onClick={() => {
                  setSalesAndInspirationsAreOpen(true);
                  setOrderArrowIsOpen(false);
                  setXkomButtonIsOpen(false);
                }}
              ></i>
            </div>
          ) : (
            <>
              <div
                className="salesAndInspirationsButtonInFooter"
                style={{ border: 0 }}
              >
                <p>Promocje i inspiracje</p>
                <i
                  className="fa-solid fa-chevron-up fa-sm"
                  onClick={() => {
                    setSalesAndInspirationsAreOpen(false);
                    setOrderArrowIsOpen(false);
                    setXkomButtonIsOpen(false);
                  }}
                ></i>
              </div>
              <div className="containerForSalesAndInspirationsButtonInFooter">
                <button className="buttonInFooter">Wyprzedaż</button>
                <button className="buttonInFooter">Gorący strzał</button>
                <button className="buttonInFooter">un.Box</button>
                <button className="buttonInFooter">Wynajem sprzętu</button>
                <button className="buttonInFooter">Promocje</button>
                <button className="buttonInFooter">Poradniki</button>
                <button className="buttonInFooter">Aktualności</button>
              </div>
            </>
          )}
          {!xkomButtonIsOpen ? (
            <div
              className="xkomButtonInFooter"
              style={{ borderBottom: "0.1px solid lightgray" }}
            >
              <p>x-kom</p>
              <i
                className="fa-solid fa-angle-down fa-sm"
                onClick={() => {
                  setXkomButtonIsOpen(true);
                  setOrderArrowIsOpen(false);
                  setSalesAndInspirationsAreOpen(false);
                }}
              ></i>
            </div>
          ) : (
            <>
              <div className="xkomButtonInFooter" style={{ border: 0 }}>
                <p>x-kom</p>
                <i
                  className="fa-solid fa-chevron-up fa-sm"
                  onClick={() => {
                    setXkomButtonIsOpen(false);
                    setOrderArrowIsOpen(false);
                    setSalesAndInspirationsAreOpen(false);
                  }}
                ></i>
              </div>
              <div className="containerForXkomButtonInFooter">
                <button className="buttonInFooter">Wyprzedaż</button>
                <button className="buttonInFooter">Gorący strzał</button>
                <button className="buttonInFooter">un.Box</button>
                <button className="buttonInFooter">Wynajem sprzętu</button>
                <button className="buttonInFooter">Promocje</button>
                <button className="buttonInFooter">Poradniki</button>
                <button className="buttonInFooter">Aktualności</button>
              </div>
            </>
          )}

          {/* <Menu id="menuInOrders">
            <MenuButton
              className="MenuButtonOrdersInFooter"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <div className="OrdersTextInFooterMenu">Zamówienia</div>
            </MenuButton>
            <MenuList className="menuListInOrdersFooter">
              <MenuItem>Dostawa i płatność</MenuItem>
              <MenuItem>Raty</MenuItem>
              <MenuItem>Leasing</MenuItem>
              <MenuItem>Wynajem sprzętu</MenuItem>
              <MenuItem>Ubezpieczenia</MenuItem>
              <MenuItem>TaxFree</MenuItem>
              <MenuItem>Montaż</MenuItem>
              <MenuItem>Zwroty i reklamacje</MenuItem>
              <MenuItem>Najczęściej zadawane pytania</MenuItem>
            </MenuList>
          </Menu>
          <Menu id="menuInOrders">
            <MenuButton
              className="MenuButtonSalesAndIspirationsInFooter"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <div className="SalesAndInspirationsTextInFooterMenu">
                Promocje i inspiracje
              </div>
            </MenuButton>
            <MenuList className="menuListInSalesAndInspirationsFooter">
              <MenuItem>Dostawa i płatność</MenuItem>
              <MenuItem>Raty</MenuItem>
              <MenuItem>Leasing</MenuItem>
              <MenuItem>Wynajem sprzętu</MenuItem>
              <MenuItem>Ubezpieczenia</MenuItem>
              <MenuItem>TaxFree</MenuItem>
              <MenuItem>Montaż</MenuItem>
              <MenuItem>Zwroty i reklamacje</MenuItem>
              <MenuItem>Najczęściej zadawane pytania</MenuItem>
            </MenuList>
          </Menu> */}
          {/* <button className="buttonInFooterOrders">Zamówienia</button>
          <button className="buttonInFooter">Raty</button>
          <button className="buttonInFooter">Leasing</button>
          <button className="buttonInFooter">Wynajem sprzętu</button>
          <button className="buttonInFooter">Ubezpieczenia</button>
          <button className="buttonInFooter">TaxFree</button>
          <button className="buttonInFooter">Montaż</button>
          <button className="buttonInFooter">Zwroty i reklamacje</button>
          <button className="buttonInFooter">
            Najczęściej zadawane pytania
          </button> */}
        </div>
        {/* <div className="salesAndInspirations">
          <button className="buttonInFooterSales">Wyprzedaż</button>
          <button className="buttonInFooter">Gorący strzał</button>
          <button className="buttonInFooter">un.Box</button>
          <button className="buttonInFooter">Promocje</button>
          <button className="buttonInFooter">Poradniki</button>
          <button className="buttonInFooter">Aktualności</button>
        </div>
        <div className="x-kom">
          <button className="buttonInFooterAboutUs">O nas</button>
          <button className="buttonInFooter">Regulamin</button>
          <button className="buttonInFooter">Polityka prywatności</button>
          <button className="buttonInFooter">Polityka cookies</button>
          <button className="buttonInFooter">Regulamin newslettera</button>
          <button className="buttonInFooter">Biuro prasowe</button>
          <button className="buttonInFooter">Zamówienia publiczne</button>
          <button className="buttonInFooter">Zakupy dla firm</button>
          <button className="buttonInFooter">Współpracamarketingowa</button>
          <button className="buttonInFooter">Geex</button>
          <button className="buttonInFooter">Forum</button>
          <button className="buttonInFooter">Kariera</button>
          <button className="buttonInFooter">Kontakt</button>
          <button className="buttonInFooter">Realizowane projekty</button>
        </div> */}
      </div>
      <div className="divForFooterCompaniesAndCopywright">
        <div className="footer-companies">
          <img
            className="imgCompanies"
            src={DHL}
            alt="DHL Logo"
            width={130}
            height={40}
          />
          <img src={FedEx} alt="FedEx Logo" width={70} height={30} />
          <img src={Inpost} alt="Inpost Logo" width={120} height={100} />
          <img src={Ups} alt="Ups Logo" width={50} height={20} />
          <img
            src={Mastercard}
            alt="Mastercard Logo"
            width={50}
            height={10}
            style={{ filter: "grayscale(1)" }}
          />
          <img
            src={Przelewy24}
            alt="Przelewy24 Logo"
            width={50}
            height={10}
            style={{ filter: "grayscale(1)" }}
          />
          <img
            src={IPKO}
            alt="IPKO Logo"
            width={50}
            height={20}
            style={{ filter: "grayscale(1)" }}
          />

          <img
            className="imgCompanies"
            src={Blik}
            alt="Blik Logo"
            width={130}
            height={40}
          />
        </div>
        <div className="copyright">
          <div className="containerForCopyrightAndText">
            <i className="fa-regular fa-copyright fa-xs"></i>
            <p>x-kom 2022-2024</p>
          </div>
          {/* <div className="containerForChatCloud">
            <i className="fa-brands fa-rocketchat fa-2xl"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
