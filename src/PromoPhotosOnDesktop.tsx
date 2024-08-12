import React, { useState } from "react";
import ArrowButton from "./ArrowButton";
import CurrentPromotions1 from "../src/HomepageIcons/monitorywnizszychcenach.jpg";
import CurrentPromotions2 from "../src/HomepageIcons/zlapakcesoriataniej.webp";
import CurrentPromotions3 from "../src/HomepageIcons/rentalPromotion.webp";

const PromoPhotosOnDesktop = () => {
  const [photoInSliderIndex, setPhotoInSliderIndex] = useState(0);

  const promoPicturesOnDesktopHomepage = [
    {
      name: "text: Emocje w każym pikselu. Monitory w najniższych cenach, and two monitors",
      img: CurrentPromotions1,
    },
    {
      name: "text: Małe rzeczy, wielkie rabaty. Złap akcesoria taniej do 65%, and road camera",
      img: CurrentPromotions2,
    },
    {
      name: "text: Nie musisz kupować żeby używać. Sprawdź usługę wynajmu sprzętu, and parts of few phones ",
      img: CurrentPromotions3,
    },
  ];

  return (
    <>
      <div className="containerForScrollablePromoPhotosOnDesktop">
        <div className="divForPhotosOnDesktop">
          <div className="prevPictureButton">
            <ArrowButton
              direction="left"
              onClick={() => {
                if (photoInSliderIndex <= 0) {
                  setPhotoInSliderIndex(0);
                } else {
                  setPhotoInSliderIndex((prev) => prev - 1);
                }
              }}
            />
          </div>

          <img
            className="centeredPhotoOnDesktop"
            src={promoPicturesOnDesktopHomepage[photoInSliderIndex].img}
            alt={promoPicturesOnDesktopHomepage[photoInSliderIndex].name}
          />
          <div className="nextPictureButton">
            <ArrowButton
              onClick={() => {
                if (photoInSliderIndex < 2) {
                  return setPhotoInSliderIndex((prev) => prev + 1);
                } else {
                  return setPhotoInSliderIndex(0);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default PromoPhotosOnDesktop;
