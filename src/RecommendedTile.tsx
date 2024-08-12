import React from "react";
import "./RecommendedTile.css";

interface recommendedProducts {
  name: string;
  img: string;
  price: number;
  discountedPrice?: number | null;
  information?: string;
}

const recommendedProducts = ({
  recommendedProducts,
}: {
  recommendedProducts: recommendedProducts;
}) => {
  return (
    <div className="containerForProduct">
      {recommendedProducts.information && (
        <span className="infoAboutRecommendedProductInRecommended">
          {recommendedProducts.information}
        </span>
      )}

      <img
        className="imgRecommended"
        src={recommendedProducts.img}
        alt={recommendedProducts.name}
        width={150}
        height={150}
      />
      <span>{recommendedProducts.name}</span>

      <div className="containerForPriceInRecommended">
        {recommendedProducts.discountedPrice ? (
          <div className="containerForTextLowestPrice">
            Najniższa cena{" "}
            <span className="oldPrice">{recommendedProducts.price}</span>
          </div>
        ) : (
          <></>
        )}

        <div className="actualPriceUnderLowestPrice">
          {recommendedProducts.discountedPrice || recommendedProducts.price} zł
        </div>
      </div>
    </div>
  );
};

export default recommendedProducts;
