import React from "react";
import { recommendedProductsArray as recommendedProducts } from "./constants";
import RecommendedProduct from "./RecommendedTile";

const Recommended = () => {
  return (
    <>
      <div className="containerForRecommended">
        <p className="weRecommendText">Polecamy</p>
        <div className="containerForRecommendedProducts">
          {recommendedProducts.map((product, index) => (
            <RecommendedProduct key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Recommended;
