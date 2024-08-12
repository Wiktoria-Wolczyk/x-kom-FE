import React from "react";
import { productsForClientArray } from "./constants";
import ProductsForClientTile from "./ProductsForClientTile";
import ArrowButton from "./ArrowButton";

const ForYou = () => {
  return (
    <>
      <div className="containerWithPropositionForClient">
        <p className="selectedForYouText">Wybrane dla Ciebie</p>
        <p className="textUnderSelectedForYouText">
          Na podstawie ostatnio oglądanych produktów
        </p>
        <div className="divWithPropositionForClient">
          {productsForClientArray.map((productsForClient, index) => (
            <ProductsForClientTile
              key={index}
              productsForClient={productsForClient}
            />
          ))}
        </div>
        {/* <button className="nextPictureButtonInSelectedForYou"> */}
        <div className="nextListButton">
          <ArrowButton />
        </div>
        {/* <i
            className="fa-solid fa-chevron-right"
            style={{ color: "#424242" }}
          ></i> */}
        {/* </button> */}
      </div>
    </>
  );
};

export default ForYou;
