import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { Image, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ProductsContext } from "./context/loginContext/ProductsInCartContext";
import ComponentsWithDiscounts from "../src/HomepageIcons/komponenty z rabatami.webp";
import G4MER from "../src/HomepageIcons/G4MER promo.webp";
import HotDrop from "../src/HomepageIcons/hot drops.webp";
import Opinion from "../src/HomepageIcons/leaveOpinionWithPhoto.webp";
import BuyLaptop from "../src/HomepageIcons/BuyLaptop.jpeg";
import UnboxPhoto from "../src/HomepageIcons/unbox x-kom.png";
import unboxTextAndIcon from "../src/HomepageIcons/unboxImg.png";
import lotteryTextInside from "../src/HomepageIcons/promoLottery.png";
import CategoryTile from "./CategoryTile";
import RecommendedProducts from "./RecommendedTile";

import ProductsForClientTile from "./ProductsForClientTile";

import { IProductsArray } from "./types";
import toast from "react-hot-toast";
import CurrentPromotions1 from "../src/HomepageIcons/monitorywnizszychcenach.jpg";
import CurrentPromotions2 from "../src/HomepageIcons/zlapakcesoriataniej.webp";
import CurrentPromotions3 from "../src/HomepageIcons/rentalPromotion.webp";
import ArrowButton from "./ArrowButton";
import Timer from "./Timer";
import { categories, recommendedProductsArray } from "./constants";
import Promotional from "./Promotional";
import LotteryAndRecommended from "./LotteryAndRecommended";
import ForYou from "./ForYou";
import HotShotAndHits from "./HotShotAndHits";

interface IElement {
  id: number;
}

const productsForClientArray = [
  {
    name: "N",
    img: "",
    price: "39",
    information: "+ Gr",
  },
];

function Homepage() {
  const [productsArr, setProductsArr] = useState([]);
  const [photoInSliderIndex, setPhotoInSliderIndex] = useState(0);
  const { setArrayWithActualProducts } = useContext(ProductsContext);

  console.log(12);
  // zmienic na react query
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

  const [cart, setCart] = useState<IProductsArray[]>(
    JSON.parse(localStorage.getItem("cart") || "[]") || [],
  );

  // przerobic na es6
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

  // const promoPicturesOnDesktopHomepage = [
  //   {
  //     name: "text: Emocje w każym pikselu. Monitory w najniższych cenach, and two monitors",
  //     img: CurrentPromotions1,
  //   },
  //   {
  //     name: "text: Małe rzeczy, wielkie rabaty. Złap akcesoria taniej do 65%, and road camera",
  //     img: CurrentPromotions2,
  //   },
  //   {
  //     name: "text: Nie musisz kupować żeby używać. Sprawdź usługę wynajmu sprzętu, and parts of few phones ",
  //     img: CurrentPromotions3,
  //   },
  // ];

  return (
    <>
      <div className="divScrollingContainer">
        <div className="containerForCategoriesOfProducts">
          {categories.map((category, index) => (
            <CategoryTile key={index} category={category} />
          ))}
        </div>

        <Promotional />
        <LotteryAndRecommended />
        <ForYou />
        <HotShotAndHits />
      </div>
    </>
  );
}

export default Homepage;
