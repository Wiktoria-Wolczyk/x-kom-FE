import React from "react";
import UnboxPhoto from "../src/HomepageIcons/unbox x-kom.png";
import unboxTextAndIcon from "../src/HomepageIcons/unboxImg.png";
import lotteryTextInside from "../src/HomepageIcons/promoLottery.png";

const Lottery = () => {
  return (
    <>
      <div className="containerTorLotteryAndHotShotInformation">
        <div className="unBoxLoterryDiv">
          <img
            src={unboxTextAndIcon}
            alt="unbox text and icon"
            width={100}
            style={{ paddingTop: 20 }}
          />
          <div className="divForBoxesTextAndButtonLottery">
            <img src={UnboxPhoto} alt="photo of boxes" width={250} />
            <img src={lotteryTextInside} alt="" width={210} />
            <button className="loterryButton">
              Losuj zniżki{" "}
              <i
                className="fa-solid fa-chevron-right fa-xs"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
        </div>
        <div className="whereIsHotShotInformation">
          <p className="boldTextInWhereIsHotShot">Gdzie jest gorący strzał</p>
          <p>Przenieśliśmy go niżej. Przewiń stronę w dół</p>
        </div>
      </div>
    </>
  );
};

export default Lottery;
