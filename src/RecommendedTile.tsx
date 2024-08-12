import React from "react";
import "./RecommendedTile.css";
import { IProduct } from "./types";

const RecommendedProduct = ({ product }: { product: IProduct }) => {
  return (
    <div className="containerForProduct">
      {product.tag && (
        <span className="infoAboutRecommendedProductInRecommended">
          {product.tag}
        </span>
      )}

      <img
        className="imgRecommended"
        src={product.img}
        alt={product.name}
        width={150}
        height={150}
      />
      <span>{product.name}</span>

      <div className="containerForPriceInRecommended">
        {product.discountedPrice ? (
          <div className="containerForTextLowestPrice">
            Najniższa cena <span className="oldPrice">{product.price}</span>
          </div>
        ) : (
          <></>
        )}

        <div className="actualPriceUnderLowestPrice">
          {product.discountedPrice || product.price} zł
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;
