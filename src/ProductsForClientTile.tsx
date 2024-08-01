import React from "react";

interface productsForClient {
  name: string;
  img: string;
  price: string;
  oldPrice?: string;
  information?: string;
}

const productsForClient = ({
  productsForClient,
}: {
  productsForClient: productsForClient;
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
        height: 140,
      }}
    >
      {productsForClient.information && (
        <span
          className="infoAboutProductsForClient"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {productsForClient.information}
        </span>
      )}

      <img
        className="imgProductsForClient"
        src={productsForClient.img}
        alt={productsForClient.name}
        width={150}
        height={150}
      />
      <span>{productsForClient.name}</span>

      <div style={{ marginTop: "auto", paddingTop: 0, position: "relative" }}>
        {productsForClient.oldPrice ? (
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
              {productsForClient.oldPrice}
            </span>
          </span>
        ) : (
          <></>
        )}

        <span>{productsForClient.price}</span>
      </div>
    </div>
  );
};

export default productsForClient;
