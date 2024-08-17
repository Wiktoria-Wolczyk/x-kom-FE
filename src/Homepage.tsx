import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { Image, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import axios from "axios";
import { CartContext } from "./context/loginContext/CartContext";
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

const productsForClientArray = [
  {
    name: "N",
    img: "",
    price: "39",
    information: "+ Gr",
  },
];

function Homepage() {
  // przerobic na es6

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
