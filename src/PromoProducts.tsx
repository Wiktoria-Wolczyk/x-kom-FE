import React from "react";
import ComponentsWithDiscounts from "../src/HomepageIcons/komponenty z rabatami.webp";
import G4MER from "../src/HomepageIcons/G4MER promo.webp";
import HotDrop from "../src/HomepageIcons/hot drops.webp";
import Opinion from "../src/HomepageIcons/leaveOpinionWithPhoto.webp";
import BuyLaptop from "../src/HomepageIcons/BuyLaptop.jpeg";

const PromoProducts = () => {
  return (
    <>
      <div className="containerForScrollablePromoPhotos">
        <div className="divForPhotos">
          <img
            className="centeredPhoto"
            src={ComponentsWithDiscounts}
            alt="zdjęcie Odkryj komponenty z rabatami do 46%"
          />
          <img
            className="centeredPhoto"
            src={G4MER}
            alt="zdjęcie G4MER - Twój komputer. Teraz taniej nawet do 2700 zł"
          />
          <img
            className="centeredPhoto"
            src={HotDrop}
            alt="zdjęcie zgarniaj imprezowe hot dropy - my zorganizujemy Ci festwial"
          />
          <img
            className="centeredPhoto"
            src={Opinion}
            alt="zdjęcie zostaw opinię ze zdjęciem i zyskaj nawet 400 zł na kolejne zakupy"
          />
          <img
            className="centeredPhoto"
            src={BuyLaptop}
            alt="zdjęcie Kup wybrany laptop Gigabyte i otrzymaj do 500 zł zwrotu na konto"
          />
        </div>
      </div>
    </>
  );
};
export default PromoProducts;
