import React from "react";

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
    <div
      style={{
        flexShrink: 0,
        width: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        position: "relative",
        paddingTop: 50,
        rowGap: 15,
      }}
    >
      {recommendedProducts.information && (
        <span
          className="infoAboutRecommendedProduct"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
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

      <div style={{ marginTop: "auto", paddingTop: 45, position: "relative" }}>
        {recommendedProducts.oldPrice ? (
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
              {recommendedProducts.oldPrice}
            </span>
          </span>
        ) : (
          <></>
        )}

        <span>{recommendedProducts.price}</span>
      </div>
    </div>
  );
};

export default recommendedProducts;
