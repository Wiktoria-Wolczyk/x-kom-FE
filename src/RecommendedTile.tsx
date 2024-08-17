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
            Najniższa cena <span className="oldPrice">{product.price} zł</span>
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div className="actualPriceUnderLowestPrice">
            {product.discountedPrice || product.price} zł
          </div>
          <div className="cartOnHover">
            <i className="fa-solid fa-cart-shopping fa-lg cartInProductsContainer"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;
