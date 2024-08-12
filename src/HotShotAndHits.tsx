import React, { useContext, useEffect, useState } from "react";
import Timer from "./Timer";
import { recommendedProductsArray } from "./constants";
import RecommendedProducts from "./RecommendedTile";
import { IProductsArray } from "./types";
import { ProductsContext } from "./context/loginContext/ProductsInCartContext";
import toast from "react-hot-toast";
import axios from "axios";

interface IElement {
  id: number;
}

const HotShotAndHits = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [cart, setCart] = useState<IProductsArray[]>(
    JSON.parse(localStorage.getItem("cart") || "[]") || [],
  );

  const { setArrayWithActualProducts } = useContext(ProductsContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/products/random",
        );

        const randomProducts = response.data.message;
        // const products = response.data.message?.products;

        setProductsArr(randomProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  function addProductsToCart(el: IProductsArray) {
    const arrWithProductsInCart = [...cart]; // to bedzie cart z usestate'a
    const foundProduct = arrWithProductsInCart.find(
      (element: IElement) => element.id === el.id,
    );

    if (foundProduct && foundProduct.quantity) {
      foundProduct.quantity += 1;

      const index = arrWithProductsInCart.findIndex(
        (product: IElement) => product.id === foundProduct!.id,
      );

      arrWithProductsInCart[index] = foundProduct;
    } else {
      el.quantity = 1;
      arrWithProductsInCart.push(el);
    }

    setCart(arrWithProductsInCart);
    setArrayWithActualProducts(arrWithProductsInCart);
    const saveArray = JSON.stringify(arrWithProductsInCart);
    localStorage.setItem("cart", saveArray);

    toast.success("Added to cart!");
  }

  return (
    <>
      <div className="containerForHotShotAndWeekendHits">
        <div className="containerForHotShotDiv">
          <div className="hotShotDiv">
            <p className="hotShotText">Gorący strzał</p>
            <div className="saveXPercentDiv">
              <p className="smallerTextSave">Oszczędź</p> 23%
            </div>
            <div className="containerForHotShotIMG">
              <img
                src={""}
                alt="Klucz sprzętowy Yubico"
                width={200}
                height={200}
              />
              <p className="nameOfHotShotProduct">
                Klucz sprzętowy Yubico YubiKey 5C NFC
              </p>
            </div>
            <div className="divForPriceInHotShot">
              <p className="priceInHotShot">199,00 zł</p>
              <div className="lowestPriceBeforeDiscountDiV">
                <p className="lowestPriceBeforeDiscount">259,00 zł</p>
                <p>- najniższa cena z 30 dni przed obniżką</p>
              </div>
            </div>
            <div className="containerForProductsCountInHotShot">
              <div className="divForCountProducts">
                <div className="xOfThemLeftDiv">
                  <p className="smallerTextInHotShot"> pozostało</p>800
                </div>
                <div className="xOfThemSoldDiv">
                  <p className="smallerTextInHotShot"> sprzedano</p>200
                </div>
              </div>
              <div className="chwilowyContainerForPasek">
                <div className="szaryPasek">
                  <div className="chwilowyDivPasek"></div>
                </div>
              </div>
            </div>
            <Timer />
          </div>
        </div>
        <div className="containerForTextAndProductsInWeekendHits">
          <div className="textWeekendHits">Hity tygodnia</div>
          <div className="containerForWeekendHits">
            {recommendedProductsArray.map((product, index) => (
              <RecommendedProducts key={index} product={product} />
            ))}
          </div>
        </div>
      </div>

      <span className="ourProductsText">Nasze Produkty</span>
      <div className="containerForCardsWithProducts">
        {/* {productsArr?.map((el: IProductsArrValues, index) => (
            <Card key={index} className="categoryCard" maxW="sm">
              <CardBody>
                <Image
                  onClick={() => {
                    if (el.category) {
                      const joinCategoryString = el.category
                        .split(" ")
                        .join("_");
                      navigate(`/category/${joinCategoryString}`);
                    }
                  }}
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="md"
                />

                <Heading className="categoryTitle" size="md">
                  {el.category} ({el.count})
                </Heading>
              </CardBody>
            </Card>
          ))} */}

        {productsArr?.map((el: IProductsArray) => {
          if (el.discountedPrice >= 150) {
            return (
              <>
                <div className="containerForCardWithProduct">
                  <div className="containerForPhotoInHomepageProductCart">
                    <img src={"A"} alt="Apple IPhone Photo" />
                  </div>
                  <div className="productDetails">
                    <p className="productName">{el.name}</p>
                    <p className="productAvailable">
                      Dostępnych: {el.available}
                    </p>
                    <p>Marka: {el.brand}</p>
                    <p>id: {el.id}</p>
                  </div>
                  <div className="priceAndCartContainer">
                    <div className="DivWithFreeDelivery">
                      <p
                        className="oldPriceInCardOnHomepage"
                        style={{ display: "flex", width: 300 }}
                      >
                        <p
                          style={{
                            textDecoration: "line-through",
                            paddingRight: 5,
                            color: "gray",
                          }}
                        >
                          {el.price} zł
                        </p>
                        <p style={{ color: "gray" }}>- najniższa cena</p>
                      </p>
                      <p
                        className="Productprice"
                        style={{ lineHeight: 1, paddingBottom: 2 }}
                      >
                        {el.discountedPrice}zł
                      </p>
                      <p className="freeDeliveryText">Darmowa dostawa</p>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                        paddingBottom: 20,
                      }}
                    >
                      <div
                        className="divForCartInProductCard"
                        onClick={() => addProductsToCart(el)}
                      >
                        <i
                          className="fa-solid fa-cart-shopping cartInProductsOnHomepage"
                          style={{ color: "rgb(15, 193, 63)" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="containerForCardWithProduct">
                  <div className="containerForPhotoInHomepageProductCart">
                    <img src={""} alt="Apple IPhone Photo" />
                  </div>
                  <div className="productDetails">
                    <p className="productName">{el.name}</p>
                    <p className="productAvailable">
                      Dostępnych: {el.available}
                    </p>
                    <p>Marka: {el.brand}</p>
                    <p>id: {el.id}</p>
                  </div>
                  <div className="priceAndCartContainer" style={{ height: 60 }}>
                    <div
                      className="containerForOldAndActualPrice"
                      style={{
                        position: "relative",
                        width: 100,
                        height: 60,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: 10,
                        }}
                      >
                        <div
                          className="oldPriceInCardOnHomepage"
                          style={{ display: "flex", width: 300 }}
                        >
                          <p
                            style={{
                              textDecoration: "line-through",
                              paddingRight: 5,
                              color: "gray",
                            }}
                          >
                            {el.price} zł
                          </p>
                          <p style={{ color: "gray" }}>- najniższa cena</p>
                        </div>
                        <p
                          className="Productprice"
                          style={{ lineHeight: 1, paddingBottom: 5 }}
                        >
                          {" "}
                          {el.discountedPrice}zł
                        </p>
                      </div>
                    </div>
                    <div
                      className="divForCartInProductCard"
                      onClick={() => addProductsToCart(el)}
                    >
                      <i
                        className="fa-solid fa-cart-shopping cartInProductsOnHomepage"
                        style={{ color: "rgb(15, 193, 63)" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};

export default HotShotAndHits;
