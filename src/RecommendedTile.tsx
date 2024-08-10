import React from "react";
import "./RecommendedTile.css";

interface recommendedProducts {
  name: string;
  img: string;
  price: string;
  oldPrice?: string;
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
        {recommendedProducts.oldPrice ? (
          <div className="containerForTextLowestPrice">
            Najniższa cena{" "}
            <span className="oldPrice">{recommendedProducts.oldPrice}</span>
          </div>
        ) : (
          <></>
        )}

        <div className="actualPriceUnderLowestPrice">
          {recommendedProducts.price}
        </div>
      </div>
    </div>
  );
};

export default recommendedProducts;
