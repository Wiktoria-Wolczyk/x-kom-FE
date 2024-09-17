import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";
import QuantityChanger from "../../Cart/QuantityChanger";
import { CartContext } from "../../context/loginContext/CartContext";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { ReactComponent as Available } from "../../HomepageIcons/available.svg";
import { ReactComponent as Clock } from "../../HomepageIcons/clock.svg";
import { ReactComponent as Bus } from "../../HomepageIcons/bus.svg";
import { ReactComponent as Onplace } from "../../HomepageIcons/onplace.svg";

const ProductDetails = () => {
  const { id } = useParams();

  const [value, setValue] = React.useState("1");
  const [quantityValue, setQuantityValue] = useState(1);

  const { arrayWithActualProducts, setArrayWithActualProducts } =
    useContext(CartContext);

  const getProduct = async () => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  };

  const { data } = useQuery({
    queryKey: [`product_${id}`],
    queryFn: () => getProduct(),
  });

  const changeQuantity = (id: number, change: string) => {
    if (change === "add") {
      setQuantityValue((prev) => prev + 1);
    } else if (change === "remove") {
      setQuantityValue((prev) => (prev -= 1));
    }

    return quantityValue;
  };

  const addToCart = () => {
    if (data.message) {
      data.message.quantity = quantityValue;
    }

    const productExist = arrayWithActualProducts.find(
      (el) => el.id === data?.message.id,
    );

    if (productExist) {
      productExist.quantity = productExist.quantity + quantityValue;
    } else {
      arrayWithActualProducts.push(data.message);
    }
  };

  console.log("xyz");

  return (
    <div>
      {/* <div className="scrollableContainerForStepsInProductDetails">
        <div className="stepsInProductDetails">
          <span style={{ paddingRight: 10 }}>x-kom</span>{" "}
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className="stepsInProductDetails">
          <span style={{ paddingRight: 10 }}>laptopy i komputery</span>{" "}
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className="stepsInProductDetails">
          <span style={{ paddingRight: 10 }}>laptopy/notebooki/ultrabooki</span>{" "}
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className="stepsInProductDetails">
          <span style={{ paddingRight: 10 }}>laptopy 13 i mniejsze</span>{" "}
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div> */}
      <div className="mobile-desktop-productDetails">
        <div className="containerForMainPhotoOfProduct">
          <div className="divForMainProductPhoto">
            <img src={data?.message.img} className="mainPhotoOfProduct" />
          </div>
        </div>
        <div className="desktopProductDetails">
          <div className="containerForNameOfProductAndPriceInProductDetails">
            <div className="productName">{data?.message.name}</div>
            <div className="PriceInProductDetails">
              {data?.message.discountedPrice || data?.message.price} zł
            </div>
            <div className="ContainerForQuantityButtonsAndAddToCart displayNoneOnDesktop">
              <div className="containerForQuantityButtonsInProductDetails">
                <QuantityChanger
                  quantity={quantityValue}
                  id={data?.message.id}
                  changeQuantity={changeQuantity}
                />
              </div>
              <div className="divForButtonAddToCartInProductDetails">
                <button className="buttonAddToCartInProductDetails">
                  <i
                    className="fa-solid fa-cart-shopping"
                    style={{ color: "#ffffff" }}
                  ></i>
                  <span style={{ marginLeft: 10 }}>Dodaj do koszyka</span>
                </button>
              </div>
            </div>
          </div>

          <div className="desktopviewDeliveryAndInsurance">
            <div className="conatainerForDetailsAboutProductDelivery">
              <div className="divWithDetailsAboutDeliveryOnDesktop">
                <span className="divForPriceAboveQuantityButtons">
                  {data?.message.discountedPrice || data?.message.price} zł
                </span>
                <div className="ContainerForQuantityButtonsAndAddToCart">
                  <div className="containerForQuantityButtonsInProductDetails">
                    <QuantityChanger
                      quantity={quantityValue}
                      id={data?.message.id}
                      changeQuantity={changeQuantity}
                    />
                  </div>
                  <div className="divForButtonAddToCartInProductDetails">
                    <button
                      className="buttonAddToCartInProductDetails"
                      onClick={() => {}}
                    >
                      <i
                        className="fa-solid fa-cart-shopping"
                        style={{ color: "#ffffff" }}
                      ></i>
                      <span style={{ marginLeft: 10 }}>Dodaj do koszyka</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="divWithDetailsAboutDelivery">
                <div className="divForIMGInDetailsAboutProductDelivery">
                  <Available width={25} />
                </div>
                <div className=" divForTextInDetailsAboutProductDelivery">
                  <span className="greenFont">Dostępny</span>
                  <span className="smallText">Dowiedz się więcej</span>
                </div>
              </div>
              <div className="divWithDetailsAboutDelivery">
                <div className="divForIMGInDetailsAboutProductDelivery">
                  <Clock width={25} />
                </div>
                <div className=" divForTextInDetailsAboutProductDelivery">
                  <span>Kup teraz, otrzymasz jutro</span>
                  <span className="smallText">Zapłać w ciągu</span>
                </div>
              </div>
              <div className="divWithDetailsAboutDelivery">
                <div className="divForIMGInDetailsAboutProductDelivery">
                  <Bus width={25} />
                </div>
                <div className=" divForTextInDetailsAboutProductDelivery">
                  <span className="greenFont">Darmowa dostawa</span>
                  <span className="smallText">Sprawdź szczegóły</span>
                </div>
              </div>

              <div className="divWithDetailsAboutDelivery">
                <div className="divForIMGInDetailsAboutProductDelivery">
                  <Onplace width={25} />
                </div>
                <div className=" divForTextInDetailsAboutProductDelivery">
                  <span>Dostępny w salonach</span>
                  <span className="smallText">Wybierz salon</span>
                </div>
              </div>
            </div>
            <div className="containerForInsuranceInformation">
              <span>Ubezpieczenie urządzenia</span>

              <div className="containerForRadioInSelectInsurance">
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="column">
                    <div
                      className="divForRadioSelectInsurance"
                      style={{
                        border:
                          value === "1"
                            ? "1px solid gray"
                            : "0px solid transparent",
                      }}
                    >
                      <Radio value="1">Brak dodatkowej ochrony</Radio>
                    </div>
                    <div
                      className="divForRadioSelectInsurance"
                      style={{
                        border:
                          value === "2"
                            ? "1px solid gray"
                            : "0px solid transparent",
                      }}
                    >
                      <Radio value="2">wybierz eXtra ochronę</Radio>
                    </div>
                  </Stack>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="containerForDescriptionOfProduct">
        <span style={{ fontSize: 18 }}>Opis: </span>
        <div className="divForTextDescribingProduct">
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
