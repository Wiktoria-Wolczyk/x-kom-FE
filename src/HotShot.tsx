import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getHotShotProduct = async () => {
  const response = await axios.get(
    "http://localhost:3000/products/promotions/hotshot",
  );

  return response.data;
};

const HotShot = () => {
  const [hotShotPercent, setHotShotPercent] = useState(0);

  const { isPending, error, data } = useQuery({
    queryKey: ["hotShotProduct"],
    queryFn: () => getHotShotProduct(),
  });

  useEffect(() => {
    if (data?.message) {
      const price = Number(data.message.price);
      const discountedPrice = Number(data.message.discountedPrice);
      const percent = (discountedPrice * 100) / price;

      const roundedPercent = Math.round(percent);

      setHotShotPercent(roundedPercent);
    }
  }, [data]);

  return (
    <div className="containerForHotShotDiv">
      <div className="hotShotDiv">
        {error ? (
          <p>Error</p>
        ) : (
          <div>
            {isPending || !data?.message ? (
              <>
                <p>Loading</p>
              </>
            ) : (
              <>
                <p className="hotShotText">Gorący strzał</p>
                <div className="saveXPercentDiv">
                  <p className="smallerTextSave">Oszczędź</p> {hotShotPercent}%
                </div>
                <div className="containerForHotShotIMG">
                  <img
                    src={data.message.img}
                    alt={data.message.name}
                    width={120}
                    height={120}
                  />
                  <p className="nameOfHotShotProduct">{data.message.name}</p>
                </div>
                <div className="divForPriceInHotShot">
                  <p className="priceInHotShot">
                    {data.message.discountedPrice} zł
                  </p>
                  <div className="lowestPriceBeforeDiscountDiV">
                    <p className="lowestPriceBeforeDiscount">
                      {data.message.price} zł
                    </p>
                    <p>- najniższa cena z 30 dni przed obniżką</p>
                  </div>
                </div>
                <div className="containerForProductsCountInHotShot">
                  <div className="divForCountProducts">
                    <div className="xOfThemLeftDiv">
                      <p className="smallerTextInHotShot"> pozostało</p>
                      {data.message.available}
                    </div>
                    <div className="xOfThemSoldDiv">
                      <p className="smallerTextInHotShot"> sprzedano</p> 25
                    </div>
                  </div>
                  <div className="chwilowyContainerForPasek">
                    <div className="szaryPasek">
                      <div className="chwilowyDivPasek"></div>
                    </div>
                  </div>
                </div>
                <Timer />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotShot;
