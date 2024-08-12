import React from "react";
import { recommendedProductsArray } from "./constants";
import RecommendedProducts from "./RecommendedTile";

const Recommended = () => {
  return (
    <>
      <div className="containerForRecommended">
        <p className="weRecommendText">Polecamy</p>
        <div className="containerForRecommendedProducts">
          {recommendedProductsArray.map((recommendedProducts, index) => (
            <RecommendedProducts
              key={index}
              recommendedProducts={recommendedProducts}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Recommended;
