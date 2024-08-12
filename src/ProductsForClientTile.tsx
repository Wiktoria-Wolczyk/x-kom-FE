import React from "react";
import { IProduct } from "./types";

const productsForClient = ({
  productsForClient,
}: {
  productsForClient: IProduct;
}) => {
  const add3Dots = () => {
    const productName = productsForClient.name;
    const dots = "...";
    const productNameWithDots = productName.substring(0, 25) + dots;

    if (productName.length > 25) {
      return productNameWithDots;
    } else {
      return productName;
    }
  };

  return (
    <div className="containerForProductInSelectedForClient">
      {productsForClient.tag && (
        <span
          className="infoAboutProductsForClient"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {productsForClient.tag}
        </span>
      )}

      <img
        className="imgProductsForClient"
        src={productsForClient.img}
        alt={productsForClient.name}
        width={"100%"}
        height={"100%"}
        style={{ maxWidth: "150px", maxHeight: "130px" }}
      />
      {/* <span>{productsForClient.name}</span> */}
      <span>{add3Dots()}</span>

      <div style={{ marginTop: "auto", paddingTop: 0, position: "relative" }}>
        {productsForClient.discountedPrice ? (
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              fontSize: 14,
              maxWidth: 100,
              textWrap: "pretty",
            }}
          >
            Najniższa cena{" "}
            <span style={{ textDecoration: "line-through" }}>
              {productsForClient.price} zł
            </span>
          </span>
        ) : (
          <></>
        )}

        <span>
          {productsForClient.discountedPrice || productsForClient.price} zł
        </span>
      </div>
    </div>
  );
};

export default productsForClient;
