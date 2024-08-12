import React from "react";

interface productsForClient {
  name: string;
  img: string;
  price: number;
  oldPrice?: number;
  discountedPrice?: number | null;
  information?: string;
  tag?: string | null;
  isHotShot?: boolean | null;
  brand?: string;
}

const productsForClient = ({
  productsForClient,
}: {
  productsForClient: productsForClient;
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
    <div
      className="containerForProductInSelectedForClient"
      // style={{
      //   flexShrink: 0,
      //   width: 160,
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "flex-start",
      //   position: "relative",
      //   paddingTop: 50,
      //   rowGap: 15,
      //   height: 140,
      // }}
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
        width={"100%"}
        height={"100%"}
        style={{ maxWidth: "150px", maxHeight: "130px" }}
      />
      {/* <span>{productsForClient.name}</span> */}
      <span>{add3Dots()}</span>

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
              {productsForClient.price} zł
            </span>
          </span>
        ) : (
          <></>
        )}

        <span>{productsForClient.price} zł</span>
      </div>
    </div>
  );
};

export default productsForClient;
